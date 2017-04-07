import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button.js';

/**
 * Renders the add Button.
 * @param toggleHandler()   defines the function to call onClick when invitation Dialog should be shown
 */
class AddButton extends Component {
  render() {
    return(
      <span>
        <Button onClick={() => this.props.toggleHandler()} icon="send" label="Invite a user" raised primary floating />
      </span>
    );
  }
}

export default AddButton;
