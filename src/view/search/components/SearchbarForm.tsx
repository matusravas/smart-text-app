import { Operator, SearchData } from "../../../model/search/types"
import { FormChangeData } from "../../../viewmodel/search/SearchbarViewModel"
import { DateRangePicker } from "../../app/components/DatePicker/DateRangePicker"
import { SearchbarFormWrapper, SearchButton } from '../styles/searchbar.styles'
import { SearchToolbar } from "../styles/searchbar.toolbar.styles"
import { MenuButton, MenuOption } from "./MenuButton"
import { SearchInput } from "./SearchInput"

export interface SearchbarFormProps {
    searchData: SearchData
    operatorVisible: boolean
    operatorOptions: MenuOption[]
    fetchSources: (event: React.MouseEvent<HTMLButtonElement>) => Promise<MenuOption[]>
    onFormDataChange: (it: FormChangeData) => void
    submitSearch: (event: any) => void
}

function SearchbarForm(
    {  
        searchData
        , onFormDataChange
        , fetchSources
        , submitSearch
        , operatorVisible
        , operatorOptions
    }: SearchbarFormProps) {

    return (
        <SearchbarFormWrapper autoComplete="off" onSubmit={submitSearch}>
            <SearchInput
                value={searchData.searchPhrase}
                onChange={(e) => onFormDataChange({phrase: e.target.value})}
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
                        options={operatorOptions}
                        onSelected={(it) => onFormDataChange({operator: it.value as Operator})} 
                    />}
            />
            {searchData.source.index ?
                <SearchToolbar>
                    <MenuButton
                        titleItem
                        title="Source"
                        buttonStyles={{ width: '150px', height: '40px', backgroundColor: '#f7f7f7' }}
                        value={searchData.source.index}
                        label={searchData.source.indexAlias}
                        // options={selectSourceOptions}
                        optionsFetcher={fetchSources}
                        onSelected={(it) => onFormDataChange({source: {index: it.value, alias: it.label}})}
                    />

                    <DateRangePicker
                        selectedDateRange={searchData.dateRange}
                        onChange={(it) => onFormDataChange({dateRange: it})}
                        onSubmit={(e, dateRange) => {
                            submitSearch(e)
                        }}
                    />

                    <SearchButton />
                </SearchToolbar> : null}
        </SearchbarFormWrapper>
    )
}

export default SearchbarForm