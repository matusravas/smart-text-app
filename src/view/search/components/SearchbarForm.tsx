import { Dictionary } from "../../../model/dictionary/types"
import { Operator, SearchData, SourceOption } from "../../../model/search/types"
import useSearchbarForm from "../../../viewmodel/search/SearchbarFormViewModel"
import { DateRangePicker } from "../../app/components/DatePicker/DateRangePicker"
import { SearchbarFormWrapper, SearchButton } from '../styles/searchbar.styles'
import { SearchToolbar } from "../styles/searchbar.toolbar.styles"
import { MenuButton } from "./MenuButton"
import { SearchInput } from "./SearchInput"

export interface SearchbarFormProps {
    searchData: SearchData
    dictionary: Dictionary | null
    keywords: boolean
    sources: SourceOption[]
    onSynonyms: (value: boolean) => void
    onSubmit: (searchData: SearchData) => void
}

function SearchbarForm(props: SearchbarFormProps) {
    const {
        searchData,
        operatorVisible,
        selectSourceOptions,
        selectOperatorOptions,
        handleFormDataChange,
        handleSubmit
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
                        onSelected={(it) => handleFormDataChange({operator: it as Operator})} 
                    />}
            />
            {props.sources.length > 0 ?
                <SearchToolbar>
                    <MenuButton
                        titleItem
                        title="Source"
                        buttonStyles={{ minWidth: '125px', backgroundColor: '#f7f7f7' }}
                        value={searchData.source.indexAlias}
                        options={selectSourceOptions}
                        onSelected={(it) => handleFormDataChange({index: it})}
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