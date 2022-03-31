import { CheckCircleFill } from 'react-bootstrap-icons';
import './topic.scss';

interface Props {
  name: string;
  required: boolean;
}

const Topic: React.FC<Props> = ({ name, required }) => (
  <>
    {required ? (
      <label className="required-topic text-gu-pink mb-1">{name}</label>
    ) : (
      <label className="topic text-gu-purple mb-1">
        {name} <CheckCircleFill className="topic__icon text-gu-blue" />
      </label>
    )}
  </>
);

export default Topic;
