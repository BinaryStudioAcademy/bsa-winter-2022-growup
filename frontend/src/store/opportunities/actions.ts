import { ContentType } from 'common/enums/enums';
import { http } from 'services';
import { opportunitiesAction, OpportunityActions } from './common';
interface tagProps{
    name:string;
}

export const loadAllOpportunities=(opportunitiesData:any[]):opportunitiesAction=>{
    const opportunities = opportunitiesData.map((item)=>{
        return {
            id:item.id,
            name:item.name,
            organization:item.organization,
            startDate:item.startDate,
            isFollow:false,
            tags:item.tags.map((tag:tagProps)=>tag.name),
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
        const res:any[] = await http.load('http://localhost:3001/company/opportunities', {
            method: 'GET',
            payload: null,
            contentType: ContentType.JSON,
        });
        dispatch(loadAllOpportunities(res));

    };
};

export const closeModal = (): opportunitiesAction => {
    return {
        type: OpportunityActions.CLOSE_MODAL,
    };
};

export const showModal = (): opportunitiesAction => {
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
