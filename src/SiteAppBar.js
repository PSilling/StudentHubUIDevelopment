import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar.js';
import Navigation from 'react-toolbox/lib/navigation/Navigation.js';
import Link from 'react-toolbox/lib/link/Link.js';

/**
 * Renders the site's custom AppBar.
 */
class SiteAppBar extends Component {
  render() {
    return(
      <AppBar title='StudentHub UI Development Site' rightIcon='perm_identity' >
        <Navigation className="App-header-pages" type='horizontal'>
          <Link href='/#' label='Universities' icon='school' />
          <Link href='/#' label='Companies' icon='business' />
          <Link href='/#' label='Profile' icon='account_circle' />
        </Navigation>
      </AppBar>
    );
  }
}

export default SiteAppBar;
