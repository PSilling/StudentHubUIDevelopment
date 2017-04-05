import React, { Component } from 'react';

import AdminUsersView from './AdminUsersView.js';
import CompanyRepUsersView from './CompanyRepUsersView.js';

/**
 * Holds state codes
 * @type {Enum}
 */
const states = {
  CZ: "CZ",
  SK: "SK"
}

/**
 * Holds user role codes
 * @type {Enum}
 */
const userRoles = {
  superviser: "AC_SUPERVISOR",
  admin: "ADMIN",
  companyRep: "COMPANY_REP",
  student: "STUDENT",
  techLeader: "TECH_LEADER"
}

/**
 * Holds Company size codes
 * @type {Enum}
 */
const companySizes = {
  startUp: "STARTUP",
  small: "SMALL",
  medium: "MEDIUM",
  corp: "CORPORATE"
}

/**
 * Holds Company plan codes
 * @type {Enum}
 */
const companyPlans = {
  t1: "TIER_1",
  t2: "TIER_2",
  t3: "TIER_3"
}

/**
 * Pregenerated users list.
 * @type {Array}
 */
var userList = [
  {
    company: {
      city:	"string",
      country:	states.CZ,
      id:	0,
      logoUrl: "string",
      name:	"string",
      plan:	companyPlans.t1,
      size:	companySizes.medium,
      url:	"string"
    },
    email:	"string",
    faculty: {
      id:	0,
      name:	"string",
      university:	"University"
    },
    id:	0,
    lastLogin:	[

    ],
    name:	"string",
    phone:	"string",
    roles:	userRoles.admin,
    tags:	[

    ],
    username:	"string"
  }
];

/**
 * Renders the return to university list Button.
 * @param returnCallback() defines the return function to call onClick
 */
class UsersView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: userList
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
   * Searches a given array for the first available ID value.
   * @param  array  the array to be searched
   * @return        first free id value
   */
  findFreeID = (array) => {
    var id;

    for (var i = 0; i < array.length; i++) {
      if(typeof array[i].id === "undefined") {
        id = i;
        break;
      }
      else id = array.length;
    }
    return id;
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

    var id = this.findFreeID(users);

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
  editUser = (user) => {
    var users = this.state.users;

    users[0].name = user;

    this.setState({
      users: users
    });
  }

  /**
   * Deletes a user from the data.
   * @param user  the user to be removed
   */
  deleteUser = (id) => {
    var users = this.state.users;

    users[id].name = "";

    this.setState({
      users: users
    });
  }

  /**
   * Generates the appropriate user view components.
   * @return the desired component
   */
  generateView = () => {
    if(this.isAdmin()) return (<AdminUsersView users={this.state.users} editHandler={(id, user) => this.editUser(id, user)}  deleteHandler={(id) => this.deleteUser(id)} />);
    else return (<CompanyRepUsersView users={this.getCompanyUsers()} />);
  }

  render() {
    return(
      <div className="Users-view">
        {this.generateView()}
      </div>
    );
  }
}

export default UsersView;
