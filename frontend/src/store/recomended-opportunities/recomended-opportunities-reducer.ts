import { opportunitiesAction, RecomendeOpportunitiesActions } from './common';

interface recomendedOpportunitiesState {
  opportunities: any[];
  isLoaded: boolean;
}

const initialState: recomendedOpportunitiesState = {
  opportunities: [],
  isLoaded: false,
};

const recomededOpportunitiesReducer = (
  state = initialState,
  action: opportunitiesAction,
): recomendedOpportunitiesState => {
  switch (action.type) {
    case RecomendeOpportunitiesActions.LOAD_RECOMENDED_OPPORTUNITIES:
      return {
        isLoaded: true,
        opportunities: action.payload.opportunities,
      };
    default:
      return state;
  }
};

export default recomededOpportunitiesReducer;
