import { RootState } from 'common/types/types';
import { useSelector } from 'hooks/hooks';
import { TypedUseSelectorHook } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
