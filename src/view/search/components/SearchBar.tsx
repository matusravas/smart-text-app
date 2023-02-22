import { useEffect, useState } from "react"
import { Dictionary } from "../../../model/dictionary/types"
import { SourceOption, SearchData, SearchDataDefault } from "../../../model/search/types"
import { TablePaginationDefault } from "../../../model/table/types"
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
    // const [searchData, setSearchData] = useState(props.searchData)
    const [keywords, setKeywords] = useState(props.searchData.keywords)
    const [synonymsVisible, setSynonymsVisible] = useState(false)

    useEffect(() => {
        setKeywords(props.searchData.keywords)
    }, [props.searchData.keywords])


    // function toggleSynonyms(searchPhrase: string) {
    //     if (props.searchData.search.phrase !== searchPhrase) setSynonymsPanelVisible(false)
    //     else setSynonymsPanelVisible(true)
    // }

    function handleKeywordsChange(value: boolean) {
        // setSearchData(prev => ({ ...prev, hasKeywords: value }))
        setKeywords(value)
    }

    function handleSynonymsPanel(visible: boolean) {
        setSynonymsVisible(visible)
    }

    // function handleSearchDataChange(newSearchData: Partial<SearchData>) {
    //     if(newSearchData.source?.index && newSearchData.source.index !== searchData.source.index) {
    //         props.submitSearchData({
    //             ...SearchDataDefault, ...newSearchData
    //         })
    //     }
    //     else {
    //         // newSearchData.search?.phrase && toggleSynonyms(newSearchData.search.phrase)
    //         if (newSearchData.search && newSearchData.search.phrase !== props.searchData.search.phrase) setSynonymsPanelVisible(false)
    //         else setSynonymsPanelVisible(true)
    //         setSearchData(prev => ({ ...prev, ...newSearchData }))
    //     }
    // }

    // function handleSubmit() {
    //     props.submitSearchData({
    //         ...searchData, pagination: {...TablePaginationDefault, pageSize: searchData.pagination.pageSize},
    //         ...(searchData.search.phrase.length === 0 
    //             ? {hasKeywords: false}
    //             : props.searchData.search.phrase !== searchData.search.phrase //&& props.searchData.hasKeywords === searchData.hasKeywords
    //             ? {hasKeywords: true}
    //             : {hasKeywords: searchData.hasKeywords}
    //         )
    //     })
    // }

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
                // operatorDisabled={!searchData.hasKeywords && !props.dictionaryData}
                sources={props.sources}
                // onSearchDataChange={handleSearchDataChange}
                onSynonyms={handleSynonymsPanel}
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