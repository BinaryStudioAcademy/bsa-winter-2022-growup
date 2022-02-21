import { useAppDispatch } from 'hooks/hooks';
import { useRef } from 'react';
import { X } from 'react-bootstrap-icons';
import * as opportunitiesActions from 'store/opportunities/actions';

const OpportunityModal: React.FC = () => {
  const opportunityName = useRef<HTMLInputElement>(null);
  const type = useRef<HTMLInputElement>(null);
  const organizationName = useRef<HTMLInputElement>(null);
  const startDate = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  return (
    <div className="opportunity-modal-wrapper position-absolute top-0 start-0 end-0 bottom-0 w-100">
      <div
        className="opportunity-modal position-relative top-50 start-50
        translate-middle bg-gu-white d-flex flex-column rounded-3"
      >
        <span
          className="bg-gu-blue text-gu-white fs-5
            py-3 ps-3 rounded-top mb-3"
        >
          Add New Opportunity
        </span>
        <span
          className="opportunity-modal__close-btn position-absolute text-gu-white top-0"
          onClick={(): void => {
            dispatch(opportunitiesActions.closeModal());
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
              className="opportunity-modal--item  fs-6 p-0 pb-1 bg-gu-white "
              type="text"
              id="name-of-opportunity"
              placeholder="name of opportunity..."
            />
          </label>

          <label htmlFor="type" className="d-flex flex-column mb-4">
            <span className="fs-6 mb-1 fw-bold">Type</span>
            <input
              ref={type}
              className="opportunity-modal--item  fs-6 pb-1 bg-gu-white "
              type="text"
              id="type"
              placeholder="type..."
            />
          </label>
          <label htmlFor="org-name" className="d-flex flex-column mb-4">
            <span className="fs-6 mb-1 fw-bold">Organization Name</span>
            <input
              ref={organizationName}
              className="opportunity-modal--item  fs-6 pb-1 bg-gu-white "
              type="text"
              id="org-name"
              placeholder="organisation name..."
            />
          </label>
          <label htmlFor="start-at" className="d-flex flex-column mb-4">
            <span className="fs-6 mb-1 fw-bold">Start Date</span>
            <input
              ref={startDate}
              className="opportunity-modal--item  fs-6 pb-1 bg-gu-white "
              type="text"
              id="start-at"
              placeholder="start at..."
            />
          </label>
        </div>
        <div
          className="btn btn-gu-blue align-self-center mb-2"
          onClick={(): void => {
            dispatch(
              opportunitiesActions.fetchNewOpp({
                name: opportunityName.current?.value,
                type: type.current?.value,
                organization: organizationName.current?.value,
                startDate: startDate.current?.value,
              }),
            );
          }}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;
