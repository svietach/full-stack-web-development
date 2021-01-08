import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const [inputData, setInputData] = useState('');
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const addAnecdote = () => {
        dispatch(
            createAnecdote(inputData)
        )
        dispatch(showNotification(`you successfully added ${inputData}`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }


    const onCreateNewChangeHandler = (event) => {
        setInputData(event.target.value);
    }


    return (
        <>
            <h2>create new</h2>
            <form>
                <div><input onChange={onCreateNewChangeHandler} /></div>
                <button type="button" onClick={addAnecdote} >add</button>
            </form>
        </>
    )
};

export default AnecdoteForm;