import { Button, Modal, TextField } from 'components/common/common';
import { useAppDispatch, useAppForm, useState } from 'hooks/hooks';
import { Form } from 'react-bootstrap';
import { useFieldArray } from 'react-hook-form';
import { objectiveValidationSchema } from 'validation-schemas/validation-schemas';
import { XLg } from 'react-bootstrap-icons';
import { ObjectiveValues } from '../common/interfaces';
import { okrActions } from 'store/okr';

interface Props {
  showModal: boolean;
  closeModal: () => void;
  okrId: string;
}

const NewObjectiveModal: React.FC<Props> = ({
  showModal,
  closeModal,
  okrId,
}) => {
  const dispatch = useAppDispatch();
  const [isValidResult, setIsValidResult] = useState<boolean[]>([false]);
  const [isValidResultName, setIsValidResultName] = useState<boolean[]>([
    false,
  ]);
  const [isValidName, setIsValidName] = useState<boolean>(false);

  const { control, handleSubmit, errors } = useAppForm<ObjectiveValues>({
    defaultValues: { name: '', keyResults: [{ name: '', result: 0 }] },
    validationSchema: objectiveValidationSchema(),
  });
  const { fields, append, remove } = useFieldArray({
    name: 'keyResults',
    control,
  });

  function validResult(el: number): boolean {
    if (Math.floor(el) != el) return false;
    if (el < 0 || el > 100) return false;
    return true;
  }

  function validName(el: string): boolean {
    if (!el) return false;
    if (el.length < 2 || el.length > 30) return false;
    return true;
  }

  function valid(
    objName: string,
    keyResults: { name: string; result: number }[],
  ): boolean {
    validName(objName) ? setIsValidName(false) : setIsValidName(true);
    const isNames = [...isValidResultName];
    const isResults = [...isValidResult];
    const keyNames = keyResults.map((key) => key.name);
    const results = keyResults.map((key) => key.result);

    keyNames.forEach((name, index) => (isNames[index] = !validName(name)));
    results.forEach(
      (result, index) => (isResults[index] = !validResult(result)),
    );
    setIsValidResultName(isNames);
    setIsValidResult(isResults);

    if (isValidName) return false;
    if (isNames.some((name) => name) || isResults.some((result) => result))
      return false;
    return true;
  }

  const onSubmit = (data: ObjectiveValues): void => {
    if (valid(data.name, data.keyResults)) {
      const keyValues = data.keyResults.map((res) =>
        res.result ? res.result : 0,
      );
      const valueKey = data.keyResults.map((key, index) => {
        return {
          name: key.name,
          result: keyValues[index],
        };
      });
      const sumResult = keyValues.reduce((total, amount) => +total + +amount);
      const objectiveValues = Math.round(sumResult / data.keyResults.length);
      dispatch(
        okrActions.createObjective_async({
          okrId,
          objectiveBody: {
            name: data.name,
            result: objectiveValues,
          },
          keyResults: valueKey,
        }),
      );

      closeModal();
    }
  };
  return (
    <Modal
      show={showModal}
      onClose={closeModal}
      title={'Create New Objective'}
      buttonText={'Create Objective'}
      onSubmit={handleSubmit(onSubmit)}
      footer
      className="objective-modal"
    >
      <Form className="mw-75 objective-form">
        <TextField
          label={'Objective Title'}
          control={control}
          errors={errors}
          name="name"
        />
        {isValidName ? (
          <span className="fs-6 text-gu-pink error react-error position-relative">
            Name is required
          </span>
        ) : (
          true
        )}
        {fields.map((field, index) => {
          return (
            <Form.Group
              className="d-flex align-items-start mt-3 ms-3"
              key={index}
            >
              <div className="me-4">
                <TextField
                  label={`Key Title ${index + 1}`}
                  control={control}
                  errors={errors}
                  name={`keyResults.${index}.name`}
                />
                {isValidResultName[index] ? (
                  <span
                    className="fs-6 text-gu-pink error react-error position-relative"
                    id={`keyResults.${index}.result`}
                  >
                    Name is required
                  </span>
                ) : (
                  true
                )}
              </div>
              <div>
                <TextField
                  label={'Score 0/100'}
                  control={control}
                  errors={errors}
                  type="number"
                  name={`keyResults.${index}.result`}
                />
                {isValidResult[index] ? (
                  <span
                    className="fs-6 text-gu-pink error react-error position-relative"
                    id={`keyResults.${index}.result`}
                  >
                    Result is required
                  </span>
                ) : (
                  true
                )}
              </div>
              <Button
                onClick={(): void => remove(index)}
                className="border-0 bg-transparent text-gu-black hover-pink align-self-center mb-3"
              >
                <XLg />
              </Button>
            </Form.Group>
          );
        })}
        <Button
          onClick={(): void => {
            setIsValidResult((isValidResult): boolean[] => [
              ...isValidResult,
              false,
            ]);
            setIsValidResultName((isValidResultName): boolean[] => [
              ...isValidResultName,
              false,
            ]);
            append({ name: '', result: 0 });
          }}
          className="ms-2 border-0 bg-transparent text-gu-pink fw-bold"
        >
          + Add key result
        </Button>
      </Form>
    </Modal>
  );
};
export default NewObjectiveModal;
