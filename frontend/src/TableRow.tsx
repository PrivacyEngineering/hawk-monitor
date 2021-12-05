import { Log } from './types';

interface Props {
  log: Log;
}

export const TableRow = (props: Props) => {
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
