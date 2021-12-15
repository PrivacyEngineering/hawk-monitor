import { RequestsTable } from "./RequestsTable"

export const RequestsPage = () => {
  return (
    <>
      <h2>All requests</h2>
      <p><b>Requests</b> allow you to search for specific requests using parameters collected by the transparency service.</p>
      <p>(filters to be implemented)</p>
      <RequestsTable />
    </>
  )
}