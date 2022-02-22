interface Props {
  themeType: string;
  text: string;
  onSubmit?: () => void;
}

const Button: React.FC<Props> = ({ themeType = '', text, onSubmit }) => (
  <button className={`btn ${themeType}`} onClick={onSubmit}>
    {text}
  </button>
);

export default Button;
