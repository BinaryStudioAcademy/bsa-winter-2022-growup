import React, { FC } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { Modal, TextField, FormInputDate } from 'components/common/common';
import { useAppForm, useDispatch } from 'hooks/hooks';
import { okrValidationSchema } from 'validation-schemas/okr/okr.validation-schema';
import * as okrActions from 'store/okr/actions';
import { FormSelect } from 'components/common/common';
import { IOkr, OkrTypes } from 'common/interfaces/okr';
import { selectOptions } from './select-options';
import './styles.scss';

interface Props {
  okr?: IOkr;
  showModal: boolean;
  closeModal: () => void;
}
interface IDefaultOkr {
  name: string;
  type: OkrTypes;
  startDate: Date | string;
  endDate: Date | string;
}

const OkrModal: FC<Props> = ({ okr, showModal, closeModal }) => {
  const dispatch = useDispatch();

  let defaultOkr = {
    name: '',
    type: OkrTypes.MY_OKR,
    startDate: '',
    endDate: '',
  } as IDefaultOkr;

  if (okr) {
    const newDefaultOkr = { ...defaultOkr };

    for (const key in defaultOkr) {
      if (key in defaultOkr) {
        Object.defineProperty(newDefaultOkr, key, {
          value: okr[key as keyof IOkr],
        });
      }
    }

    newDefaultOkr.startDate = new Date(okr.startDate);
    newDefaultOkr.endDate = new Date(okr.endDate);

    defaultOkr = newDefaultOkr;
  }

  const { control, errors, handleSubmit } = useAppForm<IOkr>({
    defaultValues: defaultOkr,
    validationSchema: okrValidationSchema(okr ? true : false),
  });

  const onSubmit = (data: object): void => {
    if (okr) {
      const submitData = { ...okr, ...data } as IOkr;

      submitData.startDate = submitData.startDate.toString();
      submitData.endDate = submitData.endDate.toString();

      dispatch(okrActions.updateOkrById_async(submitData));
      closeModal();
      return;
    }

    const submitData = { ...data } as IOkr;
    dispatch(okrActions.createOkr_async(submitData));
    closeModal();
  };

  return (
    <Modal
      show={showModal}
      onClose={closeModal}
      title={okr ? 'Edit Okr' : 'Create Okr'}
      buttonText={okr ? 'Edit' : 'Save'}
      onSubmit={handleSubmit(onSubmit)}
      footer
    >
      <Form className="w-100">
        <TextField
          name="name"
          control={control}
          errors={errors}
          label={'Name'}
        />

        <FormSelect
          name="type"
          control={control}
          options={selectOptions}
          errors={errors}
        />

        <FloatingLabel
          controlId="education-university"
          label=""
          className="mb-3"
        >
          <FormInputDate
            name="startDate"
            control={control}
            errors={errors}
            placeholder="Start date"
            minDate={new Date()}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="education-university"
          label=""
          className="mb-3"
        >
          <FormInputDate
            name="endDate"
            control={control}
            errors={errors}
            placeholder="End date"
            minDate={new Date()}
          />
        </FloatingLabel>
      </Form>
    </Modal>
  );
};

export default OkrModal;
