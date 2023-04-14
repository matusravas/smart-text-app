import { Dictionary } from "../../../model/dictionary/types"
import { SearchData } from "../../../model/search/types"
import useSearchbarViewModel from "../../../viewmodel/search/SearchbarViewModel"
import { SearchbarWrapper, SearchImage } from '../styles/searchbar.styles'
import { MenuOption } from "./MenuButton"
import SearchbarForm from "./SearchbarForm"
import SearchbarSynonyms from "./SearchbarSynonyms"

interface SearchbarProps {
    searchData: SearchData
    dictionaryData: Dictionary | null
    submitSearch: (requestData: SearchData, reset?: boolean) => void
    fetchSources: (event: React.MouseEvent<HTMLButtonElement>) => Promise<MenuOption[]>
}

function Searchbar(props: SearchbarProps) {
    const {
        searchData,
        operatorVisible,
        // keywords,
        synonymsVisible,
        fetchSources,
        selectOperatorOptions,
        handleKeywordsChange,
        handleFormDataChange,
        handleSubmit,
        handleReset
    } = useSearchbarViewModel(props)
    return (
        <SearchbarWrapper>
            <SearchImage
                onClick={handleReset}
                style={{ height: '60px', 'marginBottom': '32px', 'marginTop': '16px' }}
                src='/img/bekaert-logo.svg' alt='PDS' />

            <SearchbarForm
                searchData={searchData}
                operatorVisible={operatorVisible}
                operatorOptions={selectOperatorOptions}
                onFormDataChange={handleFormDataChange}
                fetchSources={fetchSources}
                submitSearch={handleSubmit} />
                
            <SearchbarSynonyms
                visible={synonymsVisible}
                keywords={searchData.keywords}
                dictionary={props.dictionaryData}
                onKeywordsChange={handleKeywordsChange} />

        </SearchbarWrapper>
    )
}

export default Searchbar