import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog.js';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown.js';
import Input from 'react-toolbox/lib/input/Input.js';

import Util from './Util.js';

/**
 * Renders the input Dialog for universities.
 * @param editId                          university edit id
 * @param active                          whether the dialog is active
 * @param university                      editing university
 * @param addHandler(university)          function to call to create a new university
 * @param editHandler(university)         function to call to change the edited university
 * @param toggleHandler()                 function to call when closing the Dialog
 */
class UniversityDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      errorName: "",
      city: "",
      errorCity: "",
      country: "CZ",
      url: "",
      logo: "",
      titleLabel: "Add a new university",
      actions: [
        { label: "Add", onClick: () => this.handleAdd()},
        { label: "Cancel", onClick: () => this.handleToggle() }
      ]
    }
  }

  /**
   * Sets default input values on props change.
   */
  componentWillReceiveProps(nextProps) {
    if(this.props === nextProps || nextProps.user === -1) return;

    var nameState;
    var cityState;
    var countryState;
    var urlState;
    var logoState;
    var titleState;
    var actionsState;

    if(nextProps.editId === -1) {
      nameState = "";
      cityState = "";
      countryState = "CZ";
      urlState = "";
      logoState = "";
      titleState = "Add a new university";
      actionsState = [
        { label: "Add", onClick: () => this.handleAdd()},
        { label: "Cancel", onClick: () => this.handleToggle() }
      ];
    }
    else {
      nameState = nextProps.university.name;
      cityState = nextProps.university.city;
      countryState = nextProps.university.country;
      urlState = nextProps.university.url;
      logoState = nextProps.university.logoUrl;
      titleState = "Edit university";
      actionsState = [
        { label: "Save", onClick: () => this.handleEdit()},
        { label: "Cancel", onClick: () => this.handleToggle() }
      ];
    }

    this.setState({
      name: nameState,
      city: cityState,
      country: countryState,
      url: urlState,
      logo: logoState,
      titleLabel: titleState,
      actions: actionsState
    });
  }

  /**
   * Dialog source of state codes.
   */
  states = [
    { value: "CZ", label: "CZ" },
    { value: "SK", label: "SK" }
  ];

  /**
   * Handles changes of Dialog Inputs.
   * @param name    state variable name
   * @param value   new input value to be set onChange
   */
  handleInputChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  /**
   * Handles adding request.
   */
  handleAdd = () => {
    if(!this.checkUniversity()) return;
    this.props.addHandler({
      city: this.state.city,
      country: this.state.country,
      id: -1,
      logoUrl: this.state.logo,
      name: this.state.name,
      url: this.state.url
    });
    this.handleToggle();
  }

  /**
   * Handles editing request.
   */
  handleEdit = () => {
    if(!this.checkUniversity()) return;
    this.props.editHandler({
      city: this.state.city,
      country: this.state.country,
      id: this.props.university.id,
      logoUrl: this.state.logo,
      name: this.state.name,
      url: this.state.url
    });
    this.handleToggle();
  }

  /**
   * Handles visiblity changing.
   */
  handleToggle = () => {
    this.setState({
      name: "",
      errorName: "",
      city: "",
      errorCity: "",
      url: "",
      logo: ""
    });
    this.props.toggleHandler();
  }

  /**
   * Checks whether university Dialog input values are correct.
   * @return true if correct, false otherwise
   */
  checkUniversity = () => {
    var newErrorName = Util.checkData(this.state.name, "University name is required!");
    var newErrorCity = Util.checkData(this.state.city, "City is required!");

    if(newErrorName !== "" || newErrorCity !== "") {
      this.setState({
        errorName: newErrorName,
        errorCity: newErrorCity
      });
      return false;
    }
    else return true;
  }

  render() {
    return(
      <div className="Dialog-university">
        <Dialog
          active={this.props.active}
          actions={this.state.actions}
          onEscKeyDown={() => this.handleToggle()}
          onOverlayClick={() => this.handleToggle()}
          title={this.state.titleLabel}
          type="large"
        >
          <table width="100%">
            <tbody>
              <tr>
                <td colSpan="2">
                  <Input type='text'  label="Name" hint='University name' error={this.state.errorName} value={this.state.name} onChange={(value) => this.handleInputChange("name", value)} required />
                </td>
              </tr>
              <tr>
                <td>
                  <Input type='text' label="City" hint='City' error={this.state.errorCity} value={this.state.city} onChange={(value) => this.handleInputChange("city", value)}  required maxLength={32} />
                </td>
                <td>
                  <Dropdown
                    auto
                    source={this.states}
                    onChange={(value) => this.handleInputChange("country", value)}
                    label='Country'
                    value={this.state.country}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <Input type='text' label='Website' hint='Link to the web page' value={this.state.url} onChange={(value) => this.handleInputChange("url", value)} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <Input type='text' label='Logo' hint='Link to the logo source' value={this.state.logo} onChange={(value) => this.handleInputChange("logo", value)} />
                </td>
              </tr>
            </tbody>
          </table>
        </Dialog>
      </div>
    );
  }
}

export default UniversityDialog;
