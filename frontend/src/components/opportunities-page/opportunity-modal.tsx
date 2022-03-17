import DatePicker from 'react-datepicker';
import { useAppDispatch, useAppSelector, useState } from 'hooks/hooks';
import { useRef } from 'react';

import * as opportunitiesActions from 'store/opportunities/actions';
import { Button, Form, Modal } from 'react-bootstrap';

import './styles.scss';
import 'react-datepicker/dist/react-datepicker.css';

const OpportunityModal: React.FC = () => {
  const opportunityName = useRef<HTMLInputElement>(null);
  const type = useRef<HTMLInputElement>(null);
  const organizationName = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState(new Date());

  const dispatch = useAppDispatch();
  const isShowModal = useAppSelector(
    (state) => state.opportunities.isShowModal,
  );

  const hideModal = (): void => {
    dispatch(opportunitiesActions.closeModal());
  };
  const sendData = (): void => {
    dispatch(
      opportunitiesActions.fetchNewOpp({
        name: opportunityName.current?.value,
        type: type.current?.value,
        organization: organizationName.current?.value,
        startDate: startDate.toString(),
      }),
    );
  };
  return (
    <>
      <Modal show={isShowModal} onHide={hideModal}>
        <Modal.Header
          closeButton
          className="bg-gu-blue text-gu-white modal-header"
        >
          <Modal.Title>Add New Opportunity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Opportunity Name</Form.Label>
              <Form.Control
                type="string"
                placeholder="Enter name..."
                ref={opportunityName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="string"
                placeholder="Enter name..."
                ref={organizationName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Type of Opportunity</Form.Label>
              <Form.Select className="opportunity_type">
                <option disabled>Chose opportunity type</option>
                <option value="Project/Lecture">Project/Lecture</option>
                <option value="Lectury/HomeWork">Lectury/HomeWork</option>
                <option value="Lecture">Lecture</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                isClearable
                selected={startDate}
                customInput={
                  <Form.Control
                    type="string"
                    placeholder="Chose date..."
                    ref={organizationName}
                  />
                }
                withPortal
                portalId="root-portal"
                placeholderText="Choose a date"
                dateFormat="MMMM d, yyyy"
                onChange={(date: Date): void => setStartDate(date)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="w-100">
          <Button onClick={hideModal} variant="secondary">
            Close
          </Button>
          <Button onClick={sendData} className="btn-gu-pink">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OpportunityModal;
