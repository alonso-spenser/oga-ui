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
    initTable: boolean;
    stripe: boolean;
    pageSizes: number[];
    pageLayout: string;
    recordCount: number;
    // loading: boolean;
    // firstLoading: boolean;
    visible: boolean;
    columnList: ColumnState[];
    border: boolean;
    card: boolean;
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
 * Pagination State
 */
export interface PaginationState {
    loading: boolean;
    firstLoading: boolean;
    records: [];
    total: number;
    size: number;
    current: number;
    pages: number;
}

/**
 * Button Group State
 */
export interface ButtonGroupState {
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
    onClick: Function | null
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
export interface ColumnState {
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
    onClick: Function | null;
    headerAlign: string;
    labelClassName:string;
    className: string;
    type: ColumnType;
    config: Record<string, any>;
    group: Array<ButtonGroupState>;
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