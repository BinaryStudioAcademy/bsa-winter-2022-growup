import { State } from '../opportunities/common';

export interface HomePageState extends State {
  notifications?: INotifications[];
}

export interface INotifications {
  title: string;
  type: string;
}

export enum NotificationTypes {
  approve_skills = 'notification__type--approve-skills ',
  opportunities = 'notification__type--opportunities bg-gu-purple',
  okr = 'notification__type--okr bg-gu-pink',
}
