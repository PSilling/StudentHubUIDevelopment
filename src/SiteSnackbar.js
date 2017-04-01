import React, { Component } from 'react';
import Snackbar from 'react-toolbox/lib/snackbar/Snackbar.js';

/**
 * Renders the site's custom Snackbar.
 * @param active            current visiblity state
 * @param toggleHandler()   function handling visiblity toggle
 * @param label             label of the Snackbar
 */
class SiteSnackbar extends Component {
  render() {
    return(
      <Snackbar
        action='Dismiss'
        active={this.props.active}
        label={this.props.label}
        onClick={this.props.toggleHandler}
        type='warning'
        timeout={2000}
        onTimeout={this.props.toggleHandler}
      />
    );
  }
}

export default SiteSnackbar;
