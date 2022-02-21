import { useEffect, useAppDispatch } from 'hooks/hooks';
import { okrActions } from 'store/actions';
import ControlledTabs from './tabs/two-tabs';

const Ork: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(okrActions.getAllOkrs_async());
  }, [dispatch]);

  return <ControlledTabs />;
};

export default Ork;
