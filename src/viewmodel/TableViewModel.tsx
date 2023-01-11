import { Options } from "material-table";
import {
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { Column, Data } from "../model/search/types";
import { TablePagination, TablePaginationDefault, UseTableProps } from "../model/table/types";
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
        console.log(requestData)
        repository
            .searchExport(requestData.search, requestData.date)
            .then((res)=>{
                //
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
            pageSizeOptions: [10, 20, 50, 100],
            pageSize: pagination.pageSize
        };
        return options
    }, [requestData.search, requestData.date]);

    return { rows, isLoading, columns, pagination, options: tableOptions, localization, componentDidUnmount: isMounted };
}
