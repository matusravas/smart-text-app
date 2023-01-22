import { Dictionary } from "../../../model/dictionary/types"
import { HighlightedText } from "./HighlightedText"
import { CardWrapper } from "./styles/card.styles"

type CardProps = {
    value: Dictionary,
    searchQuery: string,
    onClick?: () => void
}

export function Card({ value, searchQuery, onClick }: CardProps) {
    return (
        <CardWrapper onClick={onClick}>
            <HighlightedText element="h2" text={value.keyword} match={searchQuery}/>
            <HighlightedText element="h4" text={value.definition} match={searchQuery}/>
            <HighlightedText element="p" text={value.synonyms.join(' • ')} match={searchQuery}/>
        </CardWrapper>
    )
}