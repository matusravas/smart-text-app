import { IconButton, Tooltip } from "@material-ui/core";
import { ClearAll, Delete, FileCopy } from "@material-ui/icons";
import { useSearchViewModel } from "../../viewmodel/search/SearchDashboardViewModel";
import { Snackbar } from "../app/components/Snackbar";
import { Table } from "../table/Table";
import { MenuButtonCheckbox } from "./components/MenuCheckboxButton";
import Searchbar from "./components/SearchBar";

import { TableLastTimestamp, TableTopbar, TableTopbarWrapper } from "../table/styles/table.styles";
import { SearchDashboardWrapper } from "./styles/searchbar.styles";
import { Button, MenuTitle, MenuHeaderWrapper } from "./styles/searchbar.toolbar.styles";
import { ConfirmDialog } from "../app/components/ConfirmDialog";

function SearchDashboard() {
    const {
        status
        , searchData
        , dictionaryData
        , onSearchDataObtained
        , fetchSourceFiles
        , submitSearch
        , handleSafeSourceDelete
        , confirmation
        , closeConfirmation
        , handleError
        , handleSuccess
        , resetStatus
        , lastTimestamp
    } = useSearchViewModel()

    return (
        <SearchDashboardWrapper>
            <Searchbar
                searchData={searchData}
                onError={handleError}
                dictionaryData={dictionaryData}
                submitSearch={submitSearch}
            />
            {searchData.source.index ?
                <Table
                    searchData={searchData}
                    onSearchDataObtained={onSearchDataObtained}
                    submitSearch={submitSearch}
                    handleError={handleError}
                    handleSuccess={handleSuccess}
                    additionalComponents={{
                        TopBar: (props) => {
                            return (
                                <TableTopbarWrapper>
                                    <TableTopbar>
                                        {/* <button 
                                            onClick={()=>handleDeleteSource(searchData.source)}>DELETE</button> */}
                                        <MenuButtonCheckbox
                                            dynamic
                                            id="files"
                                            hidden={searchData.source.type !== 'file'}
                                            label="Select files"
                                            styles={{
                                                Button: { minWidth: '105px', height: '40px', fontWeight: '300', backgroundColor: '#f7f7f7' }
                                                , Item: {
                                                    Label: { fontSize: '16px' }
                                                    , SubLabel: { fontSize: '14px' }
                                                }
                                            }}
                                            optionsFetcher={fetchSourceFiles}
                                            // forcedIndices={[0]}
                                            components={{
                                                Header: (props) => {
                                                    return (
                                                        <MenuHeaderWrapper style={{justifyContent: 'space-between'}}>
                                                            <IconButton style={{padding: '0px 6px'}} onClick={props.onReset}>
                                                                <Tooltip title="Delete source" placement="top">
                                                                    <Delete
                                                                        onClick={() => handleSafeSourceDelete(searchData.source)}
                                                                        style={{ color: '#efefef' }} />
                                                                </Tooltip>
                                                            </IconButton>
                                                            <MenuTitle>Select files</MenuTitle>
                                                            <IconButton style={{padding: '0px 6px'}} onClick={props.onReset}>
                                                                <Tooltip title="Clear all" placement="top">
                                                                    <ClearAll style={{ color: '#cecece'}} />
                                                                </Tooltip>
                                                            </IconButton>
                                                        </MenuHeaderWrapper>
                                                    )
                                                },
                                                Footer: (props) => {
                                                    return (
                                                        <Button
                                                            onClick={() => {
                                                                const checkedUIDs = props.options.filter(it => it.checked).map(it => it.value)
                                                                submitSearch({ source: { ...searchData.source, type: 'file', uids: checkedUIDs } })
                                                                props.onClose()
                                                            }}
                                                            style={{
                                                                fontSize: '15px'
                                                                , width: '100%'
                                                                , marginTop: '6px'
                                                                , borderRadius: 0
                                                                , backgroundColor: '#E5E5E5'
                                                                , fontWeight: 600
                                                                , ...props.style
                                                            }}
                                                        >
                                                            Submit
                                                        </Button>
                                                    )

                                                }
                                            }}
                                        />
                                    </TableTopbar>

                                    <TableTopbar>
                                        {lastTimestamp
                                            ? <TableLastTimestamp>Last update: {lastTimestamp}</TableLastTimestamp>
                                            : null
                                        }
                                        <IconButton onClick={props.handleExport} style={{ alignSelf: 'flex-end' }}>
                                            <Tooltip title='Export' placement="right">
                                                <FileCopy style={{ color: '#DCDCDC' }} />
                                            </Tooltip>
                                        </IconButton>
                                    </TableTopbar>
                                </TableTopbarWrapper>

                            );
                        },
                    }}
                />
                : null
            }
            <Snackbar
                open={status.message ? true : false}
                type={status.type}
                text={status.message}
                onClose={resetStatus}
            />
            <ConfirmDialog
                {...confirmation}
                onCancel={() => closeConfirmation({})} />
        </SearchDashboardWrapper>
    )
}

export default SearchDashboard