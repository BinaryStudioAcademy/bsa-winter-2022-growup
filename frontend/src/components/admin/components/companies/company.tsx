import { Card, Button } from 'react-bootstrap';
import type { ICompany } from 'common/interfaces/company/company';

type PropTypes = {
  companyList: ICompany[];
};

const Company: React.FC<PropTypes> = ({ companyList }) => {
  return (
    <Card className="growup-card-primary">
      <Card.Header className="d-flex justify-content-end growup-card-header">
        <Button variant="growup-outline-white">+ Add Company</Button>
      </Card.Header>
      <Card.Body>
        {companyList.length ? (
          companyList.map((company) => <p>{company.name}</p>)
        ) : (
          <p className="m-0 text-center">No companies here...</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default Company;
