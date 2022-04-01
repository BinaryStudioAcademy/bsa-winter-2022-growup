import { ITag } from 'common/interfaces/tag/tag';
import Tag from 'components/profile/profile-main/tags/tag/tag';
import { useAppSelector, useEffect, useState } from 'hooks/hooks';
import InterestsBlock from './interests-block';

const InterestingTags: React.FC = () => {
  const tags = useAppSelector((state) => state.auth.user?.tags);
  const { userTags, isLoading } = useAppSelector((state) => state.tags);
  const [tagList, setTagList] = useState<ITag[] | undefined>([]);
  useEffect(() => {
    console.warn('a');
    setTagList(userTags && tags ? [...userTags, ...tags] : []);
  }, [isLoading]);

  return (
    <InterestsBlock>
      <div className="edit-section-content d-flex flex-wrap align-items-start">
        {tagList?.length ? (
          tagList.map((tag) => <Tag key={tag.id} tag={tag} />)
        ) : (
          <div className="group text-center">No Data</div>
        )}
      </div>
    </InterestsBlock>
  );
};

export default InterestingTags;
