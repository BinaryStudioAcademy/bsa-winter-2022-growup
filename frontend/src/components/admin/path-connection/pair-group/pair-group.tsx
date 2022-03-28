import './styles.scss';

interface Props {
  title: string;
}

// This is a container which have to contain all connected items
const PairsGroup: React.FC<Props> = ({ title, children }) => (
  <div className="paired-group">
    <h5 className="paired-group__title fs-5">{title}</h5>
    <div className="paired-group__elements d-flex gap-2 flex-wrap">
      {children}
    </div>
  </div>
);

export default PairsGroup;
