export interface IAddNewOpportunity {
    name?:string;
    organization?:string;
    startData?:string;
    isFollow?:boolean;
    id?:string;
    tags?:any[];
}

export enum OpportunityActions {
    ADD_OPPORTUNITY = 'ADD_OPPORTUNITY',
    SHOW_MODAL = 'SHOW_MODAL',
    CLOSE_MODAL = 'CLOSE_MODAL',
    SUBSCRIBE_FOLLOW = 'SUBSCRIBE_FOLLOW',
    UNSUBSCRIBE_FOLLOW = 'UNSUBSCRIBE_FOLLOW',
    LOAD_OPPORTUNITIES = 'LOAD_OPPORTUNITIES',
}

export interface opportunitiesAction {
    type:string;
    payload?:any;
}
