import { ITag } from 'common/interfaces/tag/tag';
import { ChangeEvent, useState, memo, FormEvent } from 'react';
import { Form } from 'react-bootstrap';

type PropTypes = {
  onSubmit: (tag: ITag) => void;
};

const TagForm: React.FC<PropTypes> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();

    // TODO: Remove id here
    onSubmit({
      id: new Date().toISOString(),
      name: value,
    });

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
      <button
        type="submit"
        className="btn btn-outline-gu-pink btn-hover-gu-white fw-bold fs-5 border-2"
      >
        + Add
      </button>
    </Form>
  );
};

export default memo(TagForm);
