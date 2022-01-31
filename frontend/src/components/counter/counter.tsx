import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch, useState } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/dom/dom';
import { RootState } from 'common/types/types';
import { counterActions } from 'store/actions';
import styles from './styles.module.scss';

const Counter: React.FC = () => {
  const { count } = useSelector(({ counter }: RootState) => ({
    count: counter.value,
  }));
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState<string>('2');

  const handleIncrementChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setIncrementAmount(evt.target.value);
  };

  const handleIncrement = (): void => {
    dispatch(counterActions.increment());
  };

  const handleDecrement = (): void => {
    dispatch(counterActions.decrement());
  };

  const handleIncrementByAmount = (): void => {
    dispatch(counterActions.incrementByAmount(Number(incrementAmount) ?? 0));
  };

  const handleIncrementAsync = (): void => {
    dispatch(counterActions.incrementAsync(Number(incrementAmount) ?? 0));
  };

  return (
    <div>
      <div className={styles.row}>
        <Button
          variant="outline-primary"
          className={styles.button}
          aria-label="Increment value"
          onClick={handleIncrement}
        >
          +
        </Button>
        <span className={styles.value}>{count}</span>
        <Button
          variant="outline-primary"
          className={styles.button}
          aria-label="Decrement value"
          onClick={handleDecrement}
        >
          -
        </Button>
      </div>
      <div className={styles.row}>
        <Form.Group className={styles.textbox}>
          <Form.Control value={incrementAmount}
            onChange={handleIncrementChange} />
        </Form.Group>
        <Button variant="outline-primary" className={styles.button} onClick={handleIncrementByAmount}>
          Add Amount
        </Button>
        <Button
          variant="outline-primary"
          className={getAllowedClasses(styles.asyncButton, styles.button)}
          onClick={handleIncrementAsync}
        >
          Add Async
        </Button>
      </div>
    </div>
  );
};

export default Counter;
