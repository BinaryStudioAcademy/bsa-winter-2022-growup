import { useAppDispatch } from 'hooks/hooks';
import { useRef } from 'react';
import { X } from 'react-bootstrap-icons';
import { closeModal } from 'store/opportunities/actions';

const OpportunityModal: React.FC = () => {
  const opportunityName = useRef<HTMLInputElement>(null);
  const programmName = useRef<HTMLInputElement>(null);
  const organizationName = useRef<HTMLInputElement>(null);
  const startDate = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  return (
    <div className="opportunity-modal-wrapper position-absolute top-0 start-0 w-100 h-100">
      <div
        className="opportunity-modal position-relative top-50 start-50
        translate-middle bg-gu-white d-flex flex-column rounded-3"
      >
        <span
          className="bg-gu-blue text-gu-white fs-5
            py-2 ps-3 rounded-top mb-3"
        >
          Add New Opportunity
        </span>
        <span
          className="opportunity-modal__close-btn position-absolute text-gu-white top-0"
          onClick={(): void => {
            dispatch(closeModal());
          }}
        >
          <X />
        </span>
        <div className="d-flex flex-column ps-3 pe-3 ">
          <label
            htmlFor="name-of-opportunity"
            className="d-flex flex-column mb-4 "
          >
            <span className="fs-6 mb-1 fw-bold">Opportunity Name</span>
            <input
              ref={opportunityName}
              className="opportunity-modal--item  fs-6 p-0 pb-1 bg-gu-white border-0"
              type="text"
              id="name-of-opportunity"
              placeholder="Name of Opportunity..."
            />
          </label>

          <label htmlFor="programm-name" className="d-flex flex-column mb-4">
            <span className="fs-6 mb-1 fw-bold">Programm Name</span>
            <input
              ref={programmName}
              className="opportunity-modal--item  fs-6 pb-1 bg-gu-white border-0"
              type="text"
              id="programm-name"
              placeholder="Programm Name..."
            />
          </label>
          <label htmlFor="org-name" className="d-flex flex-column mb-4">
            <span className="fs-6 mb-1 fw-bold">Organization Name</span>
            <input
              ref={organizationName}
              className="opportunity-modal--item  fs-6 pb-1 bg-gu-white border-0"
              type="text"
              id="org-name"
              placeholder="Organisation Name..."
            />
          </label>
          <label htmlFor="start-at" className="d-flex flex-column mb-4">
            <span className="fs-6 mb-1 fw-bold">Start Date</span>
            <input
              ref={startDate}
              className="opportunity-modal--item  fs-6 pb-1 bg-gu-white border-0"
              type="text"
              id="start-at"
              placeholder="Start at..."
            />
          </label>
        </div>
        <div className="btn btn-gu-blue align-self-center mb-2">Submit</div>
      </div>
    </div>
  );
};

export default OpportunityModal;
