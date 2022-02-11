import QuizItem from './quiz-item/quiz-item';
import  IQuiz  from './interfaces/IQuiz';

type Props = {
  quizes: IQuiz[];
};

const Quiz: React.FC<Props> = ({ quizes }) => (
  <>
    {quizes.map((quiz) => <QuizItem key={quiz.id} title={quiz.skill} level={quiz.level} />)}
  </>
);

export default Quiz;
