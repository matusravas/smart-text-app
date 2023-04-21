import { IconButton, Tooltip } from "@material-ui/core";
import { FileCopy, Restore } from "@material-ui/icons";
import { useSearchViewModel } from "../../viewmodel/search/SearchDashboardViewModel";
import { Snackbar } from "../app/components/Snackbar";
import { Table } from "../table/Table";
import { MenuButtonCheckbox } from "./components/MenuCheckboxButton";
import Searchbar from "./components/SearchBar";

import { SearchDashboardWrapper } from "./styles/searchbar.styles";
import { MenuSubmitButton, MenuTitle, MenuTitleWrapper } from "./styles/searchbar.toolbar.styles";
import { TableLastTimestamp, TableTopbar, TableTopbarWrapper } from "../table/styles/table.styles";

function SearchDashboard() {
    const {
        status
        , searchData
        , dictionaryData
        , onSearchDataObtained
        , fetchSourceFiles
        , submitSearch
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
                                        <MenuButtonCheckbox
                                            dynamic
                                            id="files"
                                            hidden={searchData.source.type !== 'file'}
                                            label="Select files"
                                            styles={{
                                                Button: { minWidth: '60px', height: '40px', fontWeight: '300', backgroundColor: '#f7f7f7' }
                                                , Item: {
                                                    Label: { fontSize: '16px' }
                                                    , SubLabel: { fontSize: '14px' }
                                                }
                                                , SubItem: { fontSize: 10 }
                                            }}
                                            optionsFetcher={fetchSourceFiles}
                                            // forcedIndices={[0]}
                                            components={{
                                                Header: (props) => {
                                                    return (
                                                        <MenuTitleWrapper>
                                                            <MenuTitle>Select files</MenuTitle>
                                                            <IconButton style={{ position: 'absolute', right: 0, top: 0 }} onClick={props.onReset}>
                                                                <Tooltip title="Reset" placement="top">
                                                                    <Restore style={{ color: '#cecece' }} />
                                                                </Tooltip>
                                                            </IconButton>
                                                        </MenuTitleWrapper>
                                                    )
                                                },
                                                Footer: (props) => {
                                                    return (
                                                        <MenuSubmitButton
                                                            onClick={() => {
                                                                const checkedUIDs = props.options.filter(it => it.checked).map(it => it.value)
                                                                submitSearch({ source: { ...searchData.source, type: 'file', uids: checkedUIDs } })
                                                                props.onClose()
                                                            }}
                                                            style={{
                                                                fontSize: '15px'
                                                                , width: '100%'
                                                                , borderRadius: 0
                                                                , backgroundColor: '#E5E5E5'
                                                                , fontWeight: 600
                                                                , ...props.style
                                                            }}
                                                        >
                                                            Submit
                                                        </MenuSubmitButton>
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
        </SearchDashboardWrapper>
    )
}

export default SearchDashboard