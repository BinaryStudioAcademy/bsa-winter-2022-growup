import '../../styles.scss';

interface PropTypes {
    name: string
    startDate: string
    endDate: string
    NumOfObjectives: number
    NumOfKeyResults: number
}

const OrkItem: React.FC<PropTypes> = (props) => (
<div className="okr-container bg-white">
    <div className="OKR-name fs-2">
      {props.name}
    </div>
    <div className="reached fs-5">
      0.85
    </div>
    <div className="objectives fs-6">
      Objectives: {props.NumOfObjectives},
    </div>
    <div className="key-result fs-6">
      KeyResults: {props.NumOfKeyResults}
    </div>
    <div className="timestamp fs-6">
        {props.startDate} - {props.endDate}
    </div>
</div>
);

export default OrkItem;
