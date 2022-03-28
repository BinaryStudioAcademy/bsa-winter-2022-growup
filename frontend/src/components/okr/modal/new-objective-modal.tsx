import { Button, Modal, TextField } from 'components/common/common';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
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

  const { control, handleSubmit, errors } = useAppForm<ObjectiveValues>({
    defaultValues: { name: '', keyResults: [{ keyResultname: '', score: 0 }] },
    validationSchema: objectiveValidationSchema(),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'keyResults',
    control,
  });

  const onSubmit = (data: ObjectiveValues): void => {
    dispatch(
      okrActions.createObjective_async({
        okrId,
        objectiveBody: {
          name: data.name,
          result: 0,
        },
      }),
    );
    console.warn(data);
    closeModal();
  };
  return (
    <Modal
      show={showModal}
      onClose={closeModal}
      title={'Create New Objective'}
      buttonText={'Save'}
      onSubmit={handleSubmit(onSubmit)}
      footer
    >
      <Form className="w-100">
        <TextField
          label={'Objective Name'}
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
                  label={'Key Name'}
                  control={control}
                  errors={errors}
                  name={`keyResults.${index}.keyResultname`}
                />
              </div>
              <TextField
                label={'Score'}
                control={control}
                errors={errors}
                type="number"
                name={`keyResults.${index}.score`}
              />
              <Button
                onClick={(): void => remove(index)}
                className="border-0 bg-transparent text-gu-black"
              >
                <XLg />
              </Button>
            </Form.Group>
          );
        })}
        <Button
          onClick={(): void => append({ keyResultname: '', score: 0 })}
          className="ms-2 border-0 bg-transparent text-gu-pink fw-bold"
        >
          + Add key result
        </Button>
      </Form>
    </Modal>
  );
};
export default NewObjectiveModal;
