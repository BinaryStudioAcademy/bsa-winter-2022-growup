import { ReactElement } from 'react';
import { IOpportunity } from 'store/opportunities/common';
import dayjs from 'dayjs';

import Tag from './tag';

interface Props extends IOpportunity {
  isOpportunitiesPage?: boolean;
}

const OpportunityItem: React.FC<Props> = ({
  isOpportunitiesPage,
  name,
  organization,
  startDate,
  tagsData,
  type,
  tags,
}): ReactElement => {
  const tagsList = tagsData ? tagsData : tags;
  const tagsComponents = tagsList?.map((tag, index: number) => {
    if (typeof tag !== 'string') return <Tag title={tag.name} key={index} />;
    return <Tag title={tag} key={index} />;
  });
  return (
    <div
      className={` d-flex ${
        isOpportunitiesPage
          ? 'flex-column flex-grow-1'
          : 'mt-3 px-3 py-3 flex-wrap rounded-1 shadow-lg border border-1 bg-gu-white justify-content-between opportunities__cart'
      }`}
    >
      <div className="opportunities__cart--text d-flex flex-column flex-shrink-1 flex-grow-1 fs-7 me-3 overflow-hidden">
        <span className="opportunities__cart--text-item fw-bold fs-5 mb-2 overflow-hidden">
          {name}
        </span>
        <span className="opportunities__cart--text-item mb-1 overflow-hidden">
          <span className="opportunities__type">Org:</span> {organization}{' '}
        </span>
        <span className="opportunities__cart--text-item mb-1 overflow-hidden">
          <span className="opportunities__type">Start:</span>{' '}
          {dayjs(startDate).format('DD/MM/YYYY')}{' '}
        </span>
        <span className="opportunities__cart--text-item mb-1 overflow-hidden">
          <span className="opportunities__type">Type:</span> {type}{' '}
        </span>
      </div>
      <div
        className={`d-flex fs-7 flex-shrink-0 ${
          isOpportunitiesPage ? 'mt-1 ' : 'align-self-end'
        } opacity-75`}
      >
        {tagsComponents?.length ? [...tagsComponents] : <Tag title={'Tag1'} />}
      </div>
    </div>
  );
};

export default OpportunityItem;
