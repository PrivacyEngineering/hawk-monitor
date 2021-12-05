import { Table } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { dummyLogs as logs } from '../dummyData';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

export const App = () => {

  console.log('logs', logs);

  return (
    <div className="App">
      <h1>Transparency Dashboard</h1>

      <Table striped bordered hover>
        <TableHeader />
        <TableBody logs={logs} />
      </Table>

    </div>
  );
}
