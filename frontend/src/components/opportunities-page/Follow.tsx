import { Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import { IOpportunity } from 'store/opportunities/common';
import { useAppDispatch } from 'hooks/hooks';
import * as opportunitiesActions from '../../store/opportunities/actions';

interface Props extends IOpportunity {}

const Follow: React.FC<Props> = ({ isFollow, id }) => {
  const dispatch = useAppDispatch();
  const followHandler = isFollow
    ? (): void => {
        dispatch(opportunitiesActions.unSubscribeFollow(id));
      }
    : (): void => {
        dispatch(opportunitiesActions.subscribeFollow(id));
      };
  return (
    <span
      className="follow px-1 py-1 align-self-start position-relative rounded-1"
      onClick={(): void => {
        followHandler();
      }}
    >
      {isFollow ? (
        <BookmarkFill className="text-gu-blue position-absolute top-50 start-50 translate-middle" />
      ) : (
        <Bookmark className="position-absolute top-50 start-50 translate-middle" />
      )}
    </span>
  );
};

export default Follow;
