import { Button, Modal, TextField } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import { Form } from 'react-bootstrap';
import { useFieldArray } from 'react-hook-form';
import { objectiveValidationSchema } from 'validation-schemas/validation-schemas';
import { XLg } from 'react-bootstrap-icons';
import { ObjectiveValues } from '../common/interfaces';

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
  const { control, handleSubmit, errors } = useAppForm<ObjectiveValues>({
    defaultValues: { name: '', keyResults: [{ keyResultname: '', score: 0 }] },
    validationSchema: objectiveValidationSchema(),
  });
  const { fields, append, remove } = useFieldArray({
    name: 'keyResults',
    control,
  });

  const onSubmit = (objectiveBody: ObjectiveValues): void => {
    console.warn(objectiveBody);
    console.warn(okrId);
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
            <Form.Group className="d-flex align-items-center mt-3 ms-3">
              <div className="me-3">
                <TextField
                  label={`Key Title ${index + 1}`}
                  control={control}
                  errors={errors}
                  name={`keyResults.${index}.keyResultname`}
                />
              </div>
              <TextField
                label={'Score 0/1'}
                control={control}
                errors={errors}
                type="number"
                name={`keyResults.${index}.score`}
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
          onClick={(): void => append({ keyResultname: '', score: 0 })}
          className="ms-2 border-0 bg-transparent text-gu-pink fw-bold "
        >
          +add key result
        </Button>
      </Form>
    </Modal>
  );
};
export default NewObjectiveModal;
