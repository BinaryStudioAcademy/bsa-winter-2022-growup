interface Props {
  themeType: string;
  text: string;
}

const Button: React.FC<Props> = ({ themeType = '', text }) => (
  <button className={`btn ${themeType}`}>{text}</button>
);

export default Button;
