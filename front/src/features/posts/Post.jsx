import React from 'react'
import '../../styles/CommonComponents.css'
import { addReaction } from './postsSlice'
import { useDispatch } from 'react-redux'
import TimeAgo from './TimeAgo'

export const Post = ({ title, description, user, reactions, id, date }) => {
    const dispatch = useDispatch()
    const handleReaction = (e) => {

        dispatch(addReaction({ postId: id, reactionId: e.target.value }))
    }
    return (
        <article className='card'>
            <h2>{title}</h2>
            <p>{description.substring(0, 100)}{description.length >= 100 ? "..." : ""}</p>

            <p>{user ? `Created by ${user}` : `Created by unknow user`}</p>
            <TimeAgo date={date} />

            <div>
                {reactions.map(reaction => (<button key={reaction.id} value={reaction.id} onClick={(e) => { handleReaction(e) }}>{reaction.count + " " + reaction.id}</button>))}
            </div>
        </article>
    )
}
