import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Notes from './Notes/Notes';
import NoteDetails from './NoteDetails/NoteDetails';
import SidebarNoteDetails from './SidebarNoteDetails/SidebarNoteDetails';
import AddFolder from './Add/AddFolder/AddFolder';
import AddNote from './Add/AddNote/AddNote';
import NoteDisplayError from './NoteDisplayError/NoteDisplayError';
import FolderDisplayError from './FolderDisplayError/FolderDisplayError';

import './App.css';
import STORE from './config';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedFolder: '',
      selectedNote: '',
      allFolders: STORE.folders,
      allNotes: STORE.notes,
      error: '',
      showAddFolder: false,
      showAddNote: false,
      curFolder: 3, //hardcoded, future: make dynamic
      curNote: 14,
    }
  }

  setSelected(selected){
    this.setState({
      selectedFolder: selected
    });
  }

  setNotes(notes){
    this.setState({
      allNotes: notes
    })
  }

  setFolders(folders){
    this.setState({
      allFolders: folders
    })
  }

  setError(error){
    this.setState({
      error: error
    })
  }

  setFolderAdd(){
    const toggle = this.state.showAddFolder ? false : true;
    this.setState({
      showAddFolder: toggle
    })
  }

  setNoteAdd(){
    const toggle = this.state.showAddNote ? false : true;
    this.setState({
      showAddNote: toggle
    })
  }

  setCurFolder(count){
    this.setState({
      curFolder: count
    })
  }

  setCurNote(count){
    this.setState({
      curNote: count
    })
  }

  render(){
    return (
    <div className="App">
      <Header />
      <main>
        <Route exact path ="/" 
               render={ () => 
               <Sidebar 
                  folders={this.state.allFolders} 
                  folderClickHandler={selected => this.setSelected(selected)}
                  addClickHandler={() => this.setFolderAdd()}
                  addFolderId={(num) => this.setCurFolder(num)}
                  folderId={this.state.curFolder}
                />} 
        />
        <Route path ="/folder" 
               render={ () =>
               <Sidebar 
                  folders={this.state.allFolders} 
                  folderClickHandler={selected => this.setSelected(selected)}
                  addClickHandler={() => this.setFolderAdd()}
                />} 
        />
        <Route path ="/note/:noteId" 
               render={ (history) => 
               <FolderDisplayError>
                  <SidebarNoteDetails 
                      folders={this.state.allFolders}
                      folderId={this.state.selectedFolder}
                      history={history}
                    />
                </FolderDisplayError>
                } 
        />
        <Route exact path="/" 
               render={ (routerProps) =>
               <Notes 
                  notes={this.state.allNotes}
                  folderId={routerProps.match.params.folderId}
                  deleteHandler={notes => this.setNotes(notes)}
                  addNoteHandler={() => this.setNoteAdd()}
                />}
        />
        <Route path="/folder/:folderId" 
               render={ (routerProps) =>
               <Notes 
                  notes={this.state.allNotes}
                  folderId={routerProps.match.params.folderId}
                  deleteHandler={notes => this.setNotes(notes)}
                  addNoteHandler={() => this.setNoteAdd()}
                />}
        />
        <Route path="/note/:noteId" 
               render={(routerProps) => 
                <NoteDisplayError>
                  <NoteDetails 
                      notes={this.state.allNotes}
                      noteId={routerProps.match.params.noteId}
                    />
                </NoteDisplayError>
                } 
        />
        {this.state.showAddFolder
          ? <AddFolder 
             addClickHandler={() => this.setFolderAdd()}
             addFolderHandler={() => this.fetchData()}
            /> 
          : ''}

        {this.state.showAddNote
         ? <AddNote
            addClickHandler={() => this.setNoteAdd()}
            addNoteHandler={() => this.fetchData()}
            allFolders={this.state.allFolders}
            selectedFolder={this.state.selectedFolder}
           />
         : ''}

      </main>
    </div>
    );
  }
}

export default App;