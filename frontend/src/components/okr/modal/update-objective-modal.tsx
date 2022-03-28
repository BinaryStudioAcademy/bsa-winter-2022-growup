import { Button, Modal, TextField } from 'components/common/common';
import { useAppDispatch, useAppForm, useAppSelector } from 'hooks/hooks';
import { Form } from 'react-bootstrap';
import { useFieldArray } from 'react-hook-form';
import { objectiveValidationSchema } from 'validation-schemas/validation-schemas';
import { XLg } from 'react-bootstrap-icons';
import { ObjectiveValues } from '../common/interfaces';
import { okrActions } from 'store/okr';
import { RootState } from 'common/types/types';
import { IObjective } from 'common/interfaces/objective';
import { IKeyResult } from 'common/interfaces/key-result';

interface Props {
  showModal: boolean;
  closeModal: () => void;
  okrId: string;
  objectiveId: string;
}

const UpdateObjectiveModal: React.FC<Props> = ({
  showModal,
  closeModal,
  okrId,
  objectiveId,
}) => {
  const dispatch = useAppDispatch();

  const { okrs } = useAppSelector((state: RootState) => state.okr);
  const okr = okrs.find((okr) => okr.id === okrId);
  const objectives = okr?.objectives as IObjective[];
  const objective = objectives.find(
    (objective) => objective.id === objectiveId,
  );
  const name = objective ? objective.name : '';
  const keyResults = objective ? (objective?.keyResults as IKeyResult[]) : [];

  const updateData = keyResults.map((key) => {
    return { name: key.name, result: key.result };
  });

  const { control, handleSubmit, errors } = useAppForm<ObjectiveValues>({
    defaultValues: {
      name: name,
      keyResults: updateData,
    },
    validationSchema: objectiveValidationSchema(),
  });
  const { fields, append, remove } = useFieldArray({
    name: 'keyResults',
    control,
  });

  const onSubmit = (data: ObjectiveValues): void => {
    const keyValues = data.keyResults.map((res) => res.result);
    const sumResult = keyValues.reduce((total, amount) => +total + +amount);
    const objectiveValues = Math.round(sumResult / data.keyResults.length);
    dispatch(
      okrActions.updateObjective_async({
        okrId,
        objectiveId,
        objectiveBody: {
          name: data.name,
          result: objectiveValues,
        },
        keyResults: data.keyResults,
      }),
    );
    closeModal();
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
        {fields.map((field, index) => {
          return (
            <Form.Group
              className="d-flex align-items-center mt-3 ms-3"
              key={index}
            >
              <div className="me-4">
                <TextField
                  label={`Key Title ${index + 1}`}
                  control={control}
                  errors={errors}
                  name={`keyResults.${index}.name`}
                />
              </div>
              <TextField
                label={'Score 0/1'}
                control={control}
                errors={errors}
                type="number"
                name={`keyResults.${index}.result`}
              />
              <Button
                onClick={(): void => remove(index)}
                className="border-0 bg-transparent text-gu-black hover-pink"
              >
                <XLg />
              </Button>
            </Form.Group>
          );
        })}
        <Button
          onClick={(): void => append({ name: '', result: 0 })}
          className="ms-2 border-0 bg-transparent text-gu-pink fw-bold"
        >
          + Add key result
        </Button>
      </Form>
    </Modal>
  );
};
export default UpdateObjectiveModal;
