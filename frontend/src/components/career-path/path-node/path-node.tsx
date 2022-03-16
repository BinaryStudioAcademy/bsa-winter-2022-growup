import { useState, useRef } from 'hooks/hooks';
import {
  Pencil as EditIcon,
  ArrowDown as AddChildIcon,
  TrashFill as DeleteIcon,
  Check as SaveIcon,
  PlusCircle as CancelIcon,
} from 'react-bootstrap-icons';
import './styles.scss';

interface Props {
  name: string;
  children?: React.ReactNode;
  className?: string;
  leaf?: boolean;
  onClick?: () => void;
  onAdd?: () => void;
  onEdit?: (name: string) => void;
}

const PathBlock: React.FC<Props> = ({
  name,
  children,
  onClick,
  className = '',
  leaf,
  onAdd,
  onEdit,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(name);
  const inputElement = useRef(null);

  return (
    <li className="tree-wrapper" onClick={onClick}>
      <div className="tree-node">
        <div
          className={`tree-node__item btn btn-secondary ${className} `}
          data-toggle="tooltip"
          data-placement="top"
          title={name}
          onDoubleClick={(): void => setIsEditMode(true)}
        >
          {isEditMode ? (
            <input
              ref={inputElement}
              className="tree-node__item-input"
              defaultValue={editedValue}
              onFocus={(e): void => e.target.select()}
              onChange={(e): void => setEditedValue(e.target.value)}
            />
          ) : (
            name
          )}
        </div>
        <div className="node-actions-wrapper">
          <div className="node-actions">
            {!isEditMode ? (
              <>
                {!leaf ? (
                  <button
                    className="node__add node-action fs-5"
                    onClick={(): void => onAdd && onAdd()}
                  >
                    <AddChildIcon />
                  </button>
                ) : null}
                <button
                  className="node__edit node-action fs-5"
                  onClick={(): void => setIsEditMode(true)}
                >
                  <EditIcon />
                </button>
                <button className="node__delete node-action fs-5">
                  <DeleteIcon />
                </button>
              </>
            ) : (
              <>
                <button
                  className="node__save node-action fs-5"
                  onClick={(): void => {
                    if (onEdit) {
                      onEdit(editedValue);
                      setIsEditMode(false);
                    }
                  }}
                >
                  <SaveIcon />
                </button>
                <button
                  className="node__save node-action fs-5"
                  onClick={(): void => setIsEditMode(false)}
                >
                  <CancelIcon style={{ transform: 'rotate(45deg)' }} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {children ? (
        <ul className={'tree-level border-0'}> {children} </ul>
      ) : null}
    </li>
  );
};

export default PathBlock;
