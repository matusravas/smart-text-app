import { Dictionary } from "../../../model/dictionary/types"
import { Operator, SearchData } from "../../../model/search/types"
import useSearchbarForm from "../../../viewmodel/search/SearchbarFormViewModel"
import { DateRangePicker } from "../../app/components/DatePicker/DateRangePicker"
import { SearchbarFormWrapper, SearchButton } from '../styles/searchbar.styles'
import { SearchToolbar } from "../styles/searchbar.toolbar.styles"
import { MenuButton, MenuOption } from "./MenuButton"
import { SearchInput } from "./SearchInput"

export interface SearchbarFormProps {
    searchData: SearchData
    dictionary: Dictionary | null
    keywords: boolean
    onSynonyms: (value: boolean) => void
    fetchSources: (event: React.MouseEvent<HTMLButtonElement>) => Promise<MenuOption[]>
    onSubmit: (searchData: SearchData) => void
}

function SearchbarForm(props: SearchbarFormProps) {
    const {
        searchData,
        operatorVisible,
        selectOperatorOptions,
        handleFormDataChange,
        handleSubmit,
    } = useSearchbarForm(props)
    return (
        <SearchbarFormWrapper autoComplete="off" onSubmit={handleSubmit}>
            <SearchInput
                value={searchData.searchPhrase}
                onChange={(e) => handleFormDataChange({phrase: e.target.value})}
                endAdornment={(styles) =>
                    <MenuButton
                        visible={operatorVisible}
                        titleItem
                        title="Operator"
                        buttonStyles={{
                            ...styles, height: '50px',
                            minWidth: '60px', fontWeight: '300',
                        }}
                        value={searchData.searchOperator}
                        options={selectOperatorOptions}
                        onSelected={(it) => handleFormDataChange({operator: it.value as Operator})} 
                    />}
            />
            {props.searchData.source.index ?
                <SearchToolbar>
                    <MenuButton
                        titleItem
                        title="Source"
                        buttonStyles={{ width: '150px', height: '40px', backgroundColor: '#f7f7f7' }}
                        value={searchData.source.index}
                        label={searchData.source.indexAlias}
                        // options={selectSourceOptions}
                        onReload={props.fetchSources}
                        onSelected={(it) => handleFormDataChange({source: {index: it.value, alias: it.label}})}
                    />

                    <DateRangePicker
                        selectedDateRange={searchData.dateRange}
                        onChange={(it) => handleFormDataChange({dateRange: it})}
                        onSubmit={(e, dateRange) => {
                            handleSubmit(e)
                        }}
                    />

                    <SearchButton />
                </SearchToolbar> : null}
        </SearchbarFormWrapper>
    )
}

export default SearchbarForm