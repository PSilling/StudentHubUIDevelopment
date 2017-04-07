import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog.js';
import Input from 'react-toolbox/lib/input/Input.js';

/**
 * Renders the add Dialog for faculties.
 * @param active                          whether the dialog is active
 * @param user                            the user to edit
 * @param editHandler(user)               editing callback function
 * @param toggleHandler()                 function to call when closing the Dialog
 */
class UserEditDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.user.username,
      errorUsername: "",
      name: this.props.user.name,
      errorName: "",
      mail: this.props.user.email,
      errorMail: "",
      phone: this.props.user.phone,
      faculty: this.props.user.name,
      company: this.props.user.name,
      role: this.props.user.roles,
      tags: this.props.user.tags
    }
  }

  /**
   * Sets default input values on props change.
   */
  componentWillReceiveProps(nextProps) {
    if(this.props === nextProps || nextProps.user === -1) return;

    this.setState({
      username: nextProps.user.username,
      errorUsername: "",
      name: nextProps.user.name,
      errorName: "",
      mail: nextProps.user.email,
      errorMail: "",
      phone: nextProps.user.phone,
      faculty: nextProps.user.name,
      company: nextProps.user.name,
      role: nextProps.user.roles,
      tags: nextProps.user.tags
    });
  }

  actions = [
    { label: "Save", onClick: () => this.handleSave() },
    { label: "Cancel", onClick: () => this.handleToggle() }
  ];

  /**
   * Handels the request to save the changes.
   */
  handleSave = () => {
    if(!this.checkData()) return;
    this.props.editHandler({
      company: {
        name:	this.state.faculty
      },
      email:	this.state.mail,
      faculty: {
        name:	this.state.faculty
      },
      id:	this.props.user.id,
      lastLogin:	this.props.user.lastLogin,
      name:	this.state.name,
      phone:	this.state.phone,
      roles:	this.props.user.roles,
      tags:	this.state.tags,
      username:	this.state.username
    });
    this.handleToggle();
  }

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
   * Handles visiblity changing.
   */
  handleToggle = () => {
    this.setState({
      username: "",
      errorUsername: "",
      name: "",
      errorName: "",
      mail: "",
      errorMail: "",
      phone: "",
      faculty: "",
      company: "",
      role: "",
      tags: "",
    });
    this.props.toggleHandler();
  }

  /**
   * Checks whether faculty Dialog input values are correct.
   * @return true if correct, false otherwise
   */
  checkData = () => {
    var newErrorName = "";
    var newErrorUsername = "";
    var newErrorMail = "";

    if(this.state.username === "" || typeof this.state.username === "undefined")
      newErrorName = "Username is required!";
    if(this.state.name === "" || typeof this.state.name === "undefined")
      newErrorUsername = "User name is required!";
    if(this.state.mail === "" || typeof this.state.mail === "undefined")
      newErrorMail = "User email is required!";

    if(newErrorName !== "" || newErrorUsername !== "" || newErrorMail !== "") {
      this.setState({
        errorName: newErrorName,
        errorUsername: newErrorUsername,
        errorMail: newErrorMail
      });
      return false;
    }
    else return true;
  }

  render() {
    return(
      <div className="Dialog-faculty">
        <Dialog
          active={this.props.active}
          actions={this.actions}
          onEscKeyDown={() => this.handleToggle()}
          onOverlayClick={() => this.handleToggle()}
          title="Edit user"
          type="large"
        >
          <table width="95%">
            <tbody>
              <tr>
                <td colSpan="2">
                  <Input type='text' label="Username" hint='Username of the user' error={this.state.errorUsername}  required  value={this.state.username} onChange={(value) => this.handleInputChange("username", value)} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <Input type='text' label="Name" hint='Name of the user' error={this.state.errorName}  required  value={this.state.name} onChange={(value) => this.handleInputChange("name", value)} />
                </td>
              </tr>
              <tr>
                <td width="50%">
                  <Input type='text' label="Email" hint='Email of the user' error={this.state.errorMail}  required  value={this.state.mail} onChange={(value) => this.handleInputChange("mail", value)} />
                </td>
                <td width="50%">
                  <Input type='text' label="Phone" hint='Phone number of the user' value={this.state.phone} onChange={(value) => this.handleInputChange("phone", value)} />
                </td>
              </tr>
              <tr>
                <td width="50%">
                  <Input type='text' label="Faculty" hint='Faculty of the user' value={this.state.faculty} onChange={(value) => this.handleInputChange("faculty", value)} />
                </td>
                <td width="50%">
                  <Input type='text' label="Company" hint='Company of the user' value={this.state.company} onChange={(value) => this.handleInputChange("company", value)} />
                </td>
              </tr>
              <tr>
                <td width="50%">
                  <Input type='text' label="Role" hint='User role' error={this.state.errorRole}  required  value={this.state.role} onChange={(value) => this.handleInputChange("role", value)} />
                </td>
                <td width="50%">
                  <Input type='text' label="Tags" hint='User tags' value={this.state.tags} onChange={(value) => this.handleInputChange("tags", value)} />
                </td>
              </tr>
            </tbody>
          </table>
        </Dialog>
      </div>
    );
  }
}

export default UserEditDialog;
