import { ILevel } from 'common/interfaces/career-path';
import ListItem from '../list-item/list-item';
import './styles.scss';

interface Props {
  levels: ILevel[];
  type?: 'checkbox' | 'radio';
  onItemClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// This component appears after selecting domain.
// It can be one or multiple select of levels and according to this user
// will see radiobuttons or checkboxes
const LevelsList: React.FC<Props> = ({
  levels,
  type = 'checkbox',
  onItemClick,
}) => {
  return (
    <>
      {levels.map((level) => (
        <div key={level.id} className="domain-levels">
          <ListItem
            type={type}
            name="current-domain"
            onClick={onItemClick}
            value={level.name}
          />
        </div>
      ))}
    </>
  );
};

export default LevelsList;
