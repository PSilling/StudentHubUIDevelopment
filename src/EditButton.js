import React, { Component } from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton.js';

/**
 * Renders a ContentTable edit IconButton.
 * @param toggleHandler() defines the function to call onClick
 */
class EditButton extends Component {
  render() {
    return(
      <IconButton onClick={() => this.props.toggleHandler()} icon="edit" label="Edit" />
    );
  }
}

export default EditButton;
