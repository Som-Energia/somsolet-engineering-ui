const DummyRender = ({ data }) => (
  <ul>
    {Object.keys(data || {}).map((key) => (
      <p key={key}>
        <strong>{key}</strong>: {data[key]}
      </p>
    ))}
  </ul>
);

export default DummyRender;
