import { useEffect, useState } from "react"
import { DictionaryData } from "../../../model/search/types"
import { SearchBarSynonymsWrapper, SwitchWrapper, SynonymParagraph, SynonymsWrapper } from "../styles/searchbar.synonyms.styles"
import { SwitchButton } from "./SwitchButton"

interface SearchbarSynonymsProps {
    dictionaryData: DictionaryData | null
    isKeywords: boolean
    onIsKeywordsChange: () => void
}

function SearchbarSynonyms({ dictionaryData, isKeywords, onIsKeywordsChange: handleIsKeywordsChange }: SearchbarSynonymsProps) {

    return (
        <SearchBarSynonymsWrapper>
            {dictionaryData &&
                <>
                    <SwitchWrapper>
                        <SwitchButton toggled={isKeywords} onChange={handleIsKeywordsChange} />
                    </SwitchWrapper>
                    {
                        <SynonymsWrapper>
                            <p>Searched also for:</p>
                            {dictionaryData.dictionary.synonyms.map((synonym, idx) => (
                                <SynonymParagraph key={idx} use={isKeywords}>{synonym}</SynonymParagraph>
                            ))}
                        </SynonymsWrapper>
                    }
                </>
            }
        </SearchBarSynonymsWrapper>
    )
}

export default SearchbarSynonyms