import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog.js';
import Input from 'react-toolbox/lib/input/Input.js';

/**
 * Renders the input Dialog for universities.
 * @param actions                         dialog actions
 * @param active                          whether the dialog is active
 * @param name                            value of name Input
 * @param city                            value of city Input
 * @param country                         value of country Input
 * @param url                             value of url Input
 * @param logoUrl                         value of logoUrl Input
 * @param titleLabel                      value of Dialog title
 * @param errorName                       value of name Input error
 * @param errorCity                       value of city Input error
 * @param errorCountry                    value of country Input error
 * @param toggleHandler()                 function to call when closing the Dialog
 * @param handleInputChange(name, value)  function to call when Input fields change
 */
class UniversityDialog extends Component {
  /**
   * Generates the insides of the Dialog
   * @return the desired insides
   */
  generateDialog() {
    var dialog = [];

    dialog.push(
      <table width="95%">
        <tbody>
          <tr>
            <td colSpan="2">
              <Input type='text'  label="Name" hint='University name' error={this.props.errorName} value={this.props.name} onChange={(value) => this.props.handleInputChange("inputName", value)} required />
            </td>
          </tr>
          <tr>
            <td>
              <Input type='text' label="City" hint='City' error={this.props.errorCity} value={this.props.city} onChange={(value) => this.props.handleInputChange("inputCity", value)}  required maxLength={32} />
            </td>
            <td>
              <Input type='text' label="Country" hint='Country (eg. CZ, SK)' error={this.props.errorCountry} value={this.props.country} onChange={(value) => this.props.handleInputChange("inputCountry", value)}  required maxLength={8} />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <Input type='text' label='Website' hint='Link to the web page' value={this.props.url} onChange={(value) => this.props.handleInputChange("inputUrl", value)} />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <Input type='text' label='Logo' hint='Link to the logo source' value={this.props.logoUrl} onChange={(value) => this.props.handleInputChange("inputLogoUrl", value)} />
            </td>
          </tr>
        </tbody>
      </table>
    );

    return dialog;
  }

  render() {
    return(
      <div className="Dialog-university">
        <Dialog
          active={this.props.active}
          actions={this.props.actions}
          onEscKeyDown={() => this.props.toggleHandler()}
          onOverlayClick={() => this.props.toggleHandler()}
          title={this.props.titleLabel}
          type="large"
        >
          {this.generateDialog()}
        </Dialog>
      </div>
    );
  }
}

export default UniversityDialog;
