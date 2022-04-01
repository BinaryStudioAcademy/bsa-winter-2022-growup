import { ReactElement } from 'react';
interface Props {
  title: string;
}
const Tag: React.FC<Props> = ({ title }): ReactElement => {
  return (
    <span
      className="me-2 mb-2 opportunities__cart--tags-item
            text-gu-blue d-flex justify-content-center
            flex-column rounded-1 text-center px-1"
    >
      #{title}
    </span>
  );
};
export default Tag;
