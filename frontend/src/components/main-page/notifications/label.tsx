import { ReactElement } from 'react';
import { ILabelData } from '../common/interfaces';
import { ReactComponent as OpportunityLogo } from 'assets/img/main-page/opportunity-icon.svg';
import { ReactComponent as OKRLogo } from 'assets/img/main-page/okr-icon.svg';
import { ReactComponent as ApproveSkillsLogo } from 'assets/img/main-page/approve-skill.svg';
import { NotificationTypes } from '../common/enums';

interface Props extends ILabelData {}

const Label = ({ type }: Props): ReactElement => {
  switch (type) {
    case NotificationTypes.approve_skills:
      return <ApproveSkillsLogo></ApproveSkillsLogo>;
    case NotificationTypes.okr:
      return <OKRLogo></OKRLogo>;
    case NotificationTypes.opportunities:
      return <OpportunityLogo></OpportunityLogo>;
    default:
      return <div></div>;
  }
};
export default Label;
