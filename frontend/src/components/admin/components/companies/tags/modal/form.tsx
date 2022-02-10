import { ChangeEvent, useState } from 'react';
import { Form } from 'react-bootstrap';

const TagForm: React.FC = () => {
  const [value, setValue] = useState('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <Form className="d-flex align-items-end gap-2">
      <Form.Group className="flex-fill">
        <Form.Label>Tag Name</Form.Label>
        <Form.Control
          name="tagName"
          value={value}
          onChange={changeHandler}
          placeholder="Enter tag name..."
        />
      </Form.Group>
      <button className="btn btn-gu-purple">+ Add</button>
    </Form>
  );
};

export default TagForm;
