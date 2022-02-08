import  './add-section.scss';

type Props = {
  title: string;
};

const AddSection: React.FC<Props> = ({ children, title }) => (
  <div className="add-section">
    <div className="add-section-header">
      <p className="add-section-header__title">{title}</p>
      <button className="add-section-header__add-button">Add experience</button>
    </div>
    <div className="add-section-content">
      {children}
    </div>
  </div>
);

export default AddSection;
