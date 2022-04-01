interface Props {
  general: string;
}
const General: React.FC<Props> = ({ general }) => {
  return <div>{general}</div>;
};
export default General;
