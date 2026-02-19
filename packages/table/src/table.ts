/**
 * Table Parameters
 */
export const tableParameter: TableParameterState= {
    multiSelect: true,
    index: false,
    loading: true,
    initTable: true,
    stripe: false,
    pageIndex: 1,
    pageSize: 10,
    pageSizes: [5, 10, 20, 30, 40, 50, 100],
    pageLayout: 'total, sizes, prev, pager, next, jumper',
    recordCount: 0,
    dataset: [],
    firstLoading: false,
    visible: true,
    columnList: [],
    actionList: {},
    border: false,
    card: false,
    empty: {
        content: "",
        buttonLabel: "",
        // @ts-ignore
        onClick:  null,
    },
    // @ts-ignore
    rowsClassName: Function,
    paginationSection: true,
}

/**
 * Table Parameters
 */
export interface TableParameterState {
    multiSelect: boolean,
    index: boolean,
    loading: boolean,
    initTable: boolean,
    stripe: boolean,
    pageIndex: number,
    pageSize: number,
    pageSizes: Array<number>,
    pageLayout: string,
    recordCount: number,
    dataset: Array<any>,
    firstLoading: boolean,
    visible: boolean,
    columnList: Array<any>,
    actionList: object,
    border: boolean,
    card: boolean,
    empty: {
        content: string,
        buttonLabel: string,
        onClick: Function
    },
    rowsClassName: Function,
    paginationSection: boolean,
}