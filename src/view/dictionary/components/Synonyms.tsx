import { ChangeEvent, useEffect, useState } from "react";
import { SynonymsWrapper, SynonymInput } from "./styles/synonyms.styles";


type SynonymsProps = {
    synonyms: string[],
    // editable: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void
}

export function Synonyms(props: SynonymsProps) {
    const synonyms = [...props.synonyms.filter(synonym => synonym !== ''), '']
    // const [synonyms, setSynonyms] = useState([...props.synonyms, '']);

    // useEffect(() => {
    //     props.editable 
    //         ? setSynonyms([...props.synonyms, ''])
    //         : setSynonyms(props.synonyms)
    // }, [props.editable])

    // const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    //     const lastSynonym = synonyms.slice(-1)[0]
    //     if (e.key === 'Enter' && lastSynonym && lastSynonym  !== '') {
    //         setSynonyms([...synonyms, "" ]);
    //     }
    // };

    return (
        <SynonymsWrapper>
            {synonyms.map((synonym, index) => (
                <SynonymInput
                    id="synonyms"
                    role="textbox"
                    className="word"
                    placeholder="Type new synonym..."
                    key={index}
                    value={synonym}
                    onChange={e => props.onChange(e, index)}
                // onKeyPress={e => handleKeyPress(e, index)}
                />

            ))}
        </SynonymsWrapper>
    );
};

export default Synonyms;
