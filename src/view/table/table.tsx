import { TablePagination } from "@material-ui/core";
import MaterialTable, { MTableBody, MTableBodyRow } from "material-table";
import React, { useEffect, useState } from "react";
import { TableProps } from "../../model/table/table";
import { useTable } from "../../viewmodel/TableViewModel";
import { tableIcons } from "./icons";
import { TableWrapper } from "./table.style";

export const Table = (props: TableProps) => {
    const [currentTableState, setCurrentTableState] = useState<'add' | 'group' | 'groupData' | 'data'>(() => "data")

    const {
        isLoading,
        rows,
        columns,
        pagination,
        // editable,
        options,
    } = useTable({
        requestData: props.requestData,
        currentTableState,
        onError: props.handleError,
        onSuccess: props.handleSuccess
    })

    const materialTableRef = React.createRef<any>();

    useEffect(() => {
        props.handleTableObj && props.handleTableObj(materialTableRef.current)
    }, [rows])

    let groupPagination: { rowsPerPage: number; page: number }[] = [];
    let renderingGroupRows: boolean = false;
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
                    Body: (Props: any) => {
                        renderingGroupRows = false;
                        return (
                            //<>
                                <MTableBody {...Props} />
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
                        console.log("PAGINATION_PROPS", props)
                        const maxCorrectPage = Math.floor(props.count / props.rowsPerPage)
                        const tooBigPage = maxCorrectPage < props.page
                        const newProps = {
                            ...props,
                            classes: {
                                root: props.classes.root
                            },
                            page: tooBigPage ? maxCorrectPage : props.page,
                            count: pagination.totalHits
                        }
                        return <TablePagination
                            {...newProps}
                            onChangePage={props.onChangePage}
                            onChangeRowsPerPage={props.onChangeRowsPerPage}
                        />
                    }
                }}
                {...props}
            />
        </TableWrapper>
    );
}