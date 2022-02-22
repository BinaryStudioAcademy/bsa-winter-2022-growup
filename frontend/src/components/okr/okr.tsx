import { useEffect, useAppDispatch } from 'hooks/hooks';
import { okrActions } from 'store/actions';
import ControlledTabs from './tabs/two-tabs';

const Okr: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(okrActions.getAllOkrsByUser_async());
  }, [dispatch]);

  return <ControlledTabs />;
};

export default Okr;
