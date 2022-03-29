import { IOkr } from 'common/interfaces/okr';
import OrkItem from '../workspace-item';
import './styles.scss';

interface Props {
  collection: IOkr[];
}

const OkrList: React.FC<Props> = ({ collection }) => (
  <>
    <div className="OKR-page d-flex flex-row flex-wrap">
      {collection.map((okr: IOkr) => {
        const objectives = okr.objectives;
        let objectivesCounter = 0;
        let resultsCounter = 0;

        if (objectives) {
          objectivesCounter += objectives.length;
          resultsCounter = objectives.reduce((acc, objective) => {
            if (objective.keyResults) {
              acc += objective.keyResults.length;
            }
            return acc;
          }, 0);
        }
        return (
          <OrkItem
            key={okr.id}
            okr={okr}
            objectivesCounter={objectivesCounter}
            resultsCounter={resultsCounter}
          />
        );
      })}
    </div>
  </>
);

export default OkrList;
