import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List.js';
import ListItem from 'react-toolbox/lib/list/ListItem.js';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader.js';

import EditButton from './EditButton.js';
import DeleteButton from './DeleteButton.js';

/**
 * Renders the users vies for CompanyReps.
 */
class CompanyRepUsersView extends Component {
  generateListItems = () => {
    var items = [];

    for(let i = 0; i < this.props.users.length; i++) {
      items.push(
        <ListItem
          avatar=""
          caption={this.props.users[i].name}
          legend={this.props.users[i].email}
        />
      );
    }

    return items;
  }

  render() {
    return(
      <List selectable ripple>
        {this.generateListItems()}
      </List>
    );
  }
}

export default CompanyRepUsersView;
