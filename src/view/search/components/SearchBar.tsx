import { useEffect, useState } from "react"
import { Dictionary } from "../../../model/dictionary/types"
import { SearchData, SearchDataDefault } from "../../../model/search/types"
import { TablePaginationDefault } from "../../../model/table/types"
import { SearchbarWrapper, SearchImage } from '../styles/searchbar.styles'
import SearchbarForm from "./SearchbarForm"
import SearchbarSynonyms from "./SearchbarSynonyms"

interface SearchbarProps {
    searchData: SearchData
    dictionaryData: Dictionary | null
    onSearchDataChange: (requestData: Partial<SearchData>) => void,
}

function Searchbar({ onSearchDataChange, ...props }: SearchbarProps) {
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

    function handleSearchDataChange(newSearchData: Partial<SearchData>) {
        newSearchData.search?.phrase && toggleSynonyms(newSearchData.search.phrase)
        setSearchData(prev => ({ ...prev, ...newSearchData }))
    }

    function handleSubmit() {
        onSearchDataChange({
            ...searchData, pagination: TablePaginationDefault,
            ...(props.searchData.search.phrase !== searchData.search.phrase && {isKeywords: true})
        })
    }

    function handleReset() {
        onSearchDataChange({ ...SearchDataDefault, lastTimestamp: searchData.lastTimestamp })
    }

    return (
        <SearchbarWrapper>
            <SearchImage
                onClick={handleReset}
                style={{ height: '60px', 'marginBottom': '32px', 'marginTop': '16px' }}
                src='/img/bekaert-logo.svg' alt='PDS' />
            <SearchbarForm
                searchData={searchData}
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