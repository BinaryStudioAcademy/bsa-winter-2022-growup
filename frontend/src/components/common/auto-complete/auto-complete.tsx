import { useState } from 'hooks/hooks';
import { Option, Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Button } from '../common';
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
            <Button
              themeType={'bg-transparent border-0 fs-1'}
              onSubmit={onClear}
            />
          )}
        </div>
      )}
    </Typeahead>
  );
};

export default AutoComplete;
