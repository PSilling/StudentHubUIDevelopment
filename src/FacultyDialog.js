import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog.js';
import Input from 'react-toolbox/lib/input/Input.js';

/**
 * Renders the input Dialog for faculties.
 * @param actions                         dialog actions
 * @param active                          whether the dialog is active
 * @param name                            value of name Input
 * @param titleLabel                      value of Dialog title
 * @param errorLabel                      value of (name) Input error
 * @param toggleHandler()                 function to call when closing the Dialog
 * @param handleInputChange(name, value)  function to call when Input fields change
 */
class FacultyDialog extends Component {
  render() {
    return(
      <div className="Dialog-faculty">
        <Dialog
          active={this.props.active}
          actions={this.props.actions}
          onEscKeyDown={() => this.props.toggleHandler()}
          onOverlayClick={() => this.props.toggleHandler()}
          title={this.props.titleLabel}
          type="large"
        >
          <table width="95%">
            <tbody>
              <tr>
                <td>
                  <Input type='text' label="Name" hint='Faculty name' error={this.props.errorLabel}  required  value={this.props.name} onChange={(value) => this.props.handleInputChange("inputName", value)} />
                </td>
              </tr>
            </tbody>
          </table>
        </Dialog>
      </div>
    );
  }
}

export default FacultyDialog;
