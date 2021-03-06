import React from "react";
import PropTypes from "prop-types";
// import { Table } from "react-bootstrap";
import Table from "grommet/components/Table";
import TableRow from "grommet/components/TableRow";

export default class LogsTableView extends React.Component {
  parseDate = date => new Date(date).toUTCString();

  render() {
    const { logs } = this.props;

    return (
      <Table selectable>
        <thead>
          <tr>
            <th className="text-center">Time</th>
            <th className="text-center">Host</th>
            <th className="text-center">Process</th>
            <th className="text-center">Severity</th>
            <th className="text-center">Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, key) => (
            <TableRow key={key}>
              <td className="text-center">{this.parseDate(log.logged_time)}</td>
              <td className="text-center">{log.host}</td>
              <td className="text-center">{log.process}</td>
              <td className="text-center">{log.severity}</td>
              <td className="text-center">{log.message}</td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    );
  }
}

LogsTableView.propTypes = {
  logs: PropTypes.array.isRequired
};
