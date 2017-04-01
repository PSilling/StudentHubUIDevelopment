import React, { Component } from 'react';
import Table from 'react-toolbox/lib/table/Table.js';
import TableCell from 'react-toolbox/lib/table/TableCell.js';
import TableHead from 'react-toolbox/lib/table/TableHead.js';
import TableRow from 'react-toolbox/lib/table/TableRow.js';

import EditButton from './EditButton.js';
import DeleteButton from './DeleteButton.js';
import ReturnButton from './ReturnButton.js';

/**
 * Renders the content Table and all its inside elements.
 * @param selectedUniversity which university is currenty selected
 * @param universityData                         list of all the universities
 * @param facultyData                            list of all the faculties
 * @param snackbarLabelSetter(label)             sets the snackbar label
 * @param snackbarHandler()                      defines the function to call to toggle the Snackbar
 * @param editToggleUniversityHandler(id)        defines the function to call on EditButton clicks when viewing universities
 * @param editToggleFacultyHandler(id)           defines the function to call on EditButton clicks when viewing faculties
 * @param deleteHandler(id)                      defines the function to call on DeleteButton clicks
 * @param stateSetter(id, head)                  defines the function to call when setting App state is required
 */
class ContentTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUniversity: this.props.selectedUniversity,
      header: ""
    };
  }

  /**
   * Handles clicks on TableCells.
   * @param id selectedUniversity value to be set onClick
   */
  handleCellClick = (id) => {
    var newHeader;
    if(id === -1) newHeader = "Universities";
    else newHeader = this.props.universityData[id].name+" faculties";
    this.props.snackbarLabelSetter("Clicked on university with ID "+id);
    this.props.snackbarHandler();

    this.props.stateSetter(id, newHeader);
    this.setState({
      selectedUniversity: id
    });
  }

  /**
   * Generates all TableCells of TableHead.
   * @return generated cells
   */
  generateHeadCells = () => {
    var cells = [];

    cells.push(<TableCell numeric>ID</TableCell>);
    if(this.state.selectedUniversity === -1) cells.push(<TableCell>Logo</TableCell>);
    cells.push(<TableCell>Name</TableCell>);
    if(this.state.selectedUniversity === -1) {
      cells.push(<TableCell>City</TableCell>);
      cells.push(<TableCell>Country</TableCell>);
      cells.push(<TableCell>Website</TableCell>);
    }
    else {
      cells.push(<TableCell>University</TableCell>);
    }
    cells.push(<TableCell>Actions</TableCell>);
    return cells;
  }

  /**
   * Generates all TableRows of university list.
   * @return generated cells
   */
  generateUniversityRow = (id) => {
    var row = [];

    row.push(
      <TableRow>
        <TableCell numeric>
          {this.props.universityData[id].id}
        </TableCell>
        <TableCell>
          {this.props.universityData[id].logoUrl}
        </TableCell>
        <TableCell onClick={() => this.handleCellClick(id)}>
          <span className="CellLink">
            {this.props.universityData[id].name}
          </span>
        </TableCell>
        <TableCell>
          {this.props.universityData[id].city}
        </TableCell>
        <TableCell>
          {this.props.universityData[id].country}
        </TableCell>
        <TableCell>
          {this.props.universityData[id].url}
        </TableCell>
        <TableCell>
          <table>
            <tbody>
              <tr>
                <td>
                  <EditButton selectedUniversity={this.props.selectedUniversity} toggleHandler={() => this.props.editToggleUniversityHandler(id)} />
                </td>
                <td>
                  <DeleteButton selectedUniversity={this.props.selectedUniversity} toggleHandler={() => this.props.deleteHandler(id)} />
                </td>
              </tr>
            </tbody>
          </table>
        </TableCell>
      </TableRow>
    );
    return row;
  }

  /**
   * Generates all TableRows of faculty list.
   * @return generated cells
   */
  generateFacultyRow = (id) => {
    var row = [];

    row.push(
      <TableRow>
        <TableCell numeric>
          {this.props.facultyData[id].id}
        </TableCell>
        <TableCell>
          {this.props.facultyData[id].name}
        </TableCell>
        <TableCell>
          {this.props.universityData[this.state.selectedUniversity].name}
        </TableCell>
        <TableCell>
          <table>
            <tbody>
              <tr>
                <td>
                  <EditButton selectedUniversity={this.props.selectedUniversity} toggleHandler={() => this.props.editToggleFacultyHandler(id)} />
                </td>
                <td>
                  <DeleteButton selectedUniversity={this.props.selectedUniversity} toggleHandler={() => this.props.deleteHandler(id)} />
                </td>
              </tr>
            </tbody>
          </table>
        </TableCell>
      </TableRow>
    );
    return row;
  }

  /**
   * Generates all TableCells of TableRow.
   * @return generated cells
   */
  generateRowCells = () => {
    var cells = [];

    if(this.state.selectedUniversity === -1) {
      for(let i = 0; i < this.props.universityData.length; i++) {
      if(typeof this.props.universityData[i].name !== "undefined" && this.props.universityData[i].name !== "" &&
          typeof this.props.universityData[i].city !== "undefined" && this.props.universityData[i].city !== "" &&
          typeof this.props.universityData[i].country !== "undefined" && this.props.universityData[i].country !== "") {
        cells.push(this.generateUniversityRow(i));
      }
      }
    }
    else {
      for(let i = 0; i < this.props.facultyData.length; i++) {
        if(this.props.facultyData[i].university === this.props.universityData[this.state.selectedUniversity].name &&
        typeof this.props.facultyData[i].name !== "undefined" && this.props.universityData[i].name !== "") {
          cells.push(this.generateFacultyRow(i));
        }
      }
    }
    return cells;
  }

  /**
   * Generates the return to university list Button.
   * @return desired button
   */
  generateReturnButton = () => {
    var button;

    if(this.state.selectedUniversity !== -1) {
      button = <ReturnButton returnCallback={() => this.handleCellClick(-1)} />;
    }

    return button;
  }

  render() {
    return(
      <div className="Table-container">
        <Table multiSelectable={false} selectable={false}>
          <TableHead>
            {this.generateHeadCells()}
          </TableHead>
          {this.generateRowCells()}
        </Table>
        {this.generateReturnButton()}
      </div>
    );
  }
}

export default ContentTable;
