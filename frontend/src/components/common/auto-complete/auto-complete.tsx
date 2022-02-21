import { useState } from '../../../hooks/hooks';
import { ClearButton, Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './styles.scss';

interface Props {
  options: Option[];
  placeholder: string;
  multiple?: boolean;
}

const AutoComplete: React.FC<Props> = ({
  placeholder,
  options,
  multiple = false,
}) => {
  const [selected, setSelected] = useState<Option[]>([]);

  return (
    <Typeahead
      id="auto-complete"
      options={options}
      multiple={multiple}
      selected={selected}
      placeholder={placeholder}
      onChange={setSelected}
    >
      {({ onClear, selected }): JSX.Element => (
        <div className="rbt-aux">
          {!!selected.length && (
            <ClearButton
              className="btn bg-transparent border-0 fs-1"
              onClick={onClear}
            />
          )}
        </div>
      )}
    </Typeahead>
  );
};

export default AutoComplete;
