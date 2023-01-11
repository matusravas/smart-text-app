import { Options } from "material-table";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Column, Data } from "../model/search/types";
import { TablePagination, TablePaginationDefault, UseTableProps } from "../model/table/types"
import SearchRepository from "../repository/search/SearchRepository";


export function useTable({
    requestData,
    onError,
    onSuccess,
}: UseTableProps) {
    const [rows, setRows] = useState<Data[]>(() => []);
    const [columns, setColumns] = useState<Column[]>(() => []);
    const [pagination, setPagination] = useState<TablePagination>(() => ({...requestData.pagination, ...TablePaginationDefault}));
    const [isLoading, setIsLoading] = useState<boolean>(() => false);
    const repository = SearchRepository.getInstance()
    const isMounted = useRef(false);

    useEffect(() => {
        return () => {
            isMounted.current = true;
            //   factory.abortAllRequests();
        };
    }, []);

    useEffect(() => {
        // if(!factory.controller.signal.aborted) setIsLoading(true)
        setIsLoading(true)
        repository
            .search(requestData)
            .then((res) => {
                console.log(res)
                if (isMounted.current) return;
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

    const prepareColumns = (columns: Column[]) => {
        if (!requestData.search.phrase) return columns
        const columnIndex = columns.findIndex(column=>column.field === requestData.search.field)
        return columns.map((col, idx)=> {
            if (!(idx === columnIndex || idx === columnIndex + 1)) return col
            const color = idx === columnIndex? '#ff4569': '#80ffb4'
            const newCol = {...col, 
                headerStyle: {backgroundColor: color, fontWeight: 'bold'},
                cellStyle: {color: color, fontWeight: 'bold'}}
            return newCol
        })
    }

    const handleExport = () => {
        console.log(requestData) // ! reuestData are not changed bcs handleExport is used in memoized options and it has no deps
        repository
            .searchExport(requestData.search, requestData.date)
            .then((res)=>{
                // console.log(res)
                // const url = window.URL.createObjectURL(new Blob([res], { type: 'text/xlsx;' }));
                // const link = document.createElement('a');
                // link.href = url;
                // link.setAttribute('download', 'nacharbeit.xlsx');
                // document.body.appendChild(link);
                // link.click();
            })
            .catch((err: Error) => {
                if (isMounted.current) return;
                onError && onError(err.message);
            });
    }

    const localization = useMemo(()=> {
        return {
            toolbar: {
                exportCSVName: 'Export Excel'
            }
        }
    }, [])
    
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
            },
            exportCsv: handleExport,
            filtering: false,
            loadingType: "linear",
            columnsButton: false,
            emptyRowsWhenPaging: false,
            paging: true,
            // actionsColumnIndex: -1,
            // debounceInterval: 500,
            pageSizeOptions: [10, 20, 50, 100],
            pageSize: pagination.pageSize,
            // search: true,
            // addRowPosition: 'first'
        };
        return options
    // },[rows, currentTableState, isMounted.current]);
    }, []);

    return { rows, isLoading, columns, pagination, options: tableOptions, localization, componentDidUnmount: isMounted };
}
