import React, { useEffect, useState } from "react";
import MaterialTable, {
    MTableBodyRow,
    MTableBody,
    //   MTableGroupRow,
    //   MTableActions,
} from "material-table";
import {
    TablePagination,
} from "@material-ui/core";
import { useTable } from "../../viewmodel/TableViewModel";
import { TableProps } from "../../model/table/table";
import { tableIcons } from "./icons";
import { TableWrapper } from "./table.style";
import { count } from "console";

export const Table = (props: TableProps) => {
    //   const [getRowsRequest, setGetRowsRequest] = useState<any>({})
    //   const [updateRowRequest, setUpdateRowRequest] = useState<any>({})
    //   const [deleteRowRequest, setDeleteRowRequest] = useState<any>({})
    //   const [addRowRequest, setAddRowRequest] = useState<any>({})
    const [currentTableState, setCurrentTableState] = useState<'add' | 'group' | 'groupData' | 'data'>(() => "data")

    const {
        isLoading,
        rows,
        columns,
        pagination,
        // editable,
        options,
    } = useTable({
        // useCase: props.useCase,
        // config: props.config, 
        requestData: props.requestData,
        // getRowsRequest, 
        // updateRowRequest, 
        // deleteRowRequest, 
        // addRowRequest,
        currentTableState,
        // setGetRowsRequest,
        // setUpdateRowRequest,
        // setDeleteRowRequest,
        // setAddRowRequest,
        // lngCtx,
        onError: props.handleError,
        onSuccess: props.handleSuccess
    })

    const materialTableRef = React.createRef<any>();

    useEffect(() => {
        props.handleTableObj && props.handleTableObj(materialTableRef.current)
    }, [rows])

    let groupPagination: { rowsPerPage: number; page: number }[] = [];
    let renderingGroupRows: boolean = false;
    console.log(rows)
    console.log(pagination)
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
                // editable={editable}
                // actions={actions}
                components={{
                    Body: (Props: any) => {
                        renderingGroupRows = false;
                        return (
                            <>
                                <MTableBody {...Props} />
                            </>
                        );
                    },
                    //   Actions: (props: any) => {
                    //     // console.log("ACTIONS", props);
                    //     let newActions: any[] = []
                    //     props.actions?.forEach((action: any) => {
                    //       if(typeof action === 'function'){
                    //         newActions.unshift(action)
                    //       }else{
                    //         newActions.push(action)
                    //       }
                    //     })
                    //     const newProps = {
                    //       ...props,
                    //       actions: newActions
                    //     }
                    //     return <MTableActions {...newProps}/>
                    //   },
                    //   GroupRow: (props: any) => {
                    //     // console.log("GROUP ROW", props);
                    //     renderingGroupRows = true;

                    //     if (!groupPagination[props.path])
                    //       groupPagination[props.path] = {
                    //         rowsPerPage: 5,
                    //         page: 0,
                    //       };
                    //     return (
                    //       <>
                    //         <MTableGroupRow {...props} />

                    //         {props.groups.length - 1 === props.level &&
                    //           props.groupData.isExpanded && (
                    //             <>
                    //               {props.groupData?.data
                    //                 ?.slice(
                    //                   groupPagination[props.path]?.rowsPerPage *
                    //                     groupPagination[props.path]?.page,
                    //                   groupPagination[props.path]?.rowsPerPage *
                    //                     (groupPagination[props.path]?.page + 1)
                    //                 )
                    //                 .map((row: any, i: number) => {
                    //                   const newProps = {
                    //                     actions: props.actions,
                    //                     cellEditable: undefined,
                    //                     columns: props.columns,
                    //                     components: props.components,
                    //                     data: row,
                    //                     detailPanel: props.detailPanel,
                    //                     errorState: props.errorState,
                    //                     getFieldValue: props.getFieldValue,
                    //                     hasAnyEditingRow: props.hasAnyEditingRow,
                    //                     icons: props.icons,
                    //                     index: props.index,
                    //                     isTreeData: props.isTreeData,
                    //                     level: props.level,
                    //                     localization: props.localization,
                    //                     onCellEditFinished: props.onCellEditFinished,
                    //                     onCellEditStarted: props.onCellEditStarted,
                    //                     onEditingApproved: props.onEditingApproved,
                    //                     onEditingCanceled: props.onEditingCanceled,
                    //                     onRowClick: props.onRowClick,
                    //                     onToggleDetailPanel: props.onToggleDetailPanel,
                    //                     onTreeExpandChanged: props.onTreeExpandChanged,
                    //                     options: props.options,
                    //                     path: [props.path, [i]].flat(),
                    //                     key: `${i}`,
                    //                     pagination: "true",
                    //                   };
                    //                   return (
                    //                     <React.Fragment key={i}>
                    //                       {props.components.Row(newProps)}
                    //                     </React.Fragment>
                    //                   );
                    //                 })}

                    //               <tr>
                    //                 <TablePagination
                    //                   rowsPerPage={groupPagination[props.path]?.rowsPerPage}
                    //                   labelRowsPerPage={"Rows per page:"}
                    //                   page={groupPagination[props.path]?.page}
                    //                   count={props.groupData.data.length || 0}
                    //                   rowsPerPageOptions={[5, 10, 20]}
                    //                   onChangePage={(
                    //                     _event: React.MouseEvent<
                    //                       HTMLButtonElement,
                    //                       MouseEvent
                    //                     > | null,
                    //                     page: number
                    //                   ) => {
                    //                     groupPagination[props.path].page = page;
                    //                     props.onGroupExpandChanged(props.path);
                    //                     props.onGroupExpandChanged(props.path);
                    //                   }}
                    //                   onChangeRowsPerPage={(e: any) => {
                    //                     groupPagination[props.path].rowsPerPage =
                    //                       e.target.value;
                    //                     props.onGroupExpandChanged(props.path);
                    //                     props.onGroupExpandChanged(props.path);
                    //                   }}
                    //                 />
                    //               </tr>
                    //             </>
                    //           )}
                    //       </>
                    //     );
                    //   },
                    Row: (props: any) => {
                        //   console.log("ROW", props);
                        if (props.pagination === "true" || !renderingGroupRows) {
                            return (
                                // <>
                                    <MTableBodyRow {...props} />
                                // </>
                            );
                        } else return <></>;
                    },
                    Pagination: (props: any) => {
                        console.log("PAGINATION", props)
                        const maxCorrectPage = Math.floor(props.count / props.rowsPerPage)
                        const tooBigPage = maxCorrectPage < props.page
                        const newProps = {
                            ...props,
                            classes: {
                                root: props.classes.root
                            },
                            page: tooBigPage ? maxCorrectPage : props.page,
                            count: pagination.total_hits
                        }
                        console.log(newProps)
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