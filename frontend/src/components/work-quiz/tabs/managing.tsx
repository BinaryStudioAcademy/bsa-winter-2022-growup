import { IManaging } from '../common/interface';

interface Props {
  managing: IManaging;
}
const Managing: React.FC<Props> = ({ managing }) => {
  return (
    <div>
      <ul>
        <li className="mb-2">
          <span className="fw-bold">Motivate: </span>
          {managing.Motivate}
        </li>
        <li className="mb-2">
          <span className="fw-bold"> Correct: </span>
          {managing.Correct}
        </li>
        <li className="mb-2">
          <span className="fw-bold">Compliment: </span>
          {managing.Compliment}
        </li>
        <li className="mb-2">
          <span className="fw-bold">Delegate: </span> {managing.Delegate}
        </li>
        <li className="mb-2">
          <span className="fw-bold">Counsel: </span> {managing.Counsel}
        </li>
      </ul>
    </div>
  );
};
export default Managing;
