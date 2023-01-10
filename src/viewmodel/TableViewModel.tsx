import { Options } from "material-table";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Pagination, Column, Data } from "../model/search/types";
import { UseTableProps } from "../model/table/table"
import SearchRepository from "../repository/search/SearchRepository";


export function useTable({
    //   useCase,
    requestData,
    //   config,
    currentTableState,
    //   getRowsRequest,
    onError,
    onSuccess,
    //   lngCtx,
}: UseTableProps) {
    const [rows, setRows] = useState<Data[]>(() => []);
    const [columns, setColumns] = useState<Column[]>(() => []);
    const [pagination, setPagination] = useState<Pagination>(() => requestData.pagination);
    const [isLoading, setIsLoading] = useState<boolean>(() => false);
    const repository = SearchRepository.getInstance()
    const isMounted = useRef(false);

    useEffect(() => {
        return () => {
            isMounted.current = true;
            //   factory.abortAllRequests();
        };
    }, []);

    const prepareColumns = (columns: Column[]) => {
        if (!requestData.search.phrase) return columns
        const columnIndex = columns.findIndex(column=>column.field === requestData.search.field)
        console.log(columnIndex)
        // const filteredColumns = columns.filter(col=>col.field !== requestData.search.field)
        // console.log(filteredColumns)
        // if (!filteredColumns || filteredColumns.length === 0) return columns

        // const foundColumn = filteredColumns[0]
        // const foundColumnIndex = columns.indexOf(foundColumn)
        // console.log(foundColumn)
        // console.log(foundColumnIndex)
        // if (foundColumnIndex === -1) return columns

        const newColumns = columns.map((col, idx)=> {
            if (!(idx === columnIndex || idx === columnIndex + 1)) return col
            const color = idx === columnIndex? '#ff4569': '#80ffb4'
            const newCol = {...col, 
                headerStyle: {backgroundColor: color, fontWeight: 'bold'},
                cellStyle: {color: color, fontWeight: 'bold'}}
            return newCol
        })
        return newColumns
    }

    useEffect(() => {
        // if(!factory.controller.signal.aborted) setIsLoading(true)
        setIsLoading(true)
        repository
            .search(requestData)
            .then((res) => {
                if (isMounted.current) return;
                setIsLoading(false);
                // const searched_column_index = res.columns.indexOf(res.columns.filter(col=>col.field !== requestData.search.field)[0])
                // const new_columns = requestData.search.phrase? res.columns.map(col=> {
                //     if (col.field !== requestData.search.field) return col
                //     const newCol = {...col, 
                //         headerStyle: {backgroundColor: '#ff4569', fontWeight: 'bold'},
                //         cellStyle: {color: '#ff4569', fontWeight: 'bold'}}
                //     return newCol
                // }): res.columns
                setColumns(prepareColumns(res.columns));
                setPagination(res.pagination);
                setRows([...res.results]);
                setIsLoading(false)
            })
            .catch((err: Error) => {
                if (isMounted.current) return;
                setIsLoading(false);
                onError && onError(err.message);
            });
    }, [requestData]);

    
    const tableOptions = useMemo(() => {
        let options: Options<any> = {};
        options = {
            grouping: false,
            maxBodyHeight: "65vh",
            headerStyle: {
                position: "sticky",
                top: 0,
                // backgroundColor: "#303030",
                // color: "white"
            },
            search: false,
            showTitle: false,
            sorting: false,
            exportButton: {
                csv: true,
                pdf: false
            },
            filtering: false,
            loadingType: "linear",
            columnsButton: false,
            emptyRowsWhenPaging: false,
            paging: true,
            // actionsColumnIndex: -1,
            // debounceInterval: 500,
            pageSizeOptions: [10, 20, 50, 100],
            pageSize: pagination.step,
            // search: true,
            // addRowPosition: 'first'
        };
        return options
    // },[rows, currentTableState, isMounted.current]);
    },[]);

    return { rows, isLoading, columns, pagination, options: tableOptions, componentDidUnmount: isMounted };
}
