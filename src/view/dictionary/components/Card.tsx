import { Dictionary } from "../../../model/dictionary/types"
import { HighlightedText } from "./HighlightedText"
import { CardWrapper, Divider } from "./styles/card.styles"

type CardProps = {
    value: Dictionary,
    searchQuery: string,
    onClick?: () => void
}

export function Card({ value, searchQuery, onClick }: CardProps) {
    return (
        <CardWrapper onClick={onClick}>
            <HighlightedText element="h2" text={value.keyword} match={searchQuery}/>
            <Divider />
            <HighlightedText style={{fontStyle: 'italic'}} element="h4" text={value.definition} match={searchQuery}/>
            <HighlightedText style={{display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', wordWrap: 'break-word'}} element="p" text={value.synonyms.join(' • ')} match={searchQuery}/>
        </CardWrapper>
    )
}