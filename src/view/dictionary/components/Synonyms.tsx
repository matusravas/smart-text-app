import { ChangeEvent, useEffect, useState } from "react";
import { DialogText, SynonymsWrapper } from "./styles/dialog.styles";

type SynonymsProps = {
    synonyms: string[],
    editable: boolean
}

export function Synonyms(props: SynonymsProps) {
    const [synonyms, setSynonyms] = useState(props.synonyms);

    useEffect(() => {
        props.editable && setSynonyms([...props.synonyms, ''])
    }, [props.editable])

    // const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    //     const lastSynonym = synonyms.slice(-1)[0]
    //     if (e.key === 'Enter' && lastSynonym && lastSynonym  !== '') {
    //         setSynonyms([...synonyms, "" ]);
    //     }
    // };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const addedNew = index === synonyms.length - 1
        const values = [...synonyms]
        values[index] = e.target.value
        addedNew ? setSynonyms([...values, '']) : setSynonyms([...values])
    };

    return (
        <SynonymsWrapper>
            {synonyms.map((synonym, index) => (

                <DialogText
                    id="synonyms"
                    role="textbox"
                    className="word"
                    placeholder="Type new synonym..."
                    key={index}
                    value={synonym}
                    onChange={e => handleChange(e, index)}
                // onKeyPress={e => handleKeyPress(e, index)}
                />

            ))}
        </SynonymsWrapper>
    );
};

export default Synonyms;
