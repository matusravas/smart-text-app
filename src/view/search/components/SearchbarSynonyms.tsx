import { Dictionary } from "../../../model/dictionary/types"
import { Search, SearchData } from "../../../model/search/types"
import { SearchBarSynonymsWrapper, SwitchWrapper, SynonymParagraph, SynonymsWrapper } from "../styles/searchbar.synonyms.styles"
import { SwitchButton } from "./SwitchButton"

interface SearchbarSynonymsProps {
    search: Search
    dictionary: Dictionary | null
    onSearchDataChange: (requestData: Partial<SearchData>) => void
}

function SearchbarSynonyms({ search, dictionary, onSearchDataChange}: SearchbarSynonymsProps) {
    
    function toggleKeywords() {
        onSearchDataChange({search: {...search, isKeywords: !search.isKeywords}})
    }

    return (
        <SearchBarSynonymsWrapper>
            {dictionary &&
                <>
                    <SwitchWrapper>
                        <SwitchButton toggled={search.isKeywords} onChange={toggleKeywords} />
                    </SwitchWrapper>
                    {
                        <SynonymsWrapper>
                            <p>Searched also for:</p>
                            {dictionary.synonyms.map((synonym, idx) => (
                                <SynonymParagraph key={idx} use={search.isKeywords}>{synonym}</SynonymParagraph>
                            ))}
                        </SynonymsWrapper>
                    }
                </>
            }
        </SearchBarSynonymsWrapper>
    )
}

export default SearchbarSynonyms