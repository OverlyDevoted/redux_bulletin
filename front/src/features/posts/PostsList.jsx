import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectedPosts, getPostsStatus, getPostsError, fetchPosts } from './postsSlice'
import { Post } from './Post'
import '../../styles/CommonComponents.css'
import { selectedAllUsers } from '../users/usersSlice'


export const PostsList = () => {
    const dispatch = useDispatch();


    const unorderedPosts = useSelector(selectedPosts);
    const postsStatus = useSelector(getPostsStatus);
    const postsError = useSelector(getPostsError);
    const users = useSelector(selectedAllUsers);

    useEffect(() => {
        if (postsStatus === 'idle')
            dispatch(fetchPosts())
    }, [postsStatus, dispatch])

    let content;
    if (postsStatus === 'loading' && !unorderedPosts)
        content = <p>"Loading..."</p>
    else if (postsStatus === 'succeeded') {
        const posts = unorderedPosts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = posts.map(post => (<Post
            key={post.id}
            title={post.title}
            description={post.description}
            user={post.userId ? users.find(user => user.id === post.userId).name : ""}
            reactions={post.reactions}
            date={post.date}
            id={post.id}
        />))
    }
    else if (postsStatus === 'failed') {
        content = <p>{postsError}</p>
    }

    return (
        <section>
            <h1>Posts List</h1>
            <div className='card_container'>
                {content}
            </div>
        </section>
    )
}
