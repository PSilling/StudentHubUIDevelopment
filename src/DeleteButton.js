import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button.js';

/**
 * Renders a ContentTable delete Button.
 * @param deleteHandler() defines the function to call onClick
 */
class DeleteButton extends Component {
  render() {
    return(
      <Button onClick={() => this.props.deleteHandler()} icon="delete" label="Delete" />
    );
  }
}

export default DeleteButton;
