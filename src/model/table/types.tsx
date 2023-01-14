import { Action, Column, DetailPanel, Filter, Icons, Localization, Options, Query } from "material-table";
import { SearchRequest } from "../search/types";

type UseCases = 'bekaert'

export type UseTableProps = {
    requestData: SearchRequest;
    onLastTimestampObtained: (timestamp: number) => void,
    // getRowsRequest: any;
    // updateRowRequest: any;
    // deleteRowRequest: any;
    // addRowRequest: any;
    // currentTableState: 'add' | 'group' | 'groupData' | 'data',
    // useCase: UseCases;
    // config: any;
    // setGetRowsRequest: Function;
    // setUpdateRowRequest: Function;
    // setDeleteRowRequest: Function;
    onError: ((errorMessage: string) => void) | undefined
    onSuccess: ((successMessage: string) => void) | undefined
    // setAddRowRequest: Function;
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
    // useCase: UseCases
    // config: any;
    requestData: SearchRequest;
    onLastTimestampObtained: (timestamp: number) => void,
    onRequestDataChange: (requestData: Partial<SearchRequest>) => void,
    handleTableObj?: (tableObj: any) => void;
    handleError?: (errorMessage: string) => void;
    handleSuccess?: (successMessage: string) => void;
  } & MaterialTableProps<any>


export const TablePaginationDefault = {
    totalHits: 0,
    totalPages: 0  
}

export type TablePagination = {
    currentPage: number,
    pageSize: number,
    totalHits: number,
    totalPages: number
}