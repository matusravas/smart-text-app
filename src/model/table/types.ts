import { Action, Column, DetailPanel, Filter, Icons, Localization, Options, Query } from "material-table";
import { Dictionary } from "../dictionary/types";
import { SearchData } from "../search/types.domain";


export type UseTableProps = {
    searchData: SearchData
    // uids: string[]
    onSearchDataObtained: (dictionary: Dictionary | null) => void
    onError: ((errorMessage: string) => void) | undefined
    onSuccess: ((successMessage: string) => void) | undefined
};

export interface MaterialTableProps<RowData extends object> {
    actions?: (Action<RowData> | ((rowData: RowData) => Action<RowData>))[];
    detailPanel?: ((rowData: RowData) => React.ReactNode) | (DetailPanel<RowData> | ((rowData: RowData) => DetailPanel<RowData>))[];
    editable?: {
      isEditable?: (rowData: RowData) => boolean;
      isDeletable?: (rowData: RowData) => boolean;
    }
    icons?: Icons;
    title?: string | React.ReactElement<any>;
    options?: Options<RowData>;
    parentChildData?: (row: RowData, rows: RowData[]) => RowData | undefined;
    localization?: Localization;
    onChangeRowsPerPage?: (pageSize: number) => void;
    onChangePage?: (page: number) => void;
    onChangeColumnHidden?: (column:Column<RowData>, hidden:boolean) => void;
    onColumnDragged?: (sourceIndex: number, destinationIndex: number) => void;
    onOrderChange?: (orderBy: number, orderDirection: ("asc" | "desc")) => void;
    onGroupRemoved?: (column:Column<RowData>, index:boolean) => void;
    onRowClick?: (event?: React.MouseEvent, rowData?: RowData, toggleDetailPanel?: (panelIndex?: number) => void) => void;
    onRowSelected?: (rowData: RowData) => void;
    onSearchChange?: (searchText: string) => void;
    /** An event fired when the table has finished filtering data
    * @param {Filter<RowData>[]} filters All the filters that are applied to the table 
    */ 
    onFilterChange?: (filters: Filter<RowData>[]) => void;
    onSelectionChange?: (data: RowData[], rowData?: RowData) => void;
    onTreeExpandChange?: (data: any, isExpanded: boolean) => void;
    onQueryChange?: (query: Query<RowData>) => void;
    style?: React.CSSProperties;
    tableRef?: any;
    page?: number;
    totalCount?: number;
}


export type TableProps = {
    searchData: SearchData
    submitSearch: (searchData: Partial<SearchData>) => void
    onSearchDataObtained: (dictionary: Dictionary | null) => void
    lastTimestamp?: Date
    handleTableObj?: (tableObj: any) => void
    handleError?: (errorMessage: string) => void
    handleSuccess?: (successMessage: string) => void
    handleExport?: (type: 'excel' | 'csv') => void
    topbar?: () => React.ReactNode
} & MaterialTableProps<any>


export const TablePaginationDefault = {
    currentPage: 0,
    pageSize: 10,
    totalHits: 0,
    totalPages: 0
}

export type TablePagination = {
    currentPage: number,
    pageSize: number,
    totalHits: number,
    totalPages: number
}