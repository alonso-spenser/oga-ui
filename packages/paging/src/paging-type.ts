/**
 * Empty state configuration
 */
export interface EmptyState {
    content: string;
    buttonLabel: string;
    onClick?: () => void;
}
/**
 * Paging State
 */
export interface PagingState<T = any> {
    pageSizes?: number[];
    pageLayout?: string;
    empty?: EmptyState;
    loading: boolean;
    firstLoading: boolean;
    records: T[];
    total: number;
    size: number;
    current: number;
    pages: number;
    gutter?: number;
    span?: number;
}

/**
 * Create Default Paging Parameter
 */
export const createPagingState = <T = any>(): PagingState<T> => ({
    pageSizes: [5, 10, 20, 30, 40, 50, 100],
    pageLayout: "total, sizes, prev, pager, next, jumper",
    empty: {
        content: "",
        buttonLabel: "",
    },
    loading: false,
    firstLoading: false,
    records: [],
    total: 0,
    size: 10,
    current: 1,
    pages: 0,
    gutter: 20,
    span: 12,
});
