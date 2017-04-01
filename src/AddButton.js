import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button.js';

/**
 * Renders the add Button.
 * @param toggleUniversityHandler() defines the function to call onClick when universities are browsed
 * @param toggleFacultyHandler()    defines the function to call onClick when faculties are browsed
 */
class AddButton extends Component {
  generateButton = () => {
    var button;

    if(this.props.selectedUniversity === -1) {
      button = <Button onClick={() => this.props.toggleUniversityHandler()} icon="add" label="Add New University" raised primary floating />;
    }
    else button = <Button onClick={() => this.props.toggleFacultyHandler()} icon="add" label="Add New Faculty" raised primary floating />;

    return button;
  }

  render() {
    return(
      <span>
        {this.generateButton()}
      </span>
    );
  }
}

export default AddButton;
