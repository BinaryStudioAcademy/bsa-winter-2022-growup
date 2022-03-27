import { IKeyResult } from 'common/interfaces/key-result';

interface Props extends IKeyResult {}

const KeyResult: React.FC<Props> = ({ name }) => {
  return <div>{name}</div>;
};
export default KeyResult;
