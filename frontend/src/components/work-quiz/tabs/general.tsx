interface Props {
  general: string[];
}
const General: React.FC<Props> = ({ general }) => {
  return (
    <div className="overflow-scroll general">
      {general.map((text, index) => {
        return <p key={index}>{text}</p>;
      })}
    </div>
  );
};
export default General;
