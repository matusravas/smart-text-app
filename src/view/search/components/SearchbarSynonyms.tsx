import { Dictionary } from "../../../model/dictionary/types"
import { Search, SearchData } from "../../../model/search/types"
import { SearchBarSynonymsWrapper, SwitchWrapper, SynonymParagraph, SynonymsWrapper } from "../styles/searchbar.synonyms.styles"
import { SwitchButton } from "./SwitchButton"

interface SearchbarSynonymsProps {
    visible: boolean
    isKeywords: boolean
    dictionary: Dictionary | null
    onSearchDataChange: (requestData: Partial<SearchData>) => void
}

function SearchbarSynonyms({ visible, isKeywords, dictionary, onSearchDataChange}: SearchbarSynonymsProps) {
    
    function toggleKeywords() {
        onSearchDataChange({isKeywords: !isKeywords})
    }

    return (
        <SearchBarSynonymsWrapper>
            {visible && dictionary &&
                <>
                    <SwitchWrapper>
                        <SwitchButton toggled={isKeywords} onChange={toggleKeywords} />
                    </SwitchWrapper>
                    {
                        <SynonymsWrapper>
                            <p>Searched also for:</p>
                            {dictionary.synonyms.map((synonym, idx) => (
                                <SynonymParagraph key={idx} overLined={!isKeywords}>{synonym}</SynonymParagraph>
                            ))}
                        </SynonymsWrapper>
                    }
                </>
            }
        </SearchBarSynonymsWrapper>
    )
}

export default SearchbarSynonyms