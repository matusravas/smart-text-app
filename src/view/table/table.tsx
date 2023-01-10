import { TablePagination } from "@material-ui/core";
import MaterialTable, { MTableBody, MTableBodyRow } from "material-table";
import React, { useEffect, useState } from "react";
import { TableProps } from "../../model/table/types";
import { useTable } from "../../viewmodel/TableViewModel";
import { tableIcons } from "./icons";
import { TableWrapper } from "./table.style";

export const Table = (props: TableProps) => {
    const {
        isLoading,
        rows,
        columns,
        pagination,
        options,
    } = useTable({
        requestData: props.requestData,
        onError: props.handleError,
        onSuccess: props.handleSuccess
    })

    const materialTableRef = React.createRef<any>();
    let groupPagination: { rowsPerPage: number; page: number }[] = [];
    let renderingGroupRows: boolean = false;

    // useEffect(() => {
    //     props.handleTableObj && props.handleTableObj(materialTableRef.current)
    // }, [rows])

    const onPageChange = (gotoPage: number) => {
        console.log('GOTO PAGE', gotoPage)
        props.onRequestDataChange({pagination: {...pagination, currentPage: gotoPage}})
    }

    const onPageSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {target: {value: rowsPerPage}} = event
        console.log('ROWS PER PAGE', rowsPerPage)
        props.onRequestDataChange({pagination: {...pagination, pageSize: +rowsPerPage}})
    }
    // console.log(rows)
    console.log('MY PAGINATION', pagination)
    return (
        <TableWrapper>
            <MaterialTable
                title='ABCDEF'
                icons={tableIcons}
                tableRef={materialTableRef}
                isLoading={isLoading}
                columns={columns}
                data={rows}
                options={options}
                components={{
                    Body: (props: any) => {
                        // renderingGroupRows = false;
                        return (
                            //<>
                                <MTableBody {...props} />
                            //</>
                        );
                    },
                    Row: (props: any) => {
                        if (props.pagination === "true" || !renderingGroupRows) {
                            return (
                                // <>
                                    <MTableBodyRow {...props} />
                                // </>
                            );
                        } else return <></>;
                    },
                    Pagination: (props: any) => {
                        // console.log("PAGINATION_PROPS", props)
                        // const maxCorrectPage = Math.floor(props.count / props.rowsPerPage)
                        // const tooBigPage = maxCorrectPage < props.page
                        const newProps = {
                            ...props,
                            // classes: {
                            //     root: props.classes.root
                            // },
                            page: pagination.currentPage, //tooBigPage ? maxCorrectPage : props.page,
                            rowsPerPage: pagination.pageSize,
                            count: pagination.totalHits
                        }
                        // console.log("NEW_PAGINATION_PROPS", newProps)
                        return <TablePagination
                            {...newProps}
                            onChangePage={(_, gotoPage) => onPageChange(gotoPage)}
                            onChangeRowsPerPage={(e) => onPageSizeChange(e)}
                        />
                    }
                }}
                {...props}
            />
        </TableWrapper>
    );
}