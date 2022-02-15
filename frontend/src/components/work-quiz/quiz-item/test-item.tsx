type Props = {
  question: string;
};

const TestItem: React.FC<Props> = (question) => {
  return <div>{question}</div>;
};

export default TestItem;
