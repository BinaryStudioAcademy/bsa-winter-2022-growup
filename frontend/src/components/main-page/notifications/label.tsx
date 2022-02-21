import { ReactElement } from 'react';
import { ILabelData } from '../common/interfaces';
import { ReactComponent as OpportunityLogo } from '../icons/opportunity-icon.svg';
import { ReactComponent as OKRLogo } from '../icons/okr-icon.svg';
import { ReactComponent as ApproveSkillsLogo } from '../icons/approve-skill.svg';
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
