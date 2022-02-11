import { ITag } from 'common/interfaces/tag/tag';

export type TagCreation = Pick<ITag, 'name'>;

// Tag fields that will be shown
export type TagVisibleInfo = Pick<ITag, 'id' | 'name'>;
