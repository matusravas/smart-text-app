import { Dictionary } from "../../../model/dictionary/types"
import { SearchData } from "../../../model/search/types"
import { SearchBarSynonymsWrapper, SwitchWrapper, SynonymParagraph, SynonymsWrapper } from "../styles/searchbar.synonyms.styles"
import { SwitchButton } from "./SwitchButton"

interface SearchbarSynonymsProps {
    visible: boolean
    hasKeywords: boolean
    dictionary: Dictionary | null
    onSearchDataChange: (requestData: Partial<SearchData>) => void
}

function SearchbarSynonyms({ visible, hasKeywords, dictionary, onSearchDataChange}: SearchbarSynonymsProps) {
    
    function toggleKeywords() {
        onSearchDataChange({hasKeywords: !hasKeywords})
    }

    return (
        <SearchBarSynonymsWrapper>
            {visible && dictionary &&
                <>
                    <SwitchWrapper>
                        <SwitchButton toggled={hasKeywords} onChange={toggleKeywords} />
                    </SwitchWrapper>
                    {
                        <SynonymsWrapper>
                            <p>Searched also for:</p>
                            {dictionary.synonyms.map((synonym, idx) => (
                                <SynonymParagraph key={idx} overLined={!hasKeywords}>{synonym}</SynonymParagraph>
                            ))}
                        </SynonymsWrapper>
                    }
                </>
            }
        </SearchBarSynonymsWrapper>
    )
}

export default SearchbarSynonyms