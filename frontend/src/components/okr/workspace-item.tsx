import './styles.scss';
import { parseDate } from 'helpers/parse-date';
import { Calendar, PencilFill } from 'react-bootstrap-icons';

interface PropTypes {
  name: string;
  startDate: string;
  endDate: string;
  objectivesCounter: number;
  resultsCounter: number;
}

const OrkItem: React.FC<PropTypes> = (props) => (
  <div className="okr-container bg-white ms-3 mb-3 py-2 px-3">
    <div className="OKR-name fs-2 mt-2 fw-bold">{props.name}</div>
    <div className="reached fs-5 fw-bold align-bottom text-end">0.85</div>
    <div className="objectives fs-6 mb-4 fw-bold">
      Objectives: {props.objectivesCounter},
    </div>
    <div className="key-result fs-6 fw-bold">
      KeyResults: {props.resultsCounter}
    </div>
    <div className="timestamp fs-6 mt-3 d-flex justify-content-evenly text-secondary">
      <div>
        <Calendar className="mb-1" />
      </div>
      <div>
        {parseDate(props.startDate)} - {parseDate(props.endDate)}
      </div>
      <div>
        <PencilFill className="mb-1 ms-1 text-gu-purple" />
      </div>
    </div>
  </div>
);

export default OrkItem;
