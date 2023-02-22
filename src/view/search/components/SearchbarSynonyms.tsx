import { Dictionary } from "../../../model/dictionary/types"
import { SearchBarSynonymsWrapper, SwitchWrapper, SynonymParagraph, SynonymsWrapper } from "../styles/searchbar.synonyms.styles"
import { SwitchButton } from "./SwitchButton"

interface SearchbarSynonymsProps {
    visible: boolean
    keywords: boolean
    dictionary: Dictionary | null
    onKeywordsChange: (value: boolean) => void
}

function SearchbarSynonyms({ visible, keywords, dictionary, onKeywordsChange}: SearchbarSynonymsProps) {

    return (
        <SearchBarSynonymsWrapper>
            {visible && dictionary &&
                <>
                    <SwitchWrapper>
                        <SwitchButton toggled={keywords} onChange={() => onKeywordsChange(!keywords)} />
                    </SwitchWrapper>
                    {
                        <SynonymsWrapper>
                            <p>Searched also for:</p>
                            {dictionary.synonyms.map((synonym, idx) => (
                                <SynonymParagraph key={idx} overLined={!keywords}>{synonym}</SynonymParagraph>
                            ))}
                        </SynonymsWrapper>
                    }
                </>
            }
        </SearchBarSynonymsWrapper>
    )
}

export default SearchbarSynonyms