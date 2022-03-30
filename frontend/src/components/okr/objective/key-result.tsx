interface Props {
  name: string;
  result?: number;
}

const KeyResult: React.FC<Props> = ({ name, result }) => {
  return (
    <div className="objective-main p-3 d-flex  mt-3 rounded align-items-center">
      <span className="d-inline-block me-auto">{name}</span>
      <div className="d-flex align-items-center">
        <span className="fw-bold fs-4">
          {result ? (result / 100).toFixed(2) : 0.0}
        </span>
      </div>
    </div>
  );
};
export default KeyResult;
