import { opportunitiesAction, OpportunityActions } from './common';

interface opportunitiesState {
    opportunities:any[];
    isShowModal:boolean;
}

const initialState:opportunitiesState = {
    opportunities:[
        {
            oppName:'Academy',
            programmName:'QA',
            orgName:'Group QA Team',
            startData:'February 02 2022',
            oppId:'1',
            isFollow:false,
        },
        {
            oppName:'Academy Bro',
            programmName:'QA',
            orgName:'Group QA Team',
            startData:'February 02 2022',
            oppId:'2',
            isFollow:false,
        },
        {
            oppName:'Academy Bro 2',
            programmName:'QA',
            orgName:'Group QA Team',
            startData:'February 02 2022',
            oppId:'3',
            isFollow:false,
        },
    ],
    isShowModal:false,
};

const opportunityReducer=(state=initialState,action:opportunitiesAction):opportunitiesState=>{
    switch(action.type){
        case OpportunityActions.LOAD_OPPORTUNITIES:
            return{
                isShowModal:false,
                opportunities:action.payload.opportunities,
            };
        case OpportunityActions.ADD_OPPORTUNITY:
            return{
                isShowModal:false,
                opportunities:[...state.opportunities,action.payload.newOpportunity],
            };
        case OpportunityActions.SHOW_MODAL:
            return{
                ...state,
                isShowModal:true,
            };
        case OpportunityActions.CLOSE_MODAL:
            return{
                ...state,
                isShowModal:false,
            };
        case OpportunityActions.SUBSCRIBE_FOLLOW:{
            const newOpportunities = [...state.opportunities];
            const followIndex = state.opportunities.findIndex((item)=>item.id===action.payload.id);
            const followItem = Object.assign({},newOpportunities.splice(followIndex,1)[0]);
            followItem.isFollow = true;
            newOpportunities.unshift(followItem);

            return{
                    ...state,
                    opportunities:newOpportunities,
                };
        }
        case OpportunityActions.UNSUBSCRIBE_FOLLOW:{
            const newOpportunities = [...state.opportunities];
            const followIndex = state.opportunities.findIndex((item)=>item.id===action.payload.id);
            const followItem = Object.assign({},newOpportunities.splice(followIndex,1)[0]);
            followItem.isFollow = false;
            newOpportunities.push(followItem);
            return{
                ...state,
                opportunities:newOpportunities,
            };
        }
        default:
            return state;
    }
};

export default opportunityReducer;
