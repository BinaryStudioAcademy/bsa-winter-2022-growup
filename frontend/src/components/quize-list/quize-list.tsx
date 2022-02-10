import QuizItem from './quiz-item/quiz-item';
import  Quiz  from './interfaces/quiz';

type Props = {
  quizes: Quiz[];
};

const QuizeList: React.FC<Props> = ({ quizes }) => (
  <>
    {quizes.map((quiz, i) => <QuizItem key={i} title={quiz.skill} level={quiz.level} />)}
  </>
);

export default QuizeList;
