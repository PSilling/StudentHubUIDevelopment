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
      universityDialogTitle: "Add a new university",
      universityDialogButtonLabel: "Add",

      facultyDialogActive: false,
      facultyDialogTitle: "Add a new faculty",
      facultyDialogButtonLabel: "Add",

      inputName: "",
      inputCity: "",
      inputCountry: "",
      inputUrl: "",
      inputLogoUrl: "",

      nameErrorLabel: "",
      cityErrorLabel: "",
      countryErrorLabel: ""
    };
  }

  /**
   * Handles changes of Dialog Inputs.
   * @param id selectedUniversity value to be set onClick
   */
  handleInputChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  /**
   * Searches a given array for the first available ID value.
   * @param  array  the array to be searched
   * @return        first free id value
   */
  findFreeID = (array) => {
    var id;

    for (var i = 0; i < array.length; i++) {
      if(typeof array[i].id === "undefined") {
        id = i;
        break;
      }
      else id = array.length;
    }
    return id;
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
  editUniversity = () => {
    if(!this.checkUniversity()) return;
    universities[this.state.editId] = {city: this.state.inputCity, country: this.state.inputCountry, id: this.state.editId, logoUrl: this.state.inputLogoUrl, name: this.state.inputName, url: this.state.inputUrl };
    this.setState({
      universityData: universities,
      universityDialogActive: false,
      editId: -1,
      nameErrorLabel: "",
      cityErrorLabel: "",
      countryErrorLabel: "",
      inputName: "",
      inputCity: "",
      inputCountry: "",
      inputUrl: "",
      inputLogoUrl: "",
      snackbarLabel: "The university has been succesfully changed!",
      snackbarActive: true
    });
  }

  /**
   * Edits the selected faculty.
   */
  editFaculty = () => {
    if(!this.checkFaculty()) return;
    faculties[this.state.editId] = { id: this.state.editId, name: this.state.inputName, university: this.state.universityData[this.state.selectedUniversity].name };
    this.setState({
      facultyData: faculties,
      facultyDialogActive: false,
      editId: -1,
      nameErrorLabel: "",
      inputName: "",
      snackbarLabel: "The faculty has been succesfully changed!",
      snackbarActive: true
    });
  }

  /**
   * Adds a new university to the table.
   */
  addUniversity = () => {
    if(!this.checkUniversity()) return;
    var id = this.findFreeID(universities);

    if(id === universities.lenght) universities.push({city: this.state.inputCity, country: this.state.inputCountry, id: universities.length, logoUrl: this.state.inputLogoUrl, name: this.state.inputName, url: this.state.inputUrl });
    else universities[id] = {city: this.state.inputCity, country: this.state.inputCountry, id: id, logoUrl: this.state.inputLogoUrl, name: this.state.inputName, url: this.state.inputUrl };

    this.setState({
      universityData: universities,
      universityDialogActive: false,
      editId: -1,
      nameErrorLabel: "",
      cityErrorLabel: "",
      countryErrorLabel: "",
      inputName: "",
      inputCity: "",
      inputCountry: "",
      inputUrl: "",
      inputLogoUrl: "",
      snackbarLabel: "The university has been succesfully created!",
      snackbarActive: true
    });
  }

  /**
   * Adds a new faculty to the table.
   */
  addFaculty = () => {
    if(!this.checkFaculty()) return;
    var id = this.findFreeID(faculties);

    if(id === faculties.lenght) faculties.push({ id: id, name: this.state.inputName, university: this.state.universityData[this.state.selectedUniversity].name });
    else faculties[id] = { id: id, name: this.state.inputName, university: this.state.universityData[this.state.selectedUniversity].name };
    this.setState({
      facultyData: faculties,
      facultyDialogActive: false,
      editId: -1,
      nameErrorLabel: "",
      inputName: "",
      snackbarLabel: "The faculty has been succesfully created!",
      snackbarActive: true
    });
  }

  /**
   * Checks whether university Dialog input values are correct.
   * @return true if correct, false otherwise
   */
  checkUniversity = () => {
    var newNameErrorLabel = "";
    var newCityErrorLabel = "";
    var newCountryErrorLabel = "";

    if(this.state.inputName === "" || typeof this.state.inputName === "undefined") newNameErrorLabel = "University name is required!";
    if(this.state.inputCity === "" || typeof this.state.inputCity === "undefined") newCityErrorLabel = "City is required!";
    if(this.state.inputCountry === "" || typeof this.state.inputCountry === "undefined") newCountryErrorLabel = "Country is required!";

    if(newNameErrorLabel !== "" || newCityErrorLabel !== "" || newCountryErrorLabel !== "") {
      this.setState({
        nameErrorLabel: newNameErrorLabel,
        cityErrorLabel: newCityErrorLabel,
        countryErrorLabel: newCountryErrorLabel,
      });
      return false;
    }
    else return true;
  }

  /**
   * Checks whether faculty Dialog input values are correct.
   * @return true if correct, false otherwise
   */
  checkFaculty = () => {
    if(this.state.inputName === "" || typeof this.state.inputName === "undefined") {
      var newNameErrorLabel = "Faculty name is required!";

      this.setState({
        nameErrorLabel: newNameErrorLabel
      });
      return false;
    }
    else return true;
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
    var newInputName = this.state.inputName;
    var newInputCity = this.state.inputCity;
    var newInputCountry = this.state.inputCountry;
    var newInputUrl = this.state.inputUrl;
    var newInputLogoUrl = this.state.inputLogoUrl;
    var newUniversityDialogTitle = this.state.universityDialogTitle;
    var newUniversityDialogButtonLabel = this.state.universityDialogButtonLabel;

    if(id === -1 && newUniversityDialogActive) {
      newUniversityDialogTitle = "Add a new university";
      newUniversityDialogButtonLabel = "Add";
      newInputName = "";
      newInputCity = "";
      newInputCountry = "";
      newInputUrl = "";
      newInputLogoUrl = "";
    }
    else if(newUniversityDialogActive) {
      newUniversityDialogTitle = "Edit university";
      newUniversityDialogButtonLabel = "Save";
      newInputName = this.state.universityData[id].name;
      newInputCity = this.state.universityData[id].city;
      newInputCountry = this.state.universityData[id].country;
      newInputUrl = this.state.universityData[id].url;
      newInputLogoUrl = this.state.universityData[id].logoUrl;
    }

    this.setState({
      universityDialogActive: newUniversityDialogActive,
      universityDialogTitle: newUniversityDialogTitle,
      universityDialogButtonLabel: newUniversityDialogButtonLabel,
      inputName: newInputName,
      inputCity: newInputCity,
      inputCountry: newInputCountry,
      inputUrl: newInputUrl,
      inputLogoUrl: newInputLogoUrl,
      nameErrorLabel: "",
      cityErrorLabel: "",
      countryErrorLabel: "",
      editId: id
    })
  }

  /**
   * Toggles the visiblity of the faculty Dialog.
   * @param id  the id of the faculty to edit
   */
  toggleFacultyDialog = (id) => {
    var newFacultyDialogActive = !this.state.facultyDialogActive;
    var newInputName = this.state.inputName;
    var newFacultyDialogTitle = this.state.facultyDialogTitle;
    var newFacultyDialogButtonLabel = this.state.facultyDialogButtonLabel;

    if(id === -1 && newFacultyDialogActive) {
      newFacultyDialogTitle = "Add a new faculty";
      newFacultyDialogButtonLabel = "Add";
      newInputName = "";
    }
    else if(newFacultyDialogActive) {
      newFacultyDialogTitle = "Edit faculty";
      newFacultyDialogButtonLabel = "Save";
      newInputName = this.state.facultyData[id].name;
    }

    this.setState({
      facultyDialogActive: newFacultyDialogActive,
      facultyDialogTitle: newFacultyDialogTitle,
      facultyDialogButtonLabel: newFacultyDialogButtonLabel,
      inputName: newInputName,
      nameErrorLabel: "",
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
   * Generates new university Dialog actions variable.
   * @return desired actions variable
   */
  generateUniversityActions = () => {
    var actions = [
      { label: this.state.universityDialogButtonLabel, onClick: (this.state.editId === -1) ? () => this.addUniversity() : () => this.editUniversity()},
      { label: "Cancel", onClick: () => this.toggleUniversityDialog(this.state.editId) }
    ];
    return actions;
  }

  /**
   * Generates new faculty Dialog actions variable.
   * @return desired actions variable
   */
  generateFacultyActions = () => {
    var actions = [
      { label: this.state.facultyDialogButtonLabel, onClick: (this.state.editId === -1) ? () => this.addFaculty() : () => this.editFaculty()},
      { label: "Cancel", onClick: () => this.toggleFacultyDialog(this.state.editId) }
    ];
    return actions;
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
            <UsersView />
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
        <UniversityDialog
            actions={this.generateUniversityActions()}
            active={this.state.universityDialogActive}
            name={this.state.inputName}
            city={this.state.inputCity}
            country={this.state.inputCountry}
            url={this.state.inputUrl}
            logoUrl={this.state.inputLogoUrl}
            titleLabel={this.state.universityDialogTitle}
            errorName={this.state.nameErrorLabel}
            errorCity={this.state.cityErrorLabel}
            errorCountry={this.state.countryErrorLabel}
            toggleHandler={() => this.toggleUniversityDialog(this.state.editId)}
            handleInputChange={(name, value) => this.handleInputChange(name, value)}
          />
          <FacultyDialog
            actions={this.generateFacultyActions()}
            active={this.state.facultyDialogActive}
            name={this.state.inputName}
            titleLabel={this.state.facultyDialogTitle}
            errorLabel={this.state.nameErrorLabel}
            toggleHandler={() => this.toggleFacultyDialog(this.state.editId)}
            handleInputChange={(name, value) => this.handleInputChange(name, value)}
          />
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
