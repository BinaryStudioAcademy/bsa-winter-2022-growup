import { ContentType } from 'common/enums/enums';
import { http } from 'services';
import { opportunitiesAction, RecomendeOpportunitiesActions } from './common';
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
export const loadAllRecomendedOpportunities = (
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
    type: RecomendeOpportunitiesActions.LOAD_RECOMENDED_OPPORTUNITIES,
    payload: {
      opportunities: opportunities,
    },
  };
};

export const fetchRecomendedOpp = (): any => {
  return async (dispatch: any): Promise<void> => {
    const res: any[] = await http.load(
      'http://localhost:3001/company/opportunities',
      {
        method: 'GET',
        payload: null,
        contentType: ContentType.JSON,
      },
    );
    dispatch(loadAllRecomendedOpportunities(res));
  };
};
