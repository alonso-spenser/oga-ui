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
    records: any[];
    total: number;
    size: number;
    current: number;
    pages: number;
}

/**
 * Create Default Pagination State
 */
export const createPaginationState = (): PaginationState => ({
    loading: false,
    firstLoading: false,
    records: [],
    total: 0,
    size: 10,
    current: 1,
    pages: 0,
});

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
    visible?: (row: T, index?: number) => boolean;
    onClick: (row: T, index?: number) => void;
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
    onClick: (row: T, index?: number) => void;
    onCancel?: (row: T, index?: number) => void;
    sub: "popover" | "dropdown" | "button" | "confirm";
    config?: PopoverState;
    actions?: SubActionState[];
    visible?: (row: T, index?: number) => boolean;
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
    minWidth: string | number;
    sortable: boolean;
    stop: true,
    fixed: boolean;
    render: Function;
    svg: string;
    size: number;
    numberFormat: string;
    onClick: ((row: T, pointerEvent?: object) => void) | null;
    headerAlign: string;
    labelClassName:string;
    className: string;
    type: ColumnType;
    config?: Record<string, any>;
    group: Array<ButtonGroupState>;
    visible?: string;
    visibleValue?: any;
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
    Copy = "copy",
}
