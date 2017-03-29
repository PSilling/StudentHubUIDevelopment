import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from 'react-toolbox/lib/app_bar/AppBar.js';
import Button from 'react-toolbox/lib/button/Button.js';
import Check from 'react-toolbox/lib/checkbox/Check.js';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox.js';
import Chip from 'react-toolbox/lib/chip/Chip.js';
import Drawer from 'react-toolbox/lib/drawer/Drawer.js';
import Dialog from 'react-toolbox/lib/dialog/Dialog.js';
import Input from 'react-toolbox/lib/input/Input.js';
import Layout from 'react-toolbox/lib/layout/Layout.js';
import Link from 'react-toolbox/lib/link/Link.js';
import List from 'react-toolbox/lib/list/List.js';
import ListItem from 'react-toolbox/lib/list/ListItem.js';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader.js';
import Menu from 'react-toolbox/lib/menu/Menu.js';
import Navigation from 'react-toolbox/lib/navigation/Navigation.js';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer.js';
import Panel from 'react-toolbox/lib/layout/Panel.js';
import Snackbar from 'react-toolbox/lib/snackbar/Snackbar.js';
import Table from 'react-toolbox/lib/table/Table.js';
import TableCell from 'react-toolbox/lib/table/TableCell.js';
import TableHead from 'react-toolbox/lib/table/TableHead.js';
import TableRow from 'react-toolbox/lib/table/TableRow.js';
import Tooltip from 'react-toolbox/lib/tooltip/Tooltip.js';

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
 * Value of snackbar's label
 * @type {String}
 */
var snackbarLabel = ""

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //TODO: More state variables needed.
      selectedUniversity: -1,
      universityData: universities,
      facultyData: faculties,
      drawerActive: false,
      snackbarActive: false,
      dialogActive: false,
      inputName: "",
      inputCity: "",
      inputCountry: "",
      inputUrl: "",
      inputLogoUrl: "",
      header: "Universities"
    };
  }

  dialogActions = [
    { label: "Add", onClick: () => this.addUniversity() },
    { label: "Cancel", onClick: () => this.toggleAddDialog() }
  ];

  /**
   * Connects to the server to update current data using GET. Updates main table accordingly.
   * @param url route to request
   * @param id  id of desired item
   */
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
   */
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
   */
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
   */
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

  /**
   * Handles clicks on sidebar menu Listcells.
   * @param id selectedUniversity value to be set onClick
   */
  handleCellClick = (id) => {
    //TODO: Clicks should change table data.
    var newHeader;
    if(id === -1) newHeader = "Universities";
    else newHeader = universities[id].name+" faculties";
    snackbarLabel = "Clicked on university with ID "+id;
    this.toggleSnackbar();

    this.setState({
      selectedUniversity: id,
      header: newHeader
    })
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
   * Generates header cells of the content table.
   * @param  universities whether the cells are for a university of not
   * @return              generated header cells
   */
  renderHeadCells = (universities) => {
    var cells = [];
    cells.push(<TableCell numeric>ID</TableCell>);
    if(universities) cells.push(<TableCell>Logo</TableCell>);
    cells.push(<TableCell>Name</TableCell>);
    if(universities) {
      cells.push(<TableCell>City</TableCell>);
      cells.push(<TableCell>Country</TableCell>);
      cells.push(<TableCell>Website</TableCell>);
    }
    else {
      cells.push(<TableCell>University</TableCell>);
    }
    cells.push(<TableCell>Actions</TableCell>);
    return cells;
  }

  /**
   * Generates the content table.
   * @return list element containing the sidebar menu
   */
  renderContentTable = () => {
    var headCells = [];
    var cells = [];
    var goBack = [];
    var header;

    if(this.state.selectedUniversity === -1) {
      header = "Universities";
      headCells = this.renderHeadCells(true);
      for(let i = 0; i < universities.length; i++) {
        cells.push(
          <TableRow>
            <TableCell numeric>{universities[i].id}</TableCell>
            <TableCell>{universities[i].logoUrl}</TableCell>
            <TableCell onClick={() => this.handleCellClick(i)}><span className="CellLink">{universities[i].name}</span></TableCell>
            <TableCell>{universities[i].city}</TableCell>
            <TableCell>{universities[i].country}</TableCell>
            <TableCell>{universities[i].url}</TableCell>
            <TableCell>{this.renderTableButtons(i)}</TableCell>
          </TableRow>);
      }
    }
    else {
      header = universities[this.state.selectedUniversity].name+" faculties";
      headCells = this.renderHeadCells(false);
      for(let i = 0; i < faculties.length; i++) {
        if(faculties[i].university === universities[this.state.selectedUniversity].name) {
          cells.push(
            <TableRow>
              <TableCell numeric>{faculties[i].id}</TableCell>
              <TableCell>{faculties[i].name}</TableCell>
              <TableCell>{universities[this.state.selectedUniversity].name}</TableCell>
              <TableCell>{this.renderTableButtons(i)}</TableCell>
            </TableRow>);
        }
      }
      goBack.push(
        <Table multiSelectable={false} selectable={false}>
          <TableRow>
            <TableCell numeric onClick={() => this.handleCellClick(-1)}><span className="CellLink">Go back to the university list</span></TableCell>
          </TableRow>
        </Table>);
    }
    return(
      <div className="Table-container">
        <Table multiSelectable={false} selectable={false}>
          <TableHead>
            {headCells}
          </TableHead>
          {cells}
        </Table>
        {goBack}
      </div>
    )
  }

  /**
   * Generates the adding button.
   * @return the desired button element
   */
  renderAddButton = () => {
    if(this.state.selectedUniversity === -1) {
      return(<Button onClick={() => this.toggleAddDialog()} icon="add" label="Add New University" raised primary floating />);
    }
    else return(<Button onClick={() => this.toggleAddDialog()} icon="add" label="Add New Faculty" raised primary floating />);
  }

  /**
   * Generates table edit/delete buttons.
   * @return the desired buttons
   */
  renderTableButtons = (id) => {
    if(this.state.selectedUniversity === -1) {
      return(
        <table>
          <td><Button onClick={() => this.toggleEditDialog(id)} icon="edit" label="Edit" /></td>
          <td><Button onClick={() => this.delete(id)} icon="delete" label="Delete" /></td>
        </table>
      );
    }
    else return(
      <table>
        <td><Button onClick={() => this.toggleEditDialog(id)} icon="edit" label="Edit" /></td>
        <td><Button onClick={() => this.delete(id)} icon="delete" label="Delete" /></td>
      </table>
      );
  }

  /**
   * Generates the input Dialog.
   * @return the desired Dialog
   */
  renderDialog = () => {
    var inDialog = [];
    if(this.state.selectedUniversity === -1) {
      this.dialogActions[0].label = "Add";
      this.dialogActions[0].onClick = () => this.addUniversity();
      inDialog.push(
        <table width="100%">
          <tr>
            <td colSpan="2"><Input type='text'  label="Name" hint='Name' value={this.state.inputName} onChange={(value) => this.handleInputChange("inputName", value)} required /></td></tr>
          <tr>
            <td><Input type='text' label="City" hint='City' value={this.state.inputCity} onChange={(value) => this.handleInputChange("inputCity", value)}  required maxLength={32} /></td>
            <td><Input type='text' label="Country" hint='Country (eg. CZ)' value={this.state.inputCountry} onChange={(value) => this.handleInputChange("inputCountry", value)}  required maxLength={8} /></td>
          </tr>
          <tr><td colSpan="2"><Input type='text' hint='Website' value={this.state.inputUrl} onChange={(value) => this.handleInputChange("inputUrl", value)} /></td></tr>
          <tr><td colSpan="2"><Input type='text' hint='Logo source' value={this.state.inputLogoUrl} onChange={(value) => this.handleInputChange("inputLogoUrl", value)} /></td></tr>
        </table>
      );
      return(
        <Dialog
          active={this.state.dialogActive}
          actions={this.dialogActions}
          onEscKeyDown={() => this.toggleAddDialog()}
          onOverlayClick={() => this.toggleAddDialog()}
          title="Add a new university"
          type="large"
        >
          {inDialog}
        </Dialog>
      );
    }
    else {
      this.dialogActions[0].label = "Save";
      this.dialogActions[0].onClick = () => this.addFaculty();
      inDialog.push(
        <table width="100%">
          <tr><td colSpan="2"><Input type='text' label="Name" hint='Name' required  value={this.state.inputName} onChange={(value) => this.handleInputChange("inputName", value)} /></td></tr>
        </table>
      );
      return(
        <Dialog
          active={this.state.dialogActive}
          actions={this.dialogActions}
          onEscKeyDown={() => this.toggleAddDialog()}
          onOverlayClick={() => this.toggleAddDialog()}
          title="Add a new faculty"
          type="large"
        >
          {inDialog}
        </Dialog>
      );
    }
  }

  delete = (id) => {
    if(this.state.selectedUniversity === -1) universities[id] = {};
    else faculties[id] = {};
    this.setState({
      universityData: universities,
      facultyData: faculties
    });
  }

  /**
   * Edites a desired university.
   * @param id ID of the university to edit
   */
  editUniversity = (id) => {
    universities[id] = {city: this.state.inputCity, country: this.state.inputCountry, id: universities.length, logoUrl: this.state.inputLogoUrl, name: this.state.inputName, url: this.state.inputUrl };
    this.setState({
      universityData: universities,
      dialogActive: false,
      inputName: "",
      inputCity: "",
      inputCountry: "",
      inputUrl: "",
      inputLogoUrl: ""
    });
  }

  /**
   * Edites a desired faculty.
   * @param id ID of the faculty to edit
   */
  editFaculty = (id) => {
    faculties[id] = { id: faculties.length, name: this.state.inputName, university: this.state.universityData[this.state.selectedUniversity].name };
    this.setState({
      facultyData: faculties,
      dialogActive: false,
      inputName: ""
    });
  }

  /**
   * Adds a new university to the table.
   */
  addUniversity = () => {
    universities.push({city: this.state.inputCity, country: this.state.inputCountry, id: universities.length, logoUrl: this.state.inputLogoUrl, name: this.state.inputName, url: this.state.inputUrl });
    this.setState({
      universityData: universities,
      dialogActive: false,
      inputName: "",
      inputCity: "",
      inputCountry: "",
      inputUrl: "",
      inputLogoUrl: ""
    });
  }

  /**
   * Adds a new faculty to the table.
   */
  addFaculty = () => {
    faculties.push({ id: faculties.length, name: this.state.inputName, university: this.state.universityData[this.state.selectedUniversity].name });
    this.setState({
      facultyData: faculties,
      dialogActive: false,
      inputName: ""
    });
  }

  /**
   * Toggles the visiblity of the NavDrawer.
   */
  toggleNavDrawer = () => {
    var newValue = !this.state.drawerActive;
    this.setState({
      drawerActive: newValue
    })
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
   * Toggles the visiblity of the adding Dialog.
   */
  toggleAddDialog = () => {
    var newValue = !this.state.dialogActive;
    this.setState({
      dialogActive: newValue
    })
  }

  /**
   * Toggles the visiblity of the adding Dialog.
   */
  toggleEditDialog = (id) => {
    var newValue = !this.state.dialogActive;
    var newInputName = "";
    var newInputCity = "";
    var newInputCountry = "";
    var newInputUrl = "";
    var newInputLogoUrl = "";
    if(this.state.selectedUniversity === -1) {
      var newInputName = universities[id].name;
      var newInputCity = universities[id].city;
      var newInputCountry = universities[id].country;
      var newInputUrl = universities[id].url;
      var newInputLogoUrl = universities[id].logoUrl;
    }
    this.setState({
      dialogActive: newValue,
      inputName: newInputName,
      inputCity: newInputCity,
      inputCountry: newInputCountry,
      inputUrl: newInputUrl,
      inputLogoUrl: newInputLogoUrl
    })
  }


  render() {
    return (
      <Layout className="App">
        <NavDrawer active={this.state.drawerActive} onOverlayClick={() => {this.toggleNavDrawer()} }>
          <p>//TODO: Navigation menu</p>
        </NavDrawer>
        <Panel className="App-panel">
          <div className="App-panel-header">
            <AppBar title='StudentHub UI Development Site' leftIcon="menu" onLeftIconClick={() => {this.toggleNavDrawer()} } rightIcon='perm_identity' >
              <Navigation className="App-header-pages" type='horizontal'>
                <Link href='/#' label='Universities' icon='school' />
                <Link href='/#' label='Companies' icon='business' />
                <Link href='/#' label='Profile' icon='account_circle' />
              </Navigation>
            </AppBar>
          </div>
          <div className="App-panel-body">
            <div className="App-panel-body-main">
              <div className="Header">
                <span className="Header-text">{this.state.header}</span>
                <span className="Add-button">{this.renderAddButton()}</span>
              </div>
              <hr />
              <Input type="search" icon="search" label="TODO: Search" disabled />
              {this.renderContentTable()}
            </div>
          </div>
          <Snackbar
            action='Dismiss'
            active={this.state.snackbarActive}
            label={snackbarLabel}
            onClick={this.toggleSnackbar}
            type='warning'
            timeout={1750}
            onTimeout={this.toggleSnackbar}
          />
          {this.renderDialog()}
        </Panel>
      </Layout>
    );
  }
}

export default App;

/*
   <div className="App-panel-body-sidebar">
     <Input type="search" icon="search" label="TODO: Search" disabled />
     {this.renderSidebarList("/#")}
   </div>
 */
 /*
 <Dialog
   actions={this.dialogActions}
   active={this.state.dialogActive}
   onEscKeyDown={() => this.toggleAddDialog()}
   onOverlayClick={() => this.toggleAddDialog()}
   title='Create a new university'
 >
 <p>fdfeae</p>
 </Dialog>
 */
