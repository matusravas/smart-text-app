import { TablePagination } from "@material-ui/core";
import MaterialTable, { MTableBody, MTableBodyRow } from "material-table";
import React from "react";
import { TableProps } from "../../model/table/types";
import { useTable } from "../../viewmodel/TableViewModel";
import { tableIcons } from "./styles/icons";
import { TableWrapper } from "./styles/table.styles";

export const Table = (props: TableProps) => {
    const {
        isLoading,
        rows,
        columns,
        pagination,
        options,
        localization
    } = useTable({
        requestData: props.requestData,
        onLastTimestampObtained: props.onLastTimestampObtained,
        onError: props.handleError,
        onSuccess: props.handleSuccess
    })

    const materialTableRef = React.createRef<any>();
    let renderingGroupRows: boolean = false;

    const onPageChange = (gotoPage: number) => {
        props.onRequestDataChange({ pagination: { currentPage: gotoPage, pageSize: pagination.pageSize } })
    }

    const onPageSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target: { value: rowsPerPage } } = event
        props.onRequestDataChange({ pagination: { currentPage: pagination.currentPage, pageSize: +rowsPerPage } })
    }

    const renderTable = () => {
        if (rows.length === 0) return ( <React.Fragment /> )
        return (
            <TableWrapper>
                <MaterialTable
                    title='ABCDEF'
                    icons={tableIcons}
                    tableRef={materialTableRef}
                    isLoading={isLoading}
                    columns={columns}
                    data={rows}
                    localization={localization}
                    options={options}
                    components={{
                        Body: (props: any) => {
                            return (
                                <MTableBody {...props} />
                            );
                        },
                        Row: (props: any) => {
                            if (props.pagination === "true" || !renderingGroupRows) {
                                return (
                                    <MTableBodyRow {...props} />
                                );
                            } else return <></>;
                        },
                        Pagination: (props: any) => {
                            return <TablePagination
                                {...props}
                                count={pagination.totalHits}
                                page={pagination.currentPage}
                                onChangePage={(_, gotoPage) => onPageChange(gotoPage)}
                                onChangeRowsPerPage={(e) => {
                                    onPageSizeChange(e)
                                    props.onChangeRowsPerPage(e)
                                }} />
                        }
                    }}
                    {...props}
                />
            </TableWrapper>
        )
    }

    return renderTable()

}