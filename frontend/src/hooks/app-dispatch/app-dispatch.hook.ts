import { AppDispatch } from 'common/types/app/app';
import { useDispatch } from 'hooks/hooks';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
