import { Handle, Position } from 'react-flow-renderer';
import LevelCard from '../level-card/level-card';
import './node.scss';

interface Props {
  data: {
    icon: JSX.Element;
    title: string;
    subtitle: JSX.Element | string;
  };
  sourcePosition: Position;
}

const UserNode: React.FC<Props> = ({ data, sourcePosition }) => {
  const { icon, title, subtitle } = data;

  return (
    <>
      <LevelCard icon={icon} title={title} subtitle={subtitle} />
      <Handle
        className="node__handle"
        type="source"
        position={sourcePosition}
      />
    </>
  );
};

export default UserNode;
