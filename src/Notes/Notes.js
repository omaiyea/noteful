import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Notes.css';

import config from '../config.js';

export default class Notes extends React.Component{
    constructor(props){
        super(props);
        this.deleteNote = this.deleteNote.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    deleteNote(e){
        const noteId = e.target.id;

        fetch(config.NOTE_ENDPOINT + `/${noteId}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (!res.ok){
                console.log(res.ok);
            }

            let remainingNotes = this.props.notes;
            remainingNotes = this.props.notes.filter(note => note.id !== noteId)
            this.props.deleteHandler(remainingNotes);
    })
        .catch(error => console.error(error))
    }

    handleAddClick(){
        this.props.addNoteHandler();
    }

    render(){
        const notes = (this.props.folderId
            ? this.props.notes.filter(note => note.folderId === this.props.folderId)
            : this.props.notes)
                .map(note => (<div className="note__overview" key={note.id}>
                    <NavLink to={`/note/${note.id}`} aria-label="note">
                        <h3>{note.name}</h3>
                    </NavLink>
                    <p>Date Modified: {note.modified}</p>
                    <button id={note.id} onClick={this.deleteNote}><FontAwesomeIcon icon={faTrashAlt} />Delete Note</button>
                </div>));

        return(
            <div className="note__container">
                <div className="note__list">
                    {notes}
                </div>
                <button className="add__note" 
                  onClick={this.handleAddClick} >
                    <FontAwesomeIcon icon={faPlusSquare} />
                    Add Note
                </button>
            </div>
        );
    }
}


Notes.propTypes = {
    notes: PropTypes.array,
    folderId: PropTypes.string
};