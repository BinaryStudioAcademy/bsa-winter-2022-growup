import { ChangeEvent, memo, FormEvent } from 'react';
import { useState } from 'hooks/hooks';
import { Form } from 'react-bootstrap';

import type { UseTagList } from 'hooks/common';
import { Button } from 'components/common/common';

type Props = {
  onSubmit: UseTagList['addItem'];
};

const TagForm: React.FC<Props> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    onSubmit({ name: value });
    setValue('');
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <Form className="d-flex align-items-end gap-2" onSubmit={submitHandler}>
      <Form.Group className="flex-fill">
        <Form.Label>Tag Name</Form.Label>
        <Form.Control
          name="tagName"
          value={value}
          onChange={changeHandler}
          placeholder="Enter tag name..."
        />
      </Form.Group>
      <Button
        className="btn btn-outline-gu-pink btn-hover-gu-white fw-bold fs-5 border-2"
        type="submit"
      >
        + Add
      </Button>
    </Form>
  );
};

export default memo(TagForm);
