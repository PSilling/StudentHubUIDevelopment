import React, { Component } from 'react';
import Table from 'react-toolbox/lib/table/Table.js';
import TableCell from 'react-toolbox/lib/table/TableCell.js';
import TableHead from 'react-toolbox/lib/table/TableHead.js';
import TableRow from 'react-toolbox/lib/table/TableRow.js';

import EditButton from './EditButton.js';
import DeleteButton from './DeleteButton.js';
import UserEditDialog from './UserEditDialog.js';

/**
 * Renders the users vies for Admins.
 * @param users                             list of all users
 * @param editHandler(id, user)             defines the function to call on EditButton clicks
 * @param deleteHandler(id)                 defines the function to call on DeleteButton clicks
 */
class AdminUsersView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogActive: false,
      editId: 0,
    };
  }

  /**
   * Toggle the visiblity of the edit Dialog.
   */
  toggleDialog = (id) => {
    var newDialogActive = !this.state.dialogActive;

    this.setState({
      dialogActive: newDialogActive,
      editId: id
    });
  }

  /**
   * Generates all TableCells of TableRow.
   * @return generated cells
   */
  generateRowCells = () => {
    var cells = [];

    for(let i = 0; i < this.props.users.length; i++) {
      cells.push(
        <TableRow>
          <TableCell numeric>
            {this.props.users[i].id}
          </TableCell>
          <TableCell>
            {this.props.users[i].username}
          </TableCell>
          <TableCell>
            {this.props.users[i].name}
          </TableCell>
          <TableCell>
            {this.props.users[i].email}
          </TableCell>
          <TableCell>
            {this.props.users[i].phone}
          </TableCell>
          <TableCell>
            {this.props.users[i].faculty.name}
          </TableCell>
          <TableCell>
            {this.props.users[i].company.name}
          </TableCell>
          <TableCell>
            {this.props.users[i].roles}
          </TableCell>
          <TableCell>
            {this.props.users[i].lastLogin}
          </TableCell>
          <TableCell>
            {this.props.users[i].tags}
          </TableCell>
          <TableCell>
            <table>
              <tbody>
                <tr>
                  <td>
                    <EditButton toggleHandler={() => this.toggleDialog(i)} />
                  </td>
                  <td>
                    <DeleteButton deleteHandler={() => this.props.deleteHandler(i)} />
                  </td>
                </tr>
              </tbody>
            </table>
          </TableCell>
        </TableRow>
      );
    }

    return cells;
  }

  render() {
    return(
      <div className="Users-admin">
        <Table multiSelectable={false} selectable={false}>
          <TableHead>
            <TableCell numeric>
              ID
            </TableCell>
            <TableCell>
              Username
            </TableCell>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Email
            </TableCell>
            <TableCell>
              Phone
            </TableCell>
            <TableCell>
              Faculty
            </TableCell>
            <TableCell>
              Company
            </TableCell>
            <TableCell>
              Role
            </TableCell>
            <TableCell>
              Last login
            </TableCell>
            <TableCell>
              Tags
            </TableCell>
            <TableCell>
              Actions
            </TableCell>
          </TableHead>
          {this.generateRowCells()}
        </Table>
        <UserEditDialog
          active={this.state.dialogActive}
          user={this.props.users[0]}
          editHandler={(user) => this.props.editHandler(user)}
          toggleHandler={() => this.toggleDialog(0)}
        />
    </div>
    );
  }
}

export default AdminUsersView;
