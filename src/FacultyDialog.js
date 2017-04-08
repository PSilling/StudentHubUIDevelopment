import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog.js';
import Input from 'react-toolbox/lib/input/Input.js';

import Util from './Util.js';

/**
 * Renders the input Dialog for faculties.
 * @param active                          whether the dialog is active
 * @param editId                          faculty edit id
 * @param faculty                         editing faculty
 * @param addHandler(faculty)             function to call to create a new faculty
 * @param editHandler(faculty)            function to call to change the edited faculty
 * @param toggleHandler()                 function to call when closing the Dialog
 */
class FacultyDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      errorName: "",
      titleLabel: "Add a new faculty",
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
    var titleState;
    var actionsState;

    if(nextProps.editId === -1) {
      nameState = "";
      titleState = "Add a new faculty";
      actionsState = [
        { label: "Add", onClick: () => this.handleAdd()},
        { label: "Cancel", onClick: () => this.handleToggle() }
      ];
    }
    else {
      nameState = nextProps.faculty.name;
      titleState = "Edit faculty";
      actionsState = [
        { label: "Save", onClick: () => this.handleEdit()},
        { label: "Cancel", onClick: () => this.handleToggle() }
      ];
    }

    this.setState({
      name: nameState,
      titleLabel: titleState,
      actions: actionsState
    });
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
   * Handles adding request.
   */
  handleAdd = () => {
    if(!this.checkFaculty()) return;
    this.props.addHandler({
      id: -1,
      name: this.state.name,
      university: ""
    });
    this.handleToggle();
  }

  /**
   * Handles editing request.
   */
  handleEdit = () => {
    if(!this.checkFaculty()) return;
    this.props.editHandler({
      id: this.props.faculty.id,
      name: this.state.name,
      university: this.props.faculty.university
    });
    this.handleToggle();
  }

  /**
   * Handles visiblity changing.
   */
  handleToggle = () => {
    this.setState({
      name: "",
      errorName: ""
    });
    this.props.toggleHandler();
  }

  /**
   * Checks whether faculty Dialog input values are correct.
   * @return true if correct, false otherwise
   */
  checkFaculty = () => {
    var newErrorName = Util.checkData(this.state.name, "Faculty name is required!");

    if(newErrorName !== "") {
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
          actions={this.state.actions}
          onEscKeyDown={() => this.handleToggle()}
          onOverlayClick={() => this.handleToggle()}
          title={this.state.titleLabel}
          type="large"
        >
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  <Input type='text' label="Name" hint='Faculty name' error={this.state.errorName}  required  value={this.state.name} onChange={(value) => this.handleInputChange("name", value)} />
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
