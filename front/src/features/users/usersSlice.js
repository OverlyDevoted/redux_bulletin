import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', name: 'Michael Jordan' },
    { id: '2', name: 'Michael Jackson' },
    { id: '3', name: 'Michael J Scott' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectedAllUsers = (state) => state.users
export default usersSlice.reducer