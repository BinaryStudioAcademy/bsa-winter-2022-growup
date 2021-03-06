import { ChangeEvent, memo, FormEvent } from 'react';
import { useState } from 'hooks/hooks';
import { Form } from 'react-bootstrap';
import type { UseTagList } from 'hooks/common';
import { Button } from 'components/common/common';

type PropTypes = {
  onSubmit: UseTagList['addItem'];
};

const TagForm: React.FC<PropTypes> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();

    onSubmit({ name: value });

    setValue('');
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
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
        variant="outline-gu-pink"
        className=" btn-hover-gu-white "
        type="submit"
      >
        + Add
      </Button>
    </Form>
  );
};

export default memo(TagForm);
