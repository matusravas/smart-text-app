import { useEffect, useState } from 'react'
import { Dictionary as DictionaryResult } from '../model/dictionary/types'
import DictionaryRepository from '../repository/dictionary/DictionaryRepository'


export const useDictionaryViewModel = () => {
    const repository = DictionaryRepository.getInstance()
    const [keyword, setKeyword] = useState<string>()
    const [data, setData] = useState<Array<DictionaryResult> | DictionaryResult>()

    useEffect(() => {
    }, [])


    const getSynonyms = async () => {
        const results = await repository.getSynonyms(keyword)
    }

    return {
        data
    }
}