import type { AxiosResponse } from "axios";
import { ElMessage, ElMessageBox, type MessageType } from "element-plus";
import { ref } from "vue";
import i18n from "../i18n/base";
import {
  ActionType,
  createApiResponse,
  createCustomPaginationResult,
  createPageQueryState,
  createPageResult,
  createPageState,
  createPaginationState,
  type ApiPageResult,
  type ApiResponse,
  type CustomPaginationResult,
  type PageQueryState,
  type PageState,
  type PaginationState,
} from "./page-type";
import { getUploadUrl, isNotEmpty } from "./utility";

type ApiRequestMap = Record<string, Promise<AxiosResponse<ApiResponse<any>>>>;
type ApiPayloadMap<T extends ApiRequestMap> = {
  [K in keyof T]: T[K] extends Promise<AxiosResponse<ApiResponse<infer R>>>
    ? R | null
    : never;
};

export type ApiRequest<T> = Promise<AxiosResponse<ApiResponse<T>>>;

export interface PageStateI18n {
  global: {
    t: (key: string, values?: Record<string, any>) => string;
    te?: (key: string) => boolean;
  };
}

export interface PageStateRouter {
  push: (to: {
    path: string;
    query?: Record<string, any>;
  }) => Promise<unknown> | unknown;
  currentRoute: {
    value: {
      query: Record<string, any>;
      params: Record<string, string | string[]>;
    };
  };
}

export interface PageStateOptions {
  i18n?: PageStateI18n;
  router?: PageStateRouter;
  authErrorCode?: number;
  uploadURL?: string;
}

let pageStateOptions: PageStateOptions = {};

/**
 * Configure shared page-state dependencies once in the host application.
 */
export const configurePageState = (options: PageStateOptions): void => {
  pageStateOptions = {
    ...pageStateOptions,
    ...options,
  };
};

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
  public customPageResult = ref<CustomPaginationResult<T>>(
    createCustomPaginationResult<T>(),
  );
  public paginationState: PaginationState<T> = createPaginationState<T>();
  public pageQueryState = ref<PageQueryState>(createPageQueryState());
  public normalQueryState = ref<Record<string, any>>({});
  public title = ref("");
  public readonly uploadURL: string;
  private readonly authErrorCode: number;
  private readonly pageI18n: PageStateI18n;
  private readonly router?: PageStateRouter;

  constructor(options: PageStateOptions = {}) {
    const resolvedOptions = {
      ...pageStateOptions,
      ...options,
    };

    this.pageI18n = resolvedOptions.i18n ?? i18n;
    this.router = resolvedOptions.router;
    this.authErrorCode = resolvedOptions.authErrorCode ?? 13010000;
    this.uploadURL = resolvedOptions.uploadURL ?? getUploadUrl();
  }

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

      const axiosResponse = await request;
      const apiResponse = axiosResponse.data;
      const { code, success, message, data: payload } = apiResponse;

      if (code === this.authErrorCode) {
        this.showErrorMessage(this.t(`errorCode.${code}`));
        this.redirect("/passport");
        return null;
      }
      if (!success) {
        this.showErrorMessage(this.getErrorText(code, message));
        return null;
      }

      if (this.isPageResult(payload)) {
        Object.assign(this.pageResult.value, payload);
      }

      this.showSuccessMessage(actionType, successMessage);
      return payload ?? null;
    } catch (error) {
      this.handleNetworkError(error);
      return null;
    } finally {
      this.stopLoading();
    }
  }

  /**
   * Unified parallel API response handler.
   * @param requests Keyed Axios response promises
   */
  async resolveResponses<RequestMap extends ApiRequestMap>(
    requests: RequestMap,
  ): Promise<ApiPayloadMap<RequestMap>> {
    const result = {} as ApiPayloadMap<RequestMap>;
    const entries = Object.entries(requests) as Array<
      [keyof RequestMap, RequestMap[keyof RequestMap]]
    >;

    try {
      this.startLoading();

      const responses = await Promise.all(
        entries.map(async ([key, request]) => [key, await request] as const),
      );

      responses.forEach(([key, axiosResponse]) => {
        const apiResponse = axiosResponse.data;
        const { code, success, message, data: payload } = apiResponse;

        if (code === this.authErrorCode) {
          this.showErrorMessage(this.t(`errorCode.${code}`));
          this.redirect("/passport");
          result[key] = null as ApiPayloadMap<RequestMap>[keyof RequestMap];
          return;
        }
        if (!success) {
          this.showErrorMessage(this.getErrorText(code, message));
          result[key] = null as ApiPayloadMap<RequestMap>[keyof RequestMap];
          return;
        }

        if (this.isPageResult(payload)) {
          Object.assign(this.pageResult.value, payload);
        }

        result[key] = (payload ?? null) as ApiPayloadMap<RequestMap>[keyof RequestMap];
      });

      return result;
    } catch (error) {
      this.handleNetworkError(error);
      entries.forEach(([key]) => {
        result[key] = null as ApiPayloadMap<RequestMap>[keyof RequestMap];
      });
      return result;
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

      const axiosResponse = await request;
      const apiResponse = axiosResponse.data;
      const { code, success, message, data: payload } = apiResponse;

      if (code === this.authErrorCode) {
        this.showErrorMessage(this.t(`errorCode.${code}`));
        this.redirect("/passport");
      }
      if (!success) {
        this.showErrorMessage(this.getErrorText(code, message));
      }

      if (this.isPageResult(payload)) {
        Object.assign(this.customPageResult.value, payload);
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

      const axiosResponse = await request;
      const apiResponse = axiosResponse.data;
      const { code, success, message } = apiResponse;

      if (code === this.authErrorCode) {
        this.showErrorMessage(this.t(`errorCode.${code}`));
        this.redirect("/passport");
        return apiResponse;
      }
      if (!success) {
        this.showErrorMessage(this.getErrorText(code, message));
        return apiResponse;
      }

      this.showSuccessMessage(actionType, successMessage);
      this.stopSubmitting();
      return apiResponse;
    } catch (error) {
      this.state.value.submitting = false;
      this.state.value.unsaved = false;
      this.handleNetworkError(error);
      return createApiResponse<K>(false);
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
      ElMessage.success(this.t("update.success"));
    } else if (actionType === ActionType.Insert) {
      ElMessage.success(this.t("create.success"));
    } else if (actionType === ActionType.Delete) {
      ElMessage.success(this.t("delete.success"));
    } else if (successMessage) {
      ElMessage.success(this.t("action.success"));
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
    ElMessage.error(this.t("errorCode.networkError"));
  }

  /**
   * Redirect to a path
   * @param path Path
   * @param query URL parameters
   */
  redirect(path: string, query?: Record<string, any>) {
    if (!this.router) return;

    Promise.resolve(this.router.push({ path, query })).catch((error) =>
      console.error(error),
    );
  }

  /**
   * get value from router.currentRoute.value;
   * @param key
   */
  getQueryValue(key: string) {
    return this.router?.currentRoute.value.query[key] ?? null;
  }

  /**
   * Get route param value
   * @param key
   */
  getRouteParamValue(key: string): string {
    const value = this.router?.currentRoute.value.params[key];

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
   * is empty
   * @param val
   */
  isEmpty(val: any): boolean {
    if (val === undefined || val === null) return true;
    if (typeof val === "string" && val.trim() === "") return true;
    if (Array.isArray(val) && val.length === 0) return true;
    if (typeof val === "object" && Object.keys(val).length === 0) return true;
    return false;
  }

  /**
   * T -> map
   * @param data
   */
  toParams<TParams extends Record<string, any>>(data: TParams): Partial<TParams> {
    return Object.fromEntries(
      Object.entries(data).filter(([, value]) => !this.isEmpty(value)),
    ) as Partial<TParams>;
  }

  /**
   * Update pagination parameters.
   * @param data
   */
  updatePaginationState(data: Partial<PaginationState<T>>) {
    Object.assign(this.paginationState, data);
  }

  /**
   * Load data from cache
   */
  loadCache = (pq?: PageQueryState, nq?: Record<string, any>) => {
    if (pq) {
      Object.assign(this.pageQueryState.value, pq);
    }
    if (nq) {
      Object.assign(this.normalQueryState.value, nq);
    }
  };

  /**
   * Confirm before executing an important operation.
   */
  private async confirmBeforeRun(
    fun: () => Promise<any> | void,
    message: string,
    title: string,
    messageType: MessageType,
  ) {
    try {
      await ElMessageBox.confirm(message, title, {
        closeOnClickModal: false,
        type: messageType,
        distinguishCancelAndClose: true,
        confirmButtonText: this.t("action.confirm"),
        cancelButtonText: this.t("action.cancel"),
      });

      await fun();
    } catch {
      // User cancelled.
    }
  }

  /**
   * Delete data (confirm first)
   * @param fun Function
   * @param quantity Quantity
   * @param message Custom message
   */
  async confirmDelete(
    fun: () => Promise<any> | void,
    quantity: number = 1,
    message?: string,
  ) {
    await this.confirmBeforeRun(
      fun,
      isNotEmpty(message)
        ? message!
        : quantity === 1
          ? this.t("delete.single")
          : this.t("delete.multiple", { count: quantity }),
      this.t("delete.heading"),
      "error",
    );
  }

  /**
   * Confirm before running an important operation.
   * @param fun Function
   * @param message Custom message
   * @param messageType Message Type
   */
  async confirmOperation(
    fun: () => Promise<any> | void,
    message?: string,
    messageType?: MessageType,
  ) {
    await this.confirmBeforeRun(
      fun,
      isNotEmpty(message) ? message! : this.t("action.co"),
      this.t("action.oops"),
      messageType ?? "warning",
    );
  }

  /**
   * reset page
   */
  public reset(): void {
    this.pageResult.value = createPageResult<T>();
    this.state.value = createPageState();
    this.paginationState = createPaginationState<T>();
    this.pageQueryState = ref<PageQueryState>(createPageQueryState());
    this.normalQueryState = ref<Record<string, any>>({});
  }

  private t(key: string, values?: Record<string, any>): string {
    return this.pageI18n.global.t(key, values);
  }

  private te(key: string): boolean {
    return this.pageI18n.global.te?.(key) ?? false;
  }

  private getErrorText(code: number, message?: string): string {
    return this.te(`errorCode.${code}`)
      ? this.t(`errorCode.${code}`)
      : message || this.t("errorCode.0");
  }
}

/**
 * Composition API wrapper.
 */
export function usePageState<T = any>(options?: PageStateOptions) {
  const pageState = new PageStateManager<T>(options);

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
