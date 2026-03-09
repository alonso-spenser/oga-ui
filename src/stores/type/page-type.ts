/**
 * Action types used for success message control.
 */
export enum ActionType {
  Update = "update",
  Insert = "insert",
  Delete = "delete",
  Paging = "paging",
  List = "list",
}

/**
 * Column Type
 */
export enum ColumnType {
  Switch = "switch",
  Button = "button",
  Date = "date",
  Datetime = "datetime",
  Image = "image",
  Album = "album",
  Number = "number",
}

/**
 * Pagination query structure
 */
export interface PageQueryState {
  current: number;
  size: number;
  params: Record<string, string | number | boolean | undefined>;
}

/**
 * Create a default page query
 */
export const createPageQueryState = (): PageQueryState => ({
  current: 1,
  size: 10,
  params: {
    q: "",
  },
});

/**
 * Standard API response structure.
 */
export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

/**
 * Sorting information for paginated requests.
 */
export interface PageOrder {
  column: string;
  asc: boolean;
}

/**
 * Generic pagination result returned by backend.
 */
export interface ApiPageResult<T = any> {
  loading: boolean;
  firstLoading: boolean;
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
  orders: PageOrder[];
  searchCount: boolean;
}

/**
 * Create Default Pagination State
 */
export const createPageResult = <T = any>(): ApiPageResult<T> => ({
  loading: false,
  firstLoading: false,
  records: [],
  total: 0,
  size: 10,
  current: 1,
  pages: 0,
  orders: [],
  searchCount: false,
});

/**
 * Page-level UI state.
 */
export interface PageState {
  loading: boolean;
  firstLoading: boolean;
  submitting: boolean;
  unsaved: boolean;
  drawer: boolean;
}

/**
 * Create Page State
 */
export const createPageState = (): PageState => ({
  loading: false,
  firstLoading: false,
  submitting: false,
  unsaved: false,
  drawer: false,
});

/**
 * Empty state configuration
 */
export interface EmptyState {
  content: string;
  buttonLabel: string;
  onClick?: () => void;
}

/**
 * Table Parameters
 */
export interface PaginationState<T = any> {
  multiSelect?: boolean;
  index?: boolean;
  initTable?: boolean;
  stripe?: boolean;
  pageIndex?: number;
  pageSize?: number;
  pageSizes?: number[];
  pageLayout?: string;
  recordCount?: number;
  visible?: boolean;
  columnList?: any[];
  border?: boolean;
  card?: boolean;
  /**
   * Action List
   */
  actionList?: Record<string, any>;
  /**
   * Data is empty
   */
  empty?: EmptyState;
  /**
   * Row Highlight Class
   * @param row Data
   * @param index Index
   */
  rowsClassName?: (row?: T, index?: number) => string;
  paginationSection?: boolean;
}

/**
 * Create Default Pagination Parameter
 */
export const createPaginationState = <T = any>(): PaginationState<T> => ({
  multiSelect: true,
  index: false,
  initTable: true,
  stripe: false,
  pageIndex: 1,
  pageSize: 10,
  pageSizes: [5, 10, 20, 30, 40, 50, 100],
  pageLayout: "total, sizes, prev, pager, next, jumper",
  recordCount: 0,
  visible: true,
  columnList: [],
  actionList: {},
  border: true,
  card: true,
  empty: {
    content: "",
    buttonLabel: "",
  },
  rowsClassName: undefined,
  paginationSection: true,
});
