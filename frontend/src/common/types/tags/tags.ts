import { ITag } from 'common/interfaces/tag/tag';

export type TagCreation = Pick<ITag, 'id' | 'name'>;

// Tag fields that will be shown
export type TagVisibleInfo = Pick<ITag, 'id' | 'name'>;
