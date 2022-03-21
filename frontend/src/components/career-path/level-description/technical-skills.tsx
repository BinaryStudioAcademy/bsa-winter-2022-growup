import { v4 as uuidv4 } from 'uuid';
import { Col, Row } from 'react-bootstrap';
import Topic from './topic';

interface ITechnicalSkill {
  skill: string;
  topics: (string | { required: string })[];
}

interface Props {
  skills: ITechnicalSkill[];
}

const TechnicalSkills: React.FC<Props> = ({ skills }) => (
  <>
    {skills.map(({ skill, topics }) => (
      <Row key={uuidv4()} className="mb-3">
        <Col lg={3} className="fw-bold me-3">
          {skill}
        </Col>
        <Col>
          {topics.map((topic) =>
            typeof topic === 'string' ? (
              <Topic key={uuidv4()} name={topic} required={false} />
            ) : (
              <Topic key={uuidv4()} name={topic.required} required={true} />
            ),
          )}
        </Col>
      </Row>
    ))}
  </>
);

export default TechnicalSkills;
