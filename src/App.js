import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Layout from 'react-toolbox/lib/layout/Layout.js';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer.js';
import Panel from 'react-toolbox/lib/layout/Panel.js';
import Input from 'react-toolbox/lib/input/Input.js';

import AddButton from './AddButton.js';
import ContentTable from './ContentTable.js';
import FacultyDialog from './FacultyDialog.js';
import SiteAppBar from './SiteAppBar.js';
import SiteSnackbar from './SiteSnackbar.js';
import UniversityDialog from './UniversityDialog.js';
import UsersView from './UsersView.js';
import Util from './Util.js';

/**
 * Holds university state codes
 * @type {Enum}
 */
const states = {
  CZ: "CZ",
  SK: "SK"
}

/**
 * List of faculties
 * @type {Array}
 */
var faculties = [
   { id: 'ID', name: 'Faculty #1', university: "University #1" },
   { id: 'ID', name: 'Faculty #2', university: "University #1" },
   { id: 'ID', name: 'Faculty #3', university: "University #2" },
   { id: 'ID', name: 'Faculty #4', university: "University #1" },
   { id: 'ID', name: 'Faculty #5', university: "University #3" },
   { id: 'ID', name: 'Faculty #6', university: "University #3" },
   { id: 'ID', name: 'Faculty #7', university: "University #1" },
   { id: 'ID', name: 'Faculty #8', university: "University #2" },
   { id: 'ID', name: 'Faculty #9', university: "University #1" },
   { id: 'ID', name: 'Faculty #10', university: "University #3" }
 ];

/**
 * List of universities
 * @type {Array}
 */
 var universities = [
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #1", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #2", url: "URL" },
   { city: 'City', country: states.SK, id: 'ID', logoUrl: "LogoURL", name: "University #3", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #4", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #5", url: "URL" },
   { city: 'City', country: states.SK, id: 'ID', logoUrl: "LogoURL", name: "University #6", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #7", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #8", url: "URL" },
   { city: 'City', country: states.SK, id: 'ID', logoUrl: "LogoURL", name: "University #9", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #10", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #11", url: "URL" },
   { city: 'City', country: states.SK, id: 'ID', logoUrl: "LogoURL", name: "University #12", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #13", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #14", url: "URL" },
   { city: 'City', country: states.SK, id: 'ID', logoUrl: "LogoURL", name: "University #15", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #16", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #17", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #18", url: "URL" },
   { city: 'City', country: states.CZ, id: 'ID', logoUrl: "LogoURL", name: "University #19", url: "URL" },
   { city: 'City', country: states.SK, id: 'ID', logoUrl: "LogoURL", name: "University #20", url: "URL" }
  ];

/**
 * Renders the search Input field.
 */
class SearchField extends Component {
  render() {
    return;
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUniversity: -1,
      header: "Universities",
      universityData: universities,
      facultyData: faculties,
      editId: -1,

      snackbarActive: false,
      snackbarLabel: "",

      universityDialogActive: false,
      facultyDialogActive: false
    };
  }

  /**
   * Removes the desired item with a given id.
   * @param id  id to be removed
   */
  delete = (id) => {
    if(this.state.selectedUniversity === -1) {
      universities[id] = { };
      this.setSnackbarLabel("The university has been succesfully deleted from the database!");
    }
    else {
      faculties[id] = { };
      this.setSnackbarLabel("The faculty has been succesfully deleted from the database!");
    }

    this.setState({
      universityData: universities,
      facultyData: faculties,
      snackbarActive: true
    });
  }

  /**
   * Edits a desired university.
   * @param id ID of the university to edit
   */
  editUniversity = (university) => {
    universities[this.state.editId] = university;
    this.setState({
      universityData: universities,
      universityDialogActive: false,
      editId: -1,
      snackbarLabel: "The university has been succesfully changed!",
      snackbarActive: true
    });
  }

  /**
   * Edits the selected faculty.
   * @param faculty    changed faculty value
   */
  editFaculty = (faculty) => {
    faculties[this.state.editId] = faculty;
    this.setState({
      facultyData: faculties,
      facultyDialogActive: false,
      editId: -1,
      snackbarLabel: "The faculty has been succesfully changed!",
      snackbarActive: true
    });
  }

  /**
   * Adds a new university to the table.
   */
  addUniversity = (university) => {
    var id = Util.findFreeID(universities);

    university.id = id;

    if(id === universities.lenght) universities.push(university);
    else universities[id] = university;

    this.setState({
      universityData: universities,
      universityDialogActive: false,
      editId: -1,
      snackbarLabel: "The university has been succesfully created!",
      snackbarActive: true
    });
  }

  /**
   * Adds a new faculty to the table.
   * @param faculty    the new faculty
   */
  addFaculty = (faculty) => {
    var id = Util.findFreeID(faculties);

    faculty.id = id;
    faculty.university = this.state.universityData[this.state.selectedUniversity].name;

    if(id === faculties.lenght) faculties.push(faculty);
    else faculties[id] = faculty;
    this.setState({
      facultyData: faculties,
      facultyDialogActive: false,
      editId: -1,
      snackbarLabel: "The faculty has been succesfully created!",
      snackbarActive: true
    });
  }

  /**
   * Toggles the visiblity of the Snackbar.
   */
  toggleSnackbar = () => {
    var newValue = !this.state.snackbarActive;

    this.setState({
      snackbarActive: newValue
    })
  }

  /**
   * Toggles the visiblity of the university Dialog.
   * @param id  the id of the university to edit
   */
  toggleUniversityDialog = (id) => {
    var newUniversityDialogActive = !this.state.universityDialogActive;

    this.setState({
      universityDialogActive: newUniversityDialogActive,
      editId: id
    })
  }

  /**
   * Toggles the visiblity of the faculty Dialog.
   * @param id  the id of the faculty to edit
   */
  toggleFacultyDialog = (id) => {
    var newFacultyDialogActive = !this.state.facultyDialogActive;

    this.setState({
      facultyDialogActive: newFacultyDialogActive,
      editId: id
    })
  }

  /**
   * Sets new state in regards to new university selection.
   * @param id     new selectedUniversity value
   * @param head   new header value
   */
  selectUniversity = (id, head) => {
    this.setState({
      selectedUniversity: id,
      header: head
    });
  }

  /**
   * Sets a new Snackbar label
   * @param label   new label value
   */
  setSnackbarLabel = (label) => {
    this.setState({
      snackbarLabel: label
    });
  }

  /**
   * Gets the university that is selected.
   * @return the desired university, "" if none is selected
   */
  getAssociatedUniversity = () => {
    if(this.state.editId === -1) return "";
    else return this.state.universityData[this.state.editId];
  }

  /**
   * Gets the faculty that is being edited.
   * @return the desired faculty, "" if none is selected
   */
  getAssociatedFaculty = () => {
    if(this.state.editId === -1) return "";
    else return this.state.facultyData[this.state.editId];
  }

  /**
   * Creates the dialog appropriate for the university selection.
   */
  generateDialogs = () => {
    if(this.state.selectedUniversity === -1)
      return(
        <UniversityDialog
            active={this.state.universityDialogActive}
            editId={this.state.editId}
            university={this.getAssociatedUniversity()}
            addHandler={(university) => this.addUniversity(university)}
            editHandler={(university) => this.editUniversity(university)}
            toggleHandler={() => this.toggleUniversityDialog(this.state.editId)}
          />
      );
    else
      return(
        <FacultyDialog
          active={this.state.facultyDialogActive}
          editId={this.state.editId}
          faculty={this.getAssociatedFaculty()}
          addHandler={(faculty) => this.addFaculty(faculty)}
          editHandler={(faculty) => this.editFaculty(faculty)}
          toggleHandler={() => this.toggleFacultyDialog(this.state.editId)}
        />
      );
  }

  render() {
    return (
      <Layout className="App">
        <NavDrawer active={this.state.drawerActive} onOverlayClick={() => {this.toggleNavDrawer()} }>
          <p>//TODO: Navigation menu</p>
        </NavDrawer>
        <Panel className="App-panel">
          <div className="App-panel-header">
            <SiteAppBar />
          </div>
          <div className="App-panel-body">
            <div className="App-panel-body-main">
              <div className="Header">
                <span className="Header-text">
                  {this.state.header}
                </span>
                <span className="Add-button">
                  <AddButton
                    selectedUniversity={this.state.selectedUniversity}
                    toggleUniversityHandler={() => this.toggleUniversityDialog(-1)}
                    toggleFacultyHandler={() => this.toggleFacultyDialog(-1)}
                  />
                </span>
              </div>
              <hr />
              <Input type="search" icon="search" label="TODO: Search" disabled />
              <ContentTable
                selectedUniversity={this.state.selectedUniversity}
                universityData={this.state.universityData}
                facultyData={this.state.facultyData}
                editToggleUniversityHandler={(id) => this.toggleUniversityDialog(id)}
                editToggleFacultyHandler={(id) => this.toggleFacultyDialog(id)}
                deleteHandler={(id) => this.delete(id)}
                stateSetter={(id, head) => this.selectUniversity(id, head)}
              />
            </div>
          </div>
          <SiteSnackbar
            active={this.state.snackbarActive}
            toggleHandler={this.toggleSnackbar}
            label={this.state.snackbarLabel}
          />
          {this.generateDialogs()}
        </Panel>
      </Layout>
    );
  }
}

export default App;

/**
 * //TODO: AJAX handlers:
 /**
  * Connects to the server to update current data using GET. Updates main table accordingly.
  * @param url route to request
  * @param id  id of desired item
  *
 handleGet = (url, id) => {
   fetch('/'+url+'/'+id, {
       method: 'get'
     }).then(function(response) {
         if(response.ok) {
           return response.json();
       } else throw new Error('There was a problem with network connection.');
     }).then(function(json) {
       //TODO: JSON data processing
     }.bind(this));
 }

 /**
  * Sends desired data to the server using POST. Updates state accordingly.
  * @param postData type JSON  data to send
  * @param url                 route to request
  *
 handlePost = (postData, url) => {
   fetch('/'+url, {
     method: 'post',
     headers: { "Content-Type" : "application/json" },
     body: postData
   }).then(function(response) {
       if(response.ok) {
         return response.json();
     } else throw new Error('There was a problem with network connection.');
   }).then(function(json) {
       if(json !== null && json !== "") this.handleGet();
       else throw new Error("Received data couldn't be read!");
   }.bind(this));
 }

 /**
  * Updates desired data on the server using PUT. Updates state accordingly.
  * @param putData type JSON  data to be updated
  * @param url                route to request
  *
 handlePut = (putData, url) => {
   fetch('/'+url+'/'+putData.id, {
     method: 'put',
     headers: { "Content-Type" : "application/json" },
     body: putData
   }).then(function(response) {
       if(response.ok) {
         return response.json();
     } else throw new Error('There was a problem with network connection.');
   }).then(function(json) {
       if(json !== null && json !== "") this.handleGet();
       else throw new Error("Received data couldn't be read!");
   }.bind(this));
 }

 /**
  * Deletes desired data from the server using DELETE. Updates state accordingly.
  * @param id        id of the selected thesis.
  * @param url       route to request
  *
 handleDelete = (url, id) => {
   fetch('/'+url+'/'+id, {
       method: 'delete'
     }).then(function(response) {
         if(response.ok) {
           this.handleGet();
         }
       else throw new Error('There was a problem with network connection.')
       }.bind(this));
 }
*/
