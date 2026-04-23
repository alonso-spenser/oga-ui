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
  Default = "default",
  Switch = "switch",
  Button = "button",
  Date = "date",
  Datetime = "datetime",
  Image = "image",
  Album = "album",
  Number = "number",
  Mask = "mask",
  Dictionary = "dictionary",
  State = "state",
  Click = "click",
}

/**
 * Pagination query structure
 */
export interface PageQueryState {
  current: number;
  size: number;
  params: Record<string, string | number | boolean | null>;
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
  message?: string;
  data?: T;
}

/**
 * Create Default Api Response
 */
export const createApiResponse = <T = any>(
  success: boolean,
): ApiResponse<T> => ({
  success: success,
  code: 0,
  message: "",
  data: undefined,
});

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

/**
 * Image State
 */
export interface ImageState {
  title: string;
  url: string;
}

/**
 * Form item
 */
export interface FormItem {
  label: string;
  field: string;
  type?:
    | "input"
    | "select"
    | "date"
    | "number"
    | "textarea"
    | "switch"
    | "editor";
  required?: boolean;
  options?: { label: string; value: any }[];
  placeholder?: string;
  colspan?: number;
}

/**
 * Dict State
 */
export interface DictState {
  label: string;
  value: string | number | boolean;
}

/**
 * Generic pagination result returned by backend.
 */
export interface ApiCustomPaginationResult<T = any> {
  loading: boolean;
  firstLoading: boolean;
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
  orders: PageOrder[];
  searchCount: boolean;
  pageSizes?: number[];
  pageLayout?: string;
  gutter?: number;
  span?: number;
}

/**
 * Create Default Pagination State
 */
export const createCustomPaginationResult = <
  T = any,
>(): ApiCustomPaginationResult<T> => ({
  loading: false,
  firstLoading: false,
  records: [],
  total: 0,
  size: 10,
  current: 1,
  pages: 0,
  orders: [],
  searchCount: false,
  pageSizes: [5, 10, 20, 30, 40, 50, 100],
  pageLayout: "total, sizes, prev, pager, next, jumper",
  gutter: 20,
  span: 12,
});

/**
 * Menu
 */
export interface MenuTypeState {
  title: string;
  abbr: string;
  icon: string;
  url: string;
  code: string[];
  style?: string;
  submenu: MenuTypeState[];
}

/**
 * Parent Menu
 */
export interface ParentMenuTypeState {
  title: string;
  url: string;
  previous?: string;
}


/**
 * popover State
 */
export interface PopoverState {
  title: string;
  placement: string;
  content: string;
}

/**
 * Sub State
 */
export interface SubActionState<T = any> {
  label: string;
  icon?: string;
  divided?: boolean;
  onClick: ((row: T) => void) | null;
}

/**
 * Button Group State
 */
export interface ButtonGroupState<T = any> {
  icon: string;
  circle: boolean;
  name: string;
  size: string;
  disabled: boolean;
  round: boolean;
  plain: boolean;
  type: string;
  label: string;
  className: string;
  onClick: ((row: T) => void) | null;
  sub: 'popover' | 'dropdown' | 'button';
  config?: PopoverState
  actions?: SubActionState[]
}

/**
 * Image State
 */
export interface ImageState {
  title: string;
  url: string;
}

/**
 * Column State
 */
export interface ColumnState<T = any> {
  prop: string;
  label: string;
  align: string;
  width: string | number;
  sortable: boolean;
  stop: true,
  fixed: boolean;
  render: Function;
  svg: string;
  size: number;
  numberFormat: string;
  onClick: ((row: T) => void) | null;
  headerAlign: string;
  labelClassName:string;
  className: string;
  type: ColumnType;
  config?: Record<string, any>;
  group: Array<ButtonGroupState>;
}