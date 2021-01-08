import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(addVote(id));

        const anecdote = anecdotes.find(n => n.id === id)
        dispatch(showNotification(`you voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(hideNotification());
        }, 5000);
    }

    return (
        <>
            {anecdotes.filter(anecdote =>
                anecdote.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => (a.votes < b.votes) ? 1 : -1).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
        </>
    )
}

export default AnecdoteList