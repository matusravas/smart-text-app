import { TablePagination } from "@material-ui/core";
import MaterialTable, { MTableBody, MTableBodyRow } from "material-table";
import React from "react";
import { TableProps } from "../../model/table/types";
import { useTable } from "../../viewmodel/table/TableViewModel";
import { tableIcons } from "./styles/icons";
import { TableWrapper } from "./styles/table.styles";

export const Table = (props: TableProps) => {
    const {
        isLoading,
        rows,
        columns,
        pagination,
        options,
        localization,
        handleExport
    } = useTable({
        searchData: props.searchData,
        onSearchDataObtained: props.onSearchDataObtained,
        onError: props.handleError,
        onSuccess: props.handleSuccess
    })

    const materialTableRef = React.createRef<any>();
    let renderingGroupRows: boolean = false;
    
    const { Footer, TopBar } = props.additionalComponents|| {}
    const componentProps = {handleExport}

    const onPageChange = (gotoPage: number) => {
        props.submitSearch({ pagination: { ...pagination, currentPage: gotoPage } })
    }

    const onPageSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let currentPage = pagination.currentPage
        const nRemainingItems = pagination.totalHits - (currentPage * pagination.pageSize)
        const rowsPerPage = +event.target.value
        currentPage = Math.floor((pagination.totalHits - nRemainingItems) / rowsPerPage) // -1 bcs page idexed from 0
        // currentPage = rowsPerPage < pagination.pageSize ? currentPage - 1 : currentPage + 1
        // currentPage = currentPage < 0 ? 0 : currentPage 
        rowsPerPage >= pagination.totalHits && (currentPage = 0)
        props.submitSearch({ pagination: { ...pagination, currentPage, pageSize: rowsPerPage } })
    }
    const renderTable = () => {
        if (!columns.length) return (<React.Fragment />)
        return (
            <TableWrapper>
                {TopBar ? <TopBar {...componentProps}/> : null}
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
                                onChangePage={(_: any, gotoPage: number) => !isLoading && onPageChange(gotoPage)}
                                onChangeRowsPerPage={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                    if (!isLoading) {
                                        onPageSizeChange(e)
                                        props.onChangeRowsPerPage(e)
                                    }
                                }} />
                        }
                    }}
                    {...props}
                />
                {Footer ? <Footer {...componentProps}/> : null}
            </TableWrapper>
        )
    }

    return renderTable()

}