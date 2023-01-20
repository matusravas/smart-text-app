import { Dictionary } from "../../../model/dictionary/types"
import { CardWrapper } from "./styles/card.styles"

type CardProps = {
    value: Dictionary
    onClick?: () => void
}

export function Card({ value, onClick }: CardProps) {

    return (
        <CardWrapper onClick={onClick}>
            <h2>{value.keyword}</h2>
            <h5>{value.definition}</h5>
            <p>{['aaajsajb', 'nsdnsjd', 'jdnsjndjs', 'jdnjsdnsnd', 'nsjdnsdnj'].join(' • ')}</p>
        </CardWrapper>
    )
}