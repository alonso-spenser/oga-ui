import { ref } from "vue";

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
export interface PaginationParameterState<T = any> {
  multiSelect: boolean;
  index: boolean;
  loading: boolean;
  initTable: boolean;
  stripe: boolean;
  pageIndex: number;
  pageSize: number;
  pageSizes: number[];
  pageLayout: string;
  recordCount: number;
  firstLoading: boolean;
  visible: boolean;
  columnList: any[];
  border: boolean;
  card: boolean;
  /**
   * Data list
   */
  dataset: T[];
  /**
   * Action List
   */
  actionList: Record<string, any>;
  /**
   * Data is empty
   */
  empty: EmptyState;
  /**
   * Row Highlight Class
   * @param row Data
   * @param index Index
   */
  rowsClassName?: (row: T, index: number) => string;
  paginationSection: boolean;
}

/**
 * Create Default Pagination Parameter
 */
export const createPaginationParameter = <
  T = any,
>(): PaginationParameterState<T> => ({
  multiSelect: true,
  index: false,
  loading: true,
  initTable: true,
  stripe: false,
  pageIndex: 1,
  pageSize: 10,
  pageSizes: [5, 10, 20, 30, 40, 50, 100],
  pageLayout: "total, sizes, prev, pager, next, jumper",
  recordCount: 0,
  dataset: [],
  firstLoading: false,
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
