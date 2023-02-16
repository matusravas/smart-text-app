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
    submitSearchData: (requestData: Partial<SearchData>) => void,
}

function Searchbar(props: SearchbarProps) {
    const [searchData, setSearchData] = useState(props.searchData)
    const [synonymsVisible, setSynonymsVisible] = useState(props.searchData.isKeywords)

    useEffect(() => {
        setSearchData(props.searchData)
        props.dictionaryData && props.searchData.isKeywords && setSynonymsVisible(true)
    }, [props.searchData, props.dictionaryData])

    // console.log(searchData)

    function toggleSynonyms(searchPhrase: string) {
        if (props.searchData.search.phrase !== searchPhrase) setSynonymsVisible(false)
        else setSynonymsVisible(true)
    }

    function handleSearchDataChange(newSearchData: Partial<SearchData>) {
        // console.log(newSearchData)
        if(newSearchData.source?.index && newSearchData.source.index !== searchData.source.index) {
            props.submitSearchData({
                ...SearchDataDefault, ...newSearchData
            })
        }
        else {
            newSearchData.search?.phrase && toggleSynonyms(newSearchData.search.phrase)
            setSearchData(prev => ({ ...prev, ...newSearchData }))
        }
    }

    function handleSubmit() {
        props.submitSearchData({
            ...searchData, pagination: {...TablePaginationDefault, pageSize: searchData.pagination.pageSize},
            ...(props.searchData.search.phrase !== searchData.search.phrase 
                && searchData.search.phrase.length > 0 && {isKeywords: true})
        })
    }

    function handleReset() {
        props.submitSearchData({ ...SearchDataDefault })
    }

    return (
        <SearchbarWrapper>
            <SearchImage
                onClick={handleReset}
                style={{ height: '60px', 'marginBottom': '32px', 'marginTop': '16px' }}
                src='/img/bekaert-logo.svg' alt='PDS' />

            <SearchbarForm
                searchData={searchData}
                operatorDisabled={!searchData.isKeywords}
                sources={props.sources}
                onSearchDataChange={handleSearchDataChange}
                onSubmit={handleSubmit} />
                
            <SearchbarSynonyms
                visible={synonymsVisible}
                isKeywords={searchData.isKeywords}
                dictionary={props.dictionaryData}
                onSearchDataChange={handleSearchDataChange} />

        </SearchbarWrapper>
    )
}

export default Searchbar