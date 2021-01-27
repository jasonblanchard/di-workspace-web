import React from 'react'
import { Link } from 'react-router-dom'

interface SearchPreviewProps {
    query: string
    text: string
    id: string
}

function insert(str: string, index: number, value: string) {
    return str.substr(0, index) + value + str.substr(index);
}

export default function({ query, text, id }: SearchPreviewProps) {
    const startToken = "%start%";
    const endToken = "%end%";
    // TODO: Handle multiple matches
    const start = text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())
    const end = start + query.length + startToken.length
    let buffer = insert(text, start, startToken);
    buffer = insert(buffer, end, endToken)
    // TODO: Truncate around text
    buffer = buffer.replace(/\%start\%/g, "<span style=\"background: yellow\">")
    buffer = buffer.replace(/\%end\%/g, "</span>")
    // TODO: Figure out a safer way to add the tags... split and recombine?

    return (
        <Link to={`/workspace/${id}`}>
            <div dangerouslySetInnerHTML={{ __html: buffer}} />
            <hr />
        </Link>
    )
}