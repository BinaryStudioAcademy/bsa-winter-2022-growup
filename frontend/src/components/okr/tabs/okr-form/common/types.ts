import { IOkr } from 'common/interfaces/okr';

export type OkrFormType = Omit<
  IOkr,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'type'
  | 'objectives'
  | 'status'
>;
