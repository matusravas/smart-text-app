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
    submitSearchData: (requestData: Partial<SearchData>) => void
}

function Searchbar(props: SearchbarProps) {
    const [searchData, setSearchData] = useState(props.searchData)
    const [synonymsPanelVisible, setSynonymsPanelVisible] = useState(false)

    useEffect(() => {
        setSearchData(props.searchData)
        props.dictionaryData && setSynonymsPanelVisible(true)
    }, [props.searchData, props.dictionaryData])


    // function toggleSynonyms(searchPhrase: string) {
    //     if (props.searchData.search.phrase !== searchPhrase) setSynonymsPanelVisible(false)
    //     else setSynonymsPanelVisible(true)
    // }

    function handleSearchDataChange(newSearchData: Partial<SearchData>) {
        if(newSearchData.source?.index && newSearchData.source.index !== searchData.source.index) {
            props.submitSearchData({
                ...SearchDataDefault, ...newSearchData
            })
        }
        else {
            // newSearchData.search?.phrase && toggleSynonyms(newSearchData.search.phrase)
            if (newSearchData.search && newSearchData.search.phrase !== props.searchData.search.phrase) setSynonymsPanelVisible(false)
            else setSynonymsPanelVisible(true)
            setSearchData(prev => ({ ...prev, ...newSearchData }))
        }
    }

    function handleSubmit() {
        props.submitSearchData({
            ...searchData, pagination: {...TablePaginationDefault, pageSize: searchData.pagination.pageSize},
            // ...(searchData.search.phrase.length === 0 
            //     ? {hasKeywords: false}
            //     : props.searchData.search.phrase !== searchData.search.phrase //&& props.searchData.hasKeywords === searchData.hasKeywords
            //     ? {hasKeywords: true}
            //     : {hasKeywords: searchData.hasKeywords}
            // )
        })
    }

    function handleReset() {
        props.submitSearchData({ ...SearchDataDefault, source: searchData.source })
    }

    return (
        <SearchbarWrapper>
            <SearchImage
                onClick={handleReset}
                style={{ height: '60px', 'marginBottom': '32px', 'marginTop': '16px' }}
                src='/img/bekaert-logo.svg' alt='PDS' />

            <SearchbarForm
                searchData={searchData}
                // operatorDisabled={!searchData.hasKeywords && !props.dictionaryData}
                sources={props.sources}
                onSearchDataChange={handleSearchDataChange}
                onSubmit={handleSubmit} />
                
            <SearchbarSynonyms
                visible={synonymsPanelVisible}
                hasKeywords={searchData.hasKeywords}
                dictionary={props.dictionaryData}
                onSearchDataChange={handleSearchDataChange} />

        </SearchbarWrapper>
    )
}

export default Searchbar