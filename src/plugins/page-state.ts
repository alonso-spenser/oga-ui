import { ElMessage, ElMessageBox } from "element-plus";
import i18n from "@/plugins/i18n/base";
import router from "@/router";
import { ref } from "vue";
import type { AxiosResponse } from "axios";
import {
  ActionType,
  type ApiCustomPaginationResult,
  type ApiPageResult,
  type ApiResponse,
  createApiResponse,
  createPageQueryState,
  createPageResult,
  createPageState,
  createPaginationState,
  createCustomPaginationResult,
  type PageQueryState,
  type PageState,
  type PaginationState,
} from "@/stores/type/page-type";
import { getUploadUrl } from "@/plugins/utility";

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
  public customPageResult = ref<ApiCustomPaginationResult<T>>(
    createCustomPaginationResult<T>(),
  );
  public paginationState: PaginationState<T> = createPaginationState<T>();
  public pageQueryState: PageQueryState = createPageQueryState();
  public normalQueryState: Record<string, any> = {};
  /**
   * Upload URL
   */
  public readonly uploadURL = getUploadUrl();
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
    this.state.value.unsaved = false;
    this.state.value.drawer = false;
  }

  /**
   * Unified API response handler.
   * @param request Axios Response
   * @param actionType Action Type
   * @param successMessage Show success message?
   */
  async resolveResponse<K = any>(
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
      return data ?? null;
    } catch (error) {
      this.handleNetworkError(error);
      return null;
    } finally {
      this.stopLoading();
    }
  }

  /**
   * Resolve custom paginated output data
   * @param request Axios Response
   */
  async resolveCustomResponse<K = any>(
    request: Promise<AxiosResponse<ApiResponse<K>>>,
  ): Promise<void> {
    try {
      this.customPageResult.value.loading = true;

      const { data: response } = await request;
      const { code, success, message, data } = response;

      if (code === this.AUTH_ERROR_CODE) {
        this.showErrorMessage(i18n.global.t(`errorCode.${code}`));
        this.redirect("/passport");
      }
      if (!success) {
        const errorText = i18n.global.te(`errorCode.${code}`)
          ? i18n.global.t(`errorCode.${code}`)
          : message || i18n.global.t("errorCode.0");

        this.showErrorMessage(errorText);
      }

      if (this.isPageResult(data)) {
        Object.assign(this.customPageResult.value, data);
      }
    } catch (error) {
      this.handleNetworkError(error);
    } finally {
      this.customPageResult.value.loading = false;
    }
  }

  /**
   * Submit to service
   * @param request Axios Response
   * @param actionType Action Type
   * @param successMessage Show a success message?
   */
  async submitRequest<K = any>(
    request: Promise<AxiosResponse<ApiResponse<K>>>,
    actionType?: ActionType,
    successMessage?: boolean,
  ): Promise<ApiResponse<K>> {
    try {
      this.startSubmitting();

      const { data: response } = await request;
      const { code, success, message, data } = response;

      if (code === this.AUTH_ERROR_CODE) {
        this.showErrorMessage(i18n.global.t(`errorCode.${code}`));
        this.redirect("/passport");
        return response;
      }
      if (!success) {
        const errorText = i18n.global.te(`errorCode.${code}`)
          ? i18n.global.t(`errorCode.${code}`)
          : message || i18n.global.t("errorCode.0");

        this.showErrorMessage(errorText);
        return response;
      }

      this.showSuccessMessage(actionType, successMessage);

      return response;
    } catch (error) {
      this.handleNetworkError(error);
      return createApiResponse<K>(false);
    } finally {
      this.stopSubmitting();
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
      ElMessage.success(i18n.global.t("update.success"));
    } else if (actionType === ActionType.Insert) {
      ElMessage.success(i18n.global.t("create.success"));
    } else if (actionType === ActionType.Delete) {
      ElMessage.success(i18n.global.t("delete.success"));
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
   * Get route param value
   * @param key
   */
  getRouteParamValue(key: string): string {
    const value = router.currentRoute.value.params[key];

    if (Array.isArray(value)) {
      return value[0] ?? "";
    }

    return value ?? "";
  }

  /**
   * get primary key
   * @param key
   */
  getPrimaryId(key: string = "id"): string {
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
   * Delete data (confirm first)
   * @param fun Function
   * @param quantity Quantity
   */
  async confirmDelete(fun: () => Promise<any> | void, quantity: number = 1) {
    try {
      await ElMessageBox.confirm(
        quantity === 1
          ? i18n.global.t("delete.single")
          : i18n.global.t("delete.multiple", { count: quantity }),
        i18n.global.t("delete.heading"),
        {
          closeOnClickModal: false,
          type: "error",
          distinguishCancelAndClose: true,
          confirmButtonText: i18n.global.t("action.confirm"),
          cancelButtonText: i18n.global.t("action.cancel"),
        },
      );
      if (fun) {
        await fun();
      }
    } catch (error) {
      // 用户取消
    }
  }

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
    customPageResult: pageState.customPageResult,
  };
}
