import React, { FC } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { Modal, TextField, FormInputDate } from 'components/common/common';
import { useAppForm, useDispatch } from 'hooks/hooks';
import { okrValidationSchema } from 'validation-schemas/okr/okr.validation-schema';
import { OkrPayloadKey } from 'common/enums/user/okr-payload-key.enum';
import { okrActions } from 'store/okr/actions';
import { FormSelect } from 'components/common/common';
import { IOkr, OkrTypes } from 'common/interfaces/okr';
import { selectOptions } from './selectOptions';

import './styles.scss';

interface Props {
  okr?: IOkr;
  showModal: boolean;
  closeModal: () => void;
}

const OkrModal: FC<Props> = ({ okr, showModal, closeModal }) => {
  let defaultOkr = {
    name: '',
    type: OkrTypes.MY_OKR,
    startDate: '',
    endDate: '',
  } as IOkr;

  const dispatch = useDispatch();

  if (okr) {
    defaultOkr = { ...defaultOkr, ...okr };
    defaultOkr.startDate = new Date(okr.startDate);
    defaultOkr.endDate = new Date(okr.endDate);
  }

  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: defaultOkr,
    validationSchema: okrValidationSchema,
  });

  const onSubmit = (data: object): void => {
    if (okr) {
      const submitData = { ...okr, ...data } as IOkr;

      submitData.startDate = submitData.startDate.toString();
      submitData.endDate = submitData.endDate.toString();

      dispatch(okrActions.updateOkrById_async(submitData));
      return;
    }

    const submitData = { ...data } as IOkr;
    dispatch(okrActions.createOkr_async(submitData));
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
          name={OkrPayloadKey.NAME}
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
            name={OkrPayloadKey.START_DATE}
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
            name={OkrPayloadKey.END_DATE}
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
