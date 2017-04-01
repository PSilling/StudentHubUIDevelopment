import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button.js';

/**
 * Renders the return to university list Button.
 * @param returnCallback() defines the return function to call onClick
 */
class ReturnButton extends Component {
  render() {
    return(
      <span>
        <Button onClick={() => this.props.returnCallback()} icon="arrow_back" label="Back" />
      </span>
    );
  }
}

export default ReturnButton;
