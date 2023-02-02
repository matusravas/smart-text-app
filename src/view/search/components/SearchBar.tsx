import { useEffect, useState } from "react"
import { Date, DictionaryData, Search, SearchData, SearchDataDefault } from "../../../model/search/types"
import { SearchbarWrapper, SearchImage } from '../styles/searchbar.styles'
import SearchbarForm from "./SearchbarForm"
import SearchbarSynonyms from "./SearchbarSynonyms"

interface SearchbarProps {
    search: Search
    date: Date
    dictionaryData: DictionaryData | null
    lastTimestamp: number | null
    onRequestDataChange: (requestData: Partial<SearchData>) => void,
}

function Searchbar({ search, date, dictionaryData, lastTimestamp, onRequestDataChange }: SearchbarProps) {
    const [isKeywords, setIsKeywords] = useState(() => search.isKeywords)

    useEffect(() => {
        dictionaryData && setIsKeywords(dictionaryData.useKeywords)
    }, [dictionaryData?.useKeywords])

    function handleIsKeywordsChange() {
        setIsKeywords(!isKeywords)
    }

    return (
        <SearchbarWrapper>
            <SearchImage
                onClick={()=>onRequestDataChange({...SearchDataDefault, lastTimestamp})}
                style={{ height: '60px', 'marginBottom': '32px', 'marginTop': '16px' }} 
                src='/img/bekaert-logo.svg' alt='PDS' />
            <SearchbarForm
                search={search}
                date={date}
                isKeywords={isKeywords}
                lastTimestamp={lastTimestamp}
                onRequestDataChange={onRequestDataChange} />
            <SearchbarSynonyms
                dictionaryData={dictionaryData}
                isKeywords={isKeywords}
                onIsKeywordsChange={handleIsKeywordsChange} />
        </SearchbarWrapper>
    )
}

export default Searchbar