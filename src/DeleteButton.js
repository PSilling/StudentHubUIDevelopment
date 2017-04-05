import React, { Component } from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton.js';

/**
 * Renders a ContentTable delete IconButton.
 * @param deleteHandler() defines the function to call onClick
 */
class DeleteButton extends Component {
  render() {
    return(
      <IconButton onClick={() => this.props.deleteHandler()} icon="delete" label="Delete" />
    );
  }
}

export default DeleteButton;
