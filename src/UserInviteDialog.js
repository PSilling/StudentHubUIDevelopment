import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog.js';
import Input from 'react-toolbox/lib/input/Input.js';
import Util from './Util.js';

/**
 * Renders the add Dialog for faculties.
 * @param active                          whether the dialog is active
 * @param inviteHandler(email, message)   invite callback function
 * @param toggleHandler()                 function to call when closing the Dialog
 */
class UserEditDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: "",
      errorMail: "",
      message: ""
    }
  }

  actions = [
    { label: "Send", onClick: () => this.handleInvite() },
    { label: "Cancel", onClick: () => this.handleToggle() }
  ];

  /**
   * Handels the request to save the changes.
   */
  handleInvite = () => {
    if(!this.checkData()) return;
    this.props.inviteHandler(this.state.email, this.state.message);
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
      mail: "",
      errorMail: "",
      message: ""
    });
    this.props.toggleHandler();
  }

  /**
   * Checks whether faculty Dialog input values are correct.
   * @return true if correct, false otherwise
   */
  checkData = () => {
    var newErrorMail = Util.checkData(this.state.mail,  "Recipent email is required!");

    if(newErrorMail !== "") {
      this.setState({
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
          title="Invite users"
          type="large"
        >
          <table width="95%">
            <tbody>
              <tr>
                <td>
                  <Input type='text' label="Email" hint='Email of the recipent' error={this.state.errorMail}  required  value={this.state.mail} onChange={(value) => this.handleInputChange("mail", value)} />
                </td>
              </tr>
              <tr>
                <td>
                  <Input type='text' label="Message" hint='Addicional message for the recipent' multiline value={this.state.message} onChange={(value) => this.handleInputChange("message", value)} />
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
