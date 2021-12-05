import { Table } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { dummyLogs as logs } from './dummyData';
import { TableRow } from './TableRow';

export const App = () => {

  console.log('logs', logs);

  return (
    <div className="App">
      <h1>Transparency Dashboard</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Request service</th>
            <th>Response service</th>
            <th>Data</th>
            <th>Purpose</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {logs.map(log => <TableRow log={log} />)}
        </tbody>

      </Table>

    </div>
  );
}
