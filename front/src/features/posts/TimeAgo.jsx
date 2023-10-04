import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export default function TimeAgo({ date }) {
    return (
        <span>
            &nbsp; <i style={{ fontStyle: 'italic' }}>{"Posted " + formatDistanceToNow(parseISO(date)) + " ago"}</i>
        </span>
    )
}
