import React, { Component } from 'react';

import AdminUsersView from './AdminUsersView.js';
import CompanyRepUsersView from './CompanyRepUsersView.js';
import SiteSnackbar from './SiteSnackbar.js';
import Util from './Util.js';

/**
 * Creates a random list of new users.
 */
function generateUsers() {
  var users = [];

  for (var i = 0; i < 50; i++) {
    users.push({
      company: {
        city:	"string",
        country:	(i % 2 === 0) ? Util.states.CZ : Util.states.SK,
        id:	0,
        logoUrl: "string",
        name:	"string",
        plan:	(i % 3 === 0) ? Util.companyPlans.t1 : Util.companyPlans.t2,
        size:	(i % 3 === 0) ? Util.companySizes.small : Util.companySizes.medium,
        url:	"string"
      },
      email:	"string",
      faculty: {
        id:	0,
        name:	"string",
        university:	"University"
      },
      id:	i,
      lastLogin:	[

      ],
      name:	"Name of "+i,
      phone:	"777 666 0"+i,
      roles:	(i % 10 === 0) ? Util.userRoles.admin : Util.userRoles.student,
      tags:	"Array",
      username:	"Username of "+i
    });
  }

  return users;
}

/**
 * Pregenerated users list.
 * @type {Array}
 */
var userList = generateUsers();

class UsersView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: userList,
      snackbarActive: false,
      snackbarLabel: ""
    };
  }

  /**
   * Checks whether the user is Admin.
   * @return true if Admin, false otherwise
   */
  isAdmin = () => {
    return true;
  }

  /**
   * Gets the list of user associated with CompanyRep's faculty.
   * @return the list of users
   */
  getCompanyUsers = () => {
    return this.state.users;
  }

  /**
   * Adds a new user to the data.
   * @param user  the user to be created
   */
  addUser = (user) => {
    var users = this.state.users;

    var id = Util.findFreeID(users);

    if(id === users.lenght) users.push({ id: id, name: user });
    else users[id] = { id: id, name: user };

    this.setState({
      users: users
    });
  }

  /**
   * Edits a user from the data.
   * @param user  the user to be changed
   */
  editUser = (id, user) => {
    if(id === -1) return;
    var users = this.state.users;

    users[id] = user;

    this.setState({
      users: users,
      snackbarActive: true,
      snackbarLabel: "The user has been succesfully changed!"
    });
  }

  /**
   * Deletes a user from the data.
   * @param user  the user to be removed
   */
  deleteUser = (id) => {
    var users = this.state.users;

    users[id] = "";

    this.setState({
      users: users,
      snackbarActive: true,
      snackbarLabel: "The user has been succesfully deleted!"
    });
  }

  /**
   * Sends an invitation on a desired email
   * @param email the email of the recipent
   */
  inviteUser = (email, message) => {
    this.setState({
      snackbarActive: true,
      snackbarLabel: "Invitations cannot be sent yet!"
    });
  }

  /**
   * Toggles the visiblity of the Snackbar.
   */
  toggleSnackbar = () => {
    var newValue = !this.state.snackbarActive;

    this.setState({
      snackbarActive: newValue
    })
  }

  /**
   * Generates the appropriate user view components.
   * @return the desired component
   */
  generateView = () => {
    if(this.isAdmin())
      return (<AdminUsersView users={this.state.users} editHandler={(id, user) => this.editUser(id, user)}  deleteHandler={(id) => this.deleteUser(id)} />);
    else
      return (<CompanyRepUsersView users={this.getCompanyUsers()} inviteHandler={(email, message) => this.inviteUser(email, message)} />);
  }

  render() {
    return(
      <div className="Users-view">
        {this.generateView()}
        <SiteSnackbar
          active={this.state.snackbarActive}
          toggleHandler={this.toggleSnackbar}
          label={this.state.snackbarLabel}
        />
      </div>
    );
  }
}

export default UsersView;
