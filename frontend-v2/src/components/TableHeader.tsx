interface Props {
  labels: string[];
}

export const TableHeader = (props: Props) => {
  const { labels } = props;
  return (
    <thead>
      <tr>
        {labels.map((label, index) => <th key={index}>{label}</th>)}
      </tr>
    </thead>
  )
}
