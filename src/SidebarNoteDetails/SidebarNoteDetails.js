import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './SidebarNoteDetails.css';

export default class SidebarNoteDetails extends React.Component{
    render(){
        const folder = this.props.folders.find(folder => folder.id === this.props.folderId);

        return(
          folder 
            ? (<div className="sidebar">
                    <p><FontAwesomeIcon icon={faFolderOpen} />{folder.name}</p>
                    <NavLink id="back__link" to="/"><FontAwesomeIcon icon={faArrowAltCircleLeft} />Go Back</NavLink>
                </div>)
            : (<div className="sidebar">
                <p className="sidebar__error"> Oops - ran into an error displaying the folders! Click the header to go back home.</p>
              </div>)
        )
    }
}

SidebarNoteDetails.propTypes = {
    folderId: PropTypes.number.isRequired,
    folders: PropTypes.array.isRequired
};