import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog.js';
import Input from 'react-toolbox/lib/input/Input.js';

/**
 * Renders the add Dialog for faculties.
 * @param active                          whether the dialog is active
 * @param user                            the user to edit
 * @param editHandler(user)               adding callback function
 * @param toggleHandler()                 function to call when closing the Dialog
 */
class UserEditDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.user.name,
      errorLabel: ""
    }
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
    this.props.editHandler(this.state.name);
    this.setState({
      name: "",
      errorLabel: "",
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
      name: "",
      errorName: "",
    });
    this.props.toggleHandler();
  }

  /**
   * Checks whether faculty Dialog input values are correct.
   * @return true if correct, false otherwise
   */
  checkData = () => {
    if(this.state.name === "" || typeof this.state.name === "undefined") {
      var newErrorName = "User name is required!";

      this.setState({
        errorName: newErrorName
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
                <td>
                  <Input type='text' label="Name" hint='Name of the user' error={this.state.errorName}  required  value={this.state.name} onChange={(value) => this.handleInputChange("name", value)} />
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
