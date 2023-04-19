import { IconButton, Tooltip } from "@material-ui/core";
import { Restore } from "@material-ui/icons";
import { useSearchViewModel } from "../../viewmodel/search/SearchDashboardViewModel";
import { Snackbar } from "../app/components/Snackbar";
import { Table } from "../table/Table";
import { MenuButtonCheckbox } from "./components/MenuCheckboxButton";
import Searchbar from "./components/SearchBar";

import { SearchDashboardWrapper } from "./styles/searchbar.styles";
import { MenuButtonWrapper, MenuTitle, MenuTitleWrapper } from "./styles/searchbar.toolbar.styles";

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
                    topbar={() => (
                        <MenuButtonCheckbox
                            dynamic
                            id="files"
                            label="Select files"
                            buttonStyles={{ minWidth: '60px', height: '40px', fontWeight: '300', backgroundColor: '#f7f7f7' }}
                            optionsFetcher={fetchSourceFiles}
                            // forcedIndices={[0]}
                            titleElement={it => {
                                return (
                                    <MenuTitleWrapper>
                                        <MenuTitle>Select files</MenuTitle>
                                        <IconButton style={{ position: 'absolute', right: 0 }} onClick={it.onReset}>
                                            <Tooltip title="Reset" placement="top">
                                                <Restore style={{ color: '#cecece' }} />
                                            </Tooltip>
                                        </IconButton>
                                    </MenuTitleWrapper>
                                )
                            }}
                            footerElement={({options, onClose}) => {
                                return (
                                    <MenuButtonWrapper
                                        onClick={() => {
                                            const checkedUIDs = options.filter(it => it.checked).map(it => it.value)
                                            submitSearch({ source: { ...searchData.source, uids: checkedUIDs } })
                                            onClose()
                                        }}
                                        style={{
                                            marginBottom: '-8px'
                                            , width: '100%'
                                            , borderRadius: 0
                                            , backgroundColor: '#E5E5E5'
                                            , fontWeight: 600
                                        }}
                                    > 
                                        Submit
                                    </MenuButtonWrapper>)
                            }
                            }
                        // onSubmit={(options) => {
                        //     const checkedUIDs = options.filter(it => it.checked).map(it => it.value)
                        //     submitSearch({ source: { ...searchData.source, uids: checkedUIDs } })
                        // }}
                        />
                    )}
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