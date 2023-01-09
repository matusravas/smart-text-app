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

    useEffect(() => {
        // if(!factory.controller.signal.aborted) setIsLoading(true)
        setIsLoading(true)
        repository
            .search(requestData)
            .then((res) => {
                if (isMounted.current) return;
                setIsLoading(false);
                setColumns([...res.columns]);
                setPagination(res.pagination);
                setRows([...res.results]);
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
                backgroundColor: "#8CA2B5",
            },
            search: false,
            showTitle: false,
            sorting: true,
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
