import React, { useState } from 'react'
import { postAdded, postPost } from './postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectedAllUsers } from '../users/usersSlice';


const initialForm = { title: '', description: '', userId: '' };
export const PostForm = () => {
    const [formValues, setFormValues] = useState(initialForm);
    const allUsers = useSelector(selectedAllUsers);
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValues.title && !formValues.description)
            return;
        dispatch(postPost(formValues));
        //setFormValues(initialForm)
    }

    const handleDataChange = (e) => {

        setFormValues({ ...formValues, [e.name]: e.value })

    }
    return (
        <section style={{ border: 'solid', borderRadius: '1em', maxWidth: "100%", paddingTop: '1%', paddingBottom: '1%' }}>

            <form action="" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '.5em' }}>

                <label htmlFor="title">Title</label>
                <input type="text"
                    style={{ width: '20%' }} name="title" value={formValues.title} onChange={e => handleDataChange({ name: e.target.name, value: e.target.value })} />
                <label htmlFor="users">User</label>
                <select id="users" name="userId" value={formValues.userId} style={{ width: "20%" }}
                    onChange={(e) => {
                        handleDataChange({ name: e.target.name, value: e.target.value })
                    }}>
                    <option value=""> -- select an option -- </option>
                    {allUsers.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>)
                    )}
                </select>
                <label htmlFor="description">Description</label>
                <input type="text" style={{ width: '20%' }} name="description" value={formValues.description} onChange={e => handleDataChange({ name: e.target.name, value: e.target.value })} />

                <button type="submit" onClick={e => { handleSubmit(e) }} >Add post</button>
            </form>
        </section >
    )
}
