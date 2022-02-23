import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useRef } from 'react';
import * as opportunitiesActions from 'store/opportunities/actions';
import { Button, Form, Modal } from 'react-bootstrap';

const OpportunityModal: React.FC = () => {
  const opportunityName = useRef<HTMLInputElement>(null);
  const type = useRef<HTMLInputElement>(null);
  const organizationName = useRef<HTMLInputElement>(null);
  const startDate = useRef<HTMLInputElement>(null);
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
        startDate: startDate.current?.value,
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
              <Form.Control
                type="string"
                placeholder="Enter type..."
                ref={type}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="string"
                placeholder="Enter date..."
                ref={startDate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
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
