import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
const POSTS_URL = 'http://localhost:3001/api/posts/';
const POSTS_POST_URL = 'http://localhost:3001/api/posts/add';

const initialState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    console.log("Posts data: " + JSON.stringify(response.data, null, 2))
    return response.data;
})

export const postPost = createAsyncThunk('posts/postPost', async (data) => {
    console.log(data);
    const response = await axios.post(POSTS_POST_URL, data).then(res => { return res.data })
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(postData) {
                return {
                    payload: {
                        id: nanoid(),
                        title: postData.title,
                        description: postData.description,
                        userId: postData.userId,
                        date: new Date().toISOString(),
                        reactions: startingReactions,
                    }
                }
            }
        },
        addReaction: {
            reducer(state, action) {

                const post = state.posts.findIndex(post => post.id == action.payload.postId)
                if (post === -1)
                    return;
                const reaction = state[post].reactions.findIndex(reaction => reaction.id === action.payload.reactionId)
                if (reaction === -1)
                    return;
                state[post].reactions[reaction].count++;

                /* 
                inVideoInitialState = reactions: {
                    wow: 0,
                    thumbsUp 0,
                    ...
                }

                const { postId, reaction } = action.payload
                const existingPost = state.posts.find(post => post.id === postId)
                if(existingPost){
                    existingPost.reactions[reaction]++;
                }
                */
            },
        }
    },
    extraReducers: {

        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            return {
                ...state,
                status: 'succeeded',
                posts: action.payload
            }
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
        },
        [postPost.fulfilled]: (state, action) => {
            console.log
            state.status = 'idle'
        }
    }
})

export const selectedPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export const { postAdded } = postsSlice.actions
export const { addReaction } = postsSlice.actions
export default postsSlice.reducer