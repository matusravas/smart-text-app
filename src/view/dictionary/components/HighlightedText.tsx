import React from "react";

interface HighlightedTextProps {
    element?: 'p' | 'h1' | 'h2' | 'h3' | 'h4'
    // element?: keyof JSX.IntrinsicElements
    text?: string
    match?: string
}

export function HighlightedText({ element: Element = 'p', text = '', match: highlight = '' }: HighlightedTextProps) {
    if (highlight.trim() === '') {
        return <Element>{text}</Element>
    }
    let parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <Element>{
            parts.map((part, index) => (
                <React.Fragment key={index}>
                    {part.toLowerCase() === highlight.toLowerCase() ? (
                        <mark style={{ backgroundColor: "#ffcd4e" }}>{part}</mark>
                    ) : (
                        part
                    )}
                </React.Fragment>
            ))
        }
        </Element>
    );
}