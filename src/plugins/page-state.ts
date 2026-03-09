import { ElMessage } from "element-plus";
import i18n from "@/plugins/i18n/base";
import router from "@/router";
import { ref } from "vue";
import type { AxiosResponse } from "axios";
import {
  ActionType,
  type PageState,
  type PaginationState,
  type PageQueryState,
  type ApiPageResult,
  type ApiResponse,
  createPageState,
  createPageResult,
  createPaginationState,
  createPageQueryState,
} from "@/stores/type/page-type";

/**
 * Manages page state, API handling, pagination,
 * and global error / success message control.
 */
export class PageStateManager<T = any> {
  public state = ref<PageState>(createPageState());
  /**
   * Holds pagination result if API returns paged data.
   */
  public pageResult = ref<ApiPageResult<T>>(createPageResult<T>());
  public paginationState: PaginationState<T> = createPaginationState<T>();
  public pageQueryState: PageQueryState = createPageQueryState();
  public normalQueryState: Record<string, any> = {};
  private readonly AUTH_ERROR_CODE = 13010000;

  constructor() {}

  /**
   * Start loading
   */
  startLoading() {
    this.pageResult.value.loading = true;
    this.state.value.loading = true;
  }

  /**
   * Stop loading
   */
  stopLoading() {
    this.pageResult.value.loading = false;
    this.state.value.loading = false;
  }

  /**
   * Start submitting
   */
  startSubmitting() {
    this.state.value.submitting = true;
  }

  /**
   * Stop submitting
   */
  stopSubmitting() {
    this.state.value.submitting = false;
  }

  /**
   * Unified API response handler.
   * @param request Axios Response
   * @param actionType Action Type
   * @param successMessage Show success message?
   */
  async handleResponse<K = T>(
    request: Promise<AxiosResponse<ApiResponse<K>>>,
    actionType?: ActionType,
    successMessage?: boolean,
  ): Promise<K | null> {
    try {
      this.startLoading();

      const { data: response } = await request;
      const { code, success, message, data } = response;

      if (code === this.AUTH_ERROR_CODE) {
        this.showErrorMessage(i18n.global.t(`errorCode.${code}`));
        this.redirect("/passport");
        return null;
      }
      if (!success) {
        const errorText = i18n.global.te(`errorCode.${code}`)
          ? i18n.global.t(`errorCode.${code}`)
          : message || i18n.global.t("errorCode.0");

        this.showErrorMessage(errorText);
        return null;
      }

      if (this.isPageResult(data)) {
        Object.assign(this.pageResult.value, data);
      }

      this.showSuccessMessage(actionType, successMessage);
      data.records.forEach((value) => {
        value.imageList = [
          {
            url: "http://127.0.0.1:9000/file/2029980403095351297.webp",
            title: "ChatGPT Image Jan 24, 2026, 02_02_08 PM",
          },
          {
            url: "http://127.0.0.1:9000/file/2029980403095351298.webp",
            title: "ChatGPT Image Jan 24, 2026, 02_11_08 PM",
          },
          {
            url: "http://127.0.0.1:9000/file/2029980941727870977.webp",
            title: "ChatGPT Image Mar 6, 2026, 05_12_07 PM",
          },
          {
            url: "http://127.0.0.1:9000/file/2029983641026736129.webp",
            title: "IMG_4909",
          },
          {
            title: "jo",
            url: "http://127.0.0.1:9000/file/2029983671804538881.webp",
          },
        ];
      });
      return data;
    } catch (error) {
      this.handleNetworkError(error);
      return null;
    } finally {
      this.stopLoading();
    }
  }

  /**
   * Type guard for detecting a paginated result.
   */
  private isPageResult(data: any): data is ApiPageResult<T> {
    return (
      data &&
      typeof data === "object" &&
      "records" in data &&
      "total" in data &&
      "current" in data
    );
  }

  /**
   * Show a success message.
   * @param actionType
   * @param successMessage
   * @private
   */
  private showSuccessMessage(
    actionType?: ActionType,
    successMessage?: boolean,
  ): void {
    if (actionType === ActionType.Update) {
      ElMessage.success(i18n.global.t("action.update.success"));
    } else if (actionType === ActionType.Insert) {
      ElMessage.success(i18n.global.t("action.insert.success"));
    } else if (actionType === ActionType.Delete) {
      ElMessage.success(i18n.global.t("action.delete.success"));
    } else if (successMessage) {
      ElMessage.success(i18n.global.t("action.success"));
    }
  }

  /**
   * Show Error Message
   * @param message Message
   */
  showErrorMessage(message: string) {
    ElMessage.error(message);
  }

  handleNetworkError(error: unknown): void {
    console.error(error);
    ElMessage.error(i18n.global.t("errorCode.networkError"));
  }

  /**
   * Redirect to a path
   * @param path Path
   * @param query URL parameters
   */
  redirect(path: string, query?: Record<string, any>) {
    router.push({ path, query }).catch((error) => console.error(error));
  }

  /**
   * get value from router.currentRoute.value;
   * @param key
   */
  getQueryValue(key: string) {
    return router?.currentRoute.value.query[key] ?? null;
  }

  /**
   * get parameter from router.currentRoute.params;
   * @param key
   */
  getRouteParamValue(key: string) {
    return router?.currentRoute.value.params[key] ?? null;
  }

  /**
   * get primary key
   * @param key
   */
  getPrimaryId(key: string = "id") {
    return this.getRouteParamValue(key);
  }

  /**
   * Update pagination parameters.
   * @param data
   */
  updatePaginationState(data: PaginationState<T>) {
    Object.assign(this.paginationState, data);
  }

  /**
   * Load data from cache
   */
  loadCache = (pq?: PageQueryState, nq?: Record<string, any>) => {
    if (pq) {
      Object.assign(this.pageQueryState, pq);
    }
    if (nq) {
      Object.assign(this.normalQueryState, nq);
    }
  };

  /**
   * reset page
   */
  public reset(): void {
    this.pageResult.value = createPageResult<T>();
    this.state.value = createPageState();
    this.paginationState = createPaginationState<T>();
    this.pageQueryState = createPageQueryState();
  }
}

/**
 * Composition API wrapper.
 */
export function usePageState<T = any>() {
  const pageState = new PageStateManager<T>();

  return {
    pageState,
    state: pageState.state,
    pageQueryState: pageState.pageQueryState,
    normalQueryState: pageState.normalQueryState,
    paginationState: pageState.paginationState,
    pageResult: pageState.pageResult,
  };
}
