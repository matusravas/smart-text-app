import { TableCell, TablePagination } from "@material-ui/core";
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
        onDictionary: props.onDictionary,
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
        if (!columns.length) return ( <React.Fragment /> )
        return (
            <TableWrapper>
                <MaterialTable
                    // title='Table title'
                    icons={tableIcons}
                    tableRef={materialTableRef}
                    isLoading={isLoading}
                    columns={columns}
                    data={rows}
                    style={{borderRadius: 10}}
                    localization={localization}
                    options={options}
                    actions={[
                        {
                          icon: 'save',
                          tooltip: 'Save',
                          onClick: (event, rowData) => {
                            alert("You saved " + rowData.name);
                          }
                        },
                        {
                          icon: 'save',
                          tooltip: 'Export',
                          onClick: (event, data) => {}
                        }
                      ]}
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