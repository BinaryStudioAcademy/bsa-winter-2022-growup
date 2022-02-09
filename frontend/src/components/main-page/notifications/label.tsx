import { ReactElement } from 'react';
import ILabelData from '../interfaces/ILabaleData';
import { ReactComponent as OpportunityLogo } from '../icons/opportunityIcon.svg';
import { ReactComponent as OKRLogo } from '../icons/okrIcon.svg';
import { ReactComponent as ApproveSkillsLogo } from '../icons/approveSkills.svg';
import { NotificationTypes } from '../enums/NotificationTypes';

const Label = ( { type } :ILabelData):ReactElement=>{
    switch(type){
        case NotificationTypes.approve_skills:
            return(<ApproveSkillsLogo></ApproveSkillsLogo>);
        case NotificationTypes.okr:
            return(<OKRLogo></OKRLogo>);
        case NotificationTypes.opportunities:
            return(<OpportunityLogo></OpportunityLogo>);
        default:
            return(<div></div>);
    }
};
export default Label;
