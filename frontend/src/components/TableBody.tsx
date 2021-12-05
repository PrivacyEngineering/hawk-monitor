import { Log } from "../types";

interface TableBodyProps {
  logs: readonly Log[];
}

export const TableBody = (props: TableBodyProps) => {
  const { logs } = props;

  return (
    <tbody>{logs.map(log => <TableRow log={log} />)}</tbody>
  )
}

interface TableRowProps {
  log: Log;
}

const TableRow = (props: TableRowProps) => {
  const { log } = props;

  return (
    <tr>
      <td>{new Date(log.date).toLocaleString()}</td>
      <td>{log.requestService}</td>
      <td>{log.responseService}</td>
      <td>{log.data.entity}</td>
      <td>{JSON.stringify(log.data.identity)}</td>
      <td>{log.data.properties.join(', ')}</td>
      <td>{log.purpose.type}</td>
      <td>{log.purpose.id || '-'}</td>
      <td>{log.purpose.formatted}</td>
    </tr>
  )
}
