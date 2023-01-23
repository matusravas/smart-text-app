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
    onDictionary,
    onError,
    onSuccess,
}: UseTableProps) {
    const [rows, setRows] = useState<Data[]>(() => []);
    const [columns, setColumns] = useState<Column[]>(() => []);
    const [pagination, setPagination] = useState<TablePagination>(() => (TablePaginationDefault));
    const [isLoading, setIsLoading] = useState<boolean>(() => false);
    const repository = SearchRepository.getInstance()
    const isMounted = useRef(false);

    useEffect(() => {
        if (!requestData.lastTimestamp) return
        setIsLoading(true)
        // if(!factory.controller.signal.aborted) setIsLoading(true)
        repository
            .search(requestData)
            .then((data) => {
                console.log(data)
                if (isMounted.current) return;
                setPagination(data.pagination);
                setRows([...data.results]);
                (data.results && data.results.length > 0)
                    && setColumns(prepareColumns(data.columns))
                    // : setColumns(data.columns)
                setIsLoading(false)
                onDictionary(data.dictionary)
            })
            .catch((err: Error) => {
                if (isMounted.current) return;
                setIsLoading(false);
                onError && onError(err.message);
            });
    }, [requestData]);

    const prepareColumns = (columns: Column[]) => {
        let centeredColumns = columns.map(col=>{
            return {...col, cellStyle: {
                textAlign: 'center',
                width: '20%',
                padding: 12,
                textOverflow: 'ellipsis',
                'overflow': 'hidden',
                'whiteSpace': 'nowrap',
              }}
        })
        if (!requestData.search.phrase) return centeredColumns
        const columnIndex = centeredColumns.findIndex(column=>column.field === requestData.search.field)
        return centeredColumns.map((col, idx)=> {
            if (!(idx === columnIndex || idx === columnIndex + 1 || idx === columnIndex + 2)) return col
            const color = idx === columnIndex? '#9a0007': idx === columnIndex +1? '#00600f': '#004ba0'
            const newCol = {...col, 
                headerStyle: {color: color, fontWeight: 'bold'},
                cellStyle: {color: color, fontWeight: 'bold'}}
            return newCol
        })
    }

    const handleExport = () => {
        if (!requestData) return
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
            maxBodyHeight: "50vh",
            headerStyle: {
                position: "sticky",
                top: 0,
                padding: 24
            },
            toolbar: false,
            draggable: false,
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
    }, [requestData.search, requestData.date, pagination.pageSize]);

    return { rows, isLoading, columns, pagination, options: tableOptions, localization, componentDidUnmount: isMounted };
}
