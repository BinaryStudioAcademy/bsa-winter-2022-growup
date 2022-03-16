import { FormEvent } from 'react';

interface Props {
  themeType?: string;
  themeWithoutBtn?: string;
  text?: string;
  onSubmit?: (a: FormEvent) => void;
  type?: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  themeType = '',
  themeWithoutBtn = '',
  onSubmit,
  children,
}) => (
  <button
    className={themeType ? `btn ${themeType}` : `${themeWithoutBtn}`}
    onClick={onSubmit}
  >
    {children}
  </button>
);

export default Button;
