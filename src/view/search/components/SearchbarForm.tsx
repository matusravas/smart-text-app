import { Operator, SearchData } from "../../../model/search/types"
import { FormDataOptions } from "../../../viewmodel/search/SearchbarViewModel"
import { DateRangePicker } from "../../app/components/DatePicker/DateRangePicker"
import { SearchButton, SearchbarFormWrapper } from '../styles/searchbar.styles'
import { SearchToolbar } from "../styles/searchbar.toolbar.styles"
import { MenuButton, MenuOption } from "./MenuButton"
import { SearchInput } from "./SearchInput"

export interface SearchbarFormProps {
    searchData: SearchData
    operatorVisible: boolean
    operatorOptions: MenuOption[]
    fetchSources: (event: React.MouseEvent<HTMLButtonElement>) => Promise<MenuOption[]>
    onSourcesObtained: (options: MenuOption[]) => void
    onFormDataChange: (it: FormDataOptions) => void
    submitSearch: (event: any) => void
    onError?: (err: string) => void
}

function SearchbarForm(
    {  
        searchData
        , onFormDataChange
        , fetchSources
        , onSourcesObtained
        , submitSearch
        , operatorVisible
        , operatorOptions
        , onError
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
                        dynamic
                        titleItem
                        title="Source"
                        buttonStyles={{ width: '150px', height: '40px', backgroundColor: '#f7f7f7' }}
                        value={searchData.source.index}
                        label={searchData.source.alias}
                        onError={onError}
                        optionsFetcher={fetchSources}
                        onOptionsFetched={onSourcesObtained}
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