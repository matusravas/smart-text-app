import { useEffect, useState } from "react"
import { Dictionary } from "../../../model/dictionary/types"
import { IndexTimestamp, SearchData, SearchDataDefault } from "../../../model/search/types"
import { TablePaginationDefault } from "../../../model/table/types"
import { SearchbarWrapper, SearchImage } from '../styles/searchbar.styles'
import SearchbarForm from "./SearchbarForm"
import SearchbarSynonyms from "./SearchbarSynonyms"

interface SearchbarProps {
    searchData: SearchData
    indicesWithTimestamps: IndexTimestamp[]
    dictionaryData: Dictionary | null
    onSearchDataChange: (requestData: Partial<SearchData>) => void,
}

function Searchbar(props: SearchbarProps) {
    const [searchData, setSearchData] = useState(props.searchData)
    const [synonymsVisible, setSynonymsVisible] = useState(props.searchData.isKeywords)

    useEffect(() => {
        setSearchData(props.searchData)
        props.dictionaryData && props.searchData.isKeywords && setSynonymsVisible(true)
    }, [props.searchData, props.dictionaryData])

    function toggleSynonyms(searchPhrase: string) {
        if (props.searchData.search.phrase !== searchPhrase) setSynonymsVisible(false)
        else setSynonymsVisible(true)
    }

    function handleSearchDataChange(newSearchData: Partial<SearchData>, submit?: boolean) {
        console.log(submit)
        console.log(newSearchData)
        if(submit === true) {
            props.onSearchDataChange({
                ...searchData, ...newSearchData,
                 pagination: {...TablePaginationDefault, pageSize: searchData.pagination.pageSize},
            })
        } else {
            newSearchData.search?.phrase && toggleSynonyms(newSearchData.search.phrase)
            setSearchData(prev => ({ ...prev, ...newSearchData }))
        }
    }

    function handleSubmit() {
        props.onSearchDataChange({
            ...searchData, pagination: {...TablePaginationDefault, pageSize: searchData.pagination.pageSize},
            ...(props.searchData.search.phrase !== searchData.search.phrase && {isKeywords: true})
        })
    }

    function handleReset() {
        props.onSearchDataChange({ ...SearchDataDefault })
    }

    return (
        <SearchbarWrapper>
            <SearchImage
                onClick={handleReset}
                style={{ height: '60px', 'marginBottom': '32px', 'marginTop': '16px' }}
                src='/img/bekaert-logo.svg' alt='PDS' />
            <SearchbarForm
                searchData={searchData}
                indicesWithTimestamps={props.indicesWithTimestamps}
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