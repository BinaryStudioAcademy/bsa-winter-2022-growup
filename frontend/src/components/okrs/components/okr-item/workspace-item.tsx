import '../../styles.scss';
import calendar from 'assets/img/okr-items/calendar-orange.png';
import pencil from 'assets/img/okr-items/pencil.png';

interface PropTypes {
    name: string
    startDate: string
    endDate: string
    NumOfObjectives: number
    NumOfKeyResults: number
}

const OrkItem: React.FC<PropTypes> = (props) => (
<div className="okr-container bg-white">
    <div className="OKR-name fs-2 mt-2 fw-bold">
      {props.name}
    </div>
    <div className="reached fs-5 fw-bold">
      0.85
    </div>
    <div className="objectives fs-6 mb-4 fw-bold">
      Objectives: {props.NumOfObjectives},
    </div>
    <div className="key-result fs-6 fw-bold">
      KeyResults: {props.NumOfKeyResults}
    </div>
    <div className="timestamp fs-6 mt-3 d-flex justify-content-evenly">
      <div>
        <img alt="calendar" src={calendar} width="12" className="mb-1"/>
      </div>
      <div>{props.startDate} - {props.endDate}</div>
      <div>
        <img alt="pencil" src={pencil} width="12" className="mb-1"/>
      </div>
    </div>
</div>
);

export default OrkItem;
