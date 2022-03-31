import { IRelations } from '../common/interface';

interface Props {
  relationShip: IRelations;
}
const RelathionShip: React.FC<Props> = ({ relationShip }) => {
  return (
    <div className="d-flex flex-column">
      <span className="text-center fw-bold fs-4 align-self-center mb-2 mt-1">
        {relationShip.title}
      </span>
      <ul>
        {relationShip.points.map((item) => {
          return <li className="mb-2">{item}</li>;
        })}
      </ul>
    </div>
  );
};
export default RelathionShip;
