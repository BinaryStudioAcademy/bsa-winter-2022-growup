import { ContentType } from 'common/enums/enums';
import { http } from 'services';
import { opportunitiesAction, OpportunityActions } from './common';
interface tagProps {
  name: string;
}
export interface OpportunitiesProps {
  id?: string;
  name?: string;
  organization?: string;
  startDate?: string;
  isFollow?: string;
  tags?: string[];
  type?: string;
}
export const loadAllOpportunities = (
  opportunitiesData: any[],
): opportunitiesAction => {
  const opportunities = opportunitiesData.map((item) => {
    const tags = item.tags.map((tag: tagProps) => tag.name);
    return {
      id: item.id,
      name: item.name,
      organization: item.organization,
      startDate: item.startDate,
      isFollow: false,
      tags: tags,
      type: item.type,
    };
  });
  return {
    type: OpportunityActions.LOAD_OPPORTUNITIES,
    payload: {
      opportunities: opportunities,
    },
  };
};

export const fetchLoadOpp = (): any => {
  return async (dispatch: any): Promise<void> => {
    const res: any[] = await http.load(
      'http://localhost:3001/company/opportunities',
      {
        method: 'GET',
        payload: null,
        contentType: ContentType.JSON,
      },
    );
    dispatch(loadAllOpportunities(res));
  };
};
export const addNewOpp = ({
  name,
  organization,
  type,
  startDate,
  id,
}: OpportunitiesProps): any => {
  const newOpp = {
    name: name,
    organization: organization,
    type: type,
    startDate: startDate,
    id: id,
    tags: [],
    isFollow: false,
  };
  return {
    type: OpportunityActions.ADD_OPPORTUNITY,
    payload: {
      newOpp: newOpp,
    },
  };
};
export const fetchNewOpp = ({
  name,
  organization,
  type,
  startDate,
}: OpportunitiesProps): any => {
  const data = {
    opportunities: [
      {
        name: name,
        organization: organization,
        type: type,
        startDate: startDate,
      },
    ],
  };
  return async (dispatch: any): Promise<void> => {
    const res: any[] = await http.post(
      'http://localhost:3001/company/opportunities',
      {
        method: 'POST',
        payload: JSON.stringify(data),
        contentType: ContentType.JSON,
      },
    );
    dispatch(addNewOpp(res[0]));
  };
};
export const closeModal = (): opportunitiesAction => {
  document.body.style.overflow = '';
  return {
    type: OpportunityActions.CLOSE_MODAL,
  };
};

export const showModal = (): opportunitiesAction => {
  document.body.style.overflow = 'hidden';
  return {
    type: OpportunityActions.SHOW_MODAL,
  };
};

export const subscribeFollow = (id?: string): opportunitiesAction => {
  return {
    type: OpportunityActions.SUBSCRIBE_FOLLOW,
    payload: {
      id: id,
    },
  };
};
export const unSubscribeFollow = (id?: string): opportunitiesAction => {
  return {
    type: OpportunityActions.UNSUBSCRIBE_FOLLOW,
    payload: {
      id: id,
    },
  };
};
