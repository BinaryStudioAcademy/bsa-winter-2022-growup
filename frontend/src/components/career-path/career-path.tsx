import Level from './level/level';

const CareerPath: React.FC = () => {
  return (
    <div>
      <Level
        acquiredSkills={33}
        totalSkills={35}
        level={1}
        progressColor={'green'}
      />
    </div>
  );
};

export default CareerPath;
