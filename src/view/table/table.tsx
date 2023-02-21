import { IconButton, TablePagination, Tooltip } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import MaterialTable, { MTableBody, MTableBodyRow } from "material-table";
import React from "react";
import { TableProps } from "../../model/table/types";
import { useTable } from "../../viewmodel/table/TableViewModel";
import { tableIcons } from "./styles/icons";
import { TableLastTimestamp, TableTopbar, TableWrapper } from "./styles/table.styles";

export const Table = (props: TableProps) => {
    const {
        isLoading,
        rows,
        columns,
        pagination,
        options,
        localization,
        handleExport,
    } = useTable({
        searchData: props.searchData,
        onDictionary: props.onDictionary,
        onSource: props.onSource,
        onError: props.handleError,
        onSuccess: props.handleSuccess
    })

    const materialTableRef = React.createRef<any>();
    let renderingGroupRows: boolean = false;

    const onPageChange = (gotoPage: number) => {
        props.submitSearchData({ pagination: { ...pagination, currentPage: gotoPage } })
        // handlePagination({ currentPage: gotoPage })
    }

    const onPageSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const rowsPerPage = +event.target.value
        const currentPage = rowsPerPage >= pagination.totalHits ? 0 : pagination.currentPage
        props.submitSearchData({ pagination: { ...pagination, currentPage: currentPage, pageSize: +rowsPerPage } })
        // handlePagination({ currentPage: currentPage, pageSize: +rowsPerPage })
    }

    const renderTable = () => {
        if (!columns.length) return (<React.Fragment />)
        return (
            <TableWrapper>
                <TableTopbar>
                    <TableLastTimestamp>Last update: {props.lastTimestamp}</TableLastTimestamp>
                    <IconButton onClick={handleExport} style={{ alignSelf: 'flex-end' }}>
                        <Tooltip title='Export' placement="top">
                            <FileCopy style={{ color: '#DCDCDC' }} />
                        </Tooltip>
                    </IconButton>
                </TableTopbar>
                <MaterialTable
                    title='Table title'
                    icons={tableIcons}
                    tableRef={materialTableRef}
                    isLoading={isLoading}
                    columns={columns}
                    data={rows}
                    style={{ borderRadius: 10 }}
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
                                rowsPerPage={pagination.pageSize}
                                onChangePage={(_: any, gotoPage: number) => onPageChange(gotoPage)}
                                onChangeRowsPerPage={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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