import { IOkr } from '../common/interfaces';
import OrkItem from '../workspace-item';

interface Props {
  collection: IOkr[];
}

const OkrList: React.FC<Props> = (props) => (
  <div className="OKR-page d-flex flex-row flex-wrap">
    {props.collection.map((okr: IOkr) => {
      const collection = okr.objective;
      const objectivesCounter = collection.length;
      const resultsCounter = okr.keyResult.length;
      return (
        <OrkItem
          key={okr.id}
          name={okr.name}
          endDate={okr.endDate}
          startDate={okr.startDate}
          objectivesCounter={objectivesCounter}
          resultsCounter={resultsCounter}
        />
      );
    })}
  </div>
);

export default OkrList;
