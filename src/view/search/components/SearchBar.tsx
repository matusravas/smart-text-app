import { useEffect, useState } from "react"
import { Dictionary } from "../../../model/dictionary/types"
import { SearchData, SearchDataDefault, SourceOption } from "../../../model/search/types"
import { SearchbarWrapper, SearchImage } from '../styles/searchbar.styles'
import SearchbarForm from "./SearchbarForm"
import SearchbarSynonyms from "./SearchbarSynonyms"

interface SearchbarProps {
    searchData: SearchData
    sources: SourceOption[]
    dictionaryData: Dictionary | null
    submitSearchData: (requestData: SearchData) => void
}

function Searchbar(props: SearchbarProps) {
    const [keywords, setKeywords] = useState(props.searchData.keywords)
    const [synonymsVisible, setSynonymsVisible] = useState(false)

    useEffect(() => {
        setKeywords(props.searchData.keywords)
    }, [props.searchData.keywords])

    function handleKeywordsChange(value: boolean) {
        setKeywords(value)
    }

    function handleSynonymsChange(visible: boolean) {
        setSynonymsVisible(visible)
    }

    function handleReset() {
        props.submitSearchData({ ...SearchDataDefault, source: props.searchData.source })
    }
    
    return (
        <SearchbarWrapper>
            <SearchImage
                onClick={handleReset}
                style={{ height: '60px', 'marginBottom': '32px', 'marginTop': '16px' }}
                src='/img/bekaert-logo.svg' alt='PDS' />

            <SearchbarForm
                searchData={props.searchData}
                keywords={keywords}
                dictionary={props.dictionaryData}
                sources={props.sources}
                onSynonyms={handleSynonymsChange}
                onSubmit={props.submitSearchData} />
                
            <SearchbarSynonyms
                visible={synonymsVisible}
                keywords={keywords}
                dictionary={props.dictionaryData}
                onKeywordsChange={handleKeywordsChange} />

        </SearchbarWrapper>
    )
}

export default Searchbar