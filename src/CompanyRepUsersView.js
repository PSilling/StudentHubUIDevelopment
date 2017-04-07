import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List.js';
import ListItem from 'react-toolbox/lib/list/ListItem.js';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader.js';

import InviteButton from './InviteButton.js';
import UserInviteDialog from './UserInviteDialog.js';

/**
 * Renders the users vies for CompanyReps.
 * @param inviteHandler()    callback function handling invitations
 */
class CompanyRepUsersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogActive: false
    }
  }

  /**
   * Generates all of the ListItems
   */
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

  /**
   * Toggle the visiblity of the edit Dialog.
   */
  toggleDialog = () => {
    var newDialogActive = !this.state.dialogActive;

    this.setState({
      dialogActive: newDialogActive
    });
  }

  render() {
    return(
      <div className="Users-company">
        <InviteButton toggleHandler={() => this.toggleDialog()}/>
        <List selectable ripple>
          {this.generateListItems()}
        </List>
        <UserInviteDialog active={this.state.dialogActive} inviteHandler={(email, message) => this.props.inviteHandler(email, message)} toggleHandler={() => this.toggleDialog()} />
      </div>
    );
  }
}

export default CompanyRepUsersView;
