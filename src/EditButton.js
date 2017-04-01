import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button.js';

/**
 * Renders a ContentTable edit Button.
 * @param toggleHandler() defines the function to call onClick
 */
class EditButton extends Component {
  render() {
    return(
      <Button onClick={() => this.props.toggleHandler()} icon="edit" label="Edit" />
    );
  }
}

export default EditButton;
