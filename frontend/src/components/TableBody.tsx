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
      <td>{log.requestService}</td>
      <td>{log.responseService}</td>
      <td>{JSON.stringify(log.data)}</td>
      <td>{log.purpose.formatted}</td>
      <td>{new Date(log.date).toLocaleString()}</td>
    </tr>
  )
}
