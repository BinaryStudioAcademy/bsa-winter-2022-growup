import QuizItem from './quiz-item/quiz-item';
import  IQuiz  from './interfaces/quiz';

type Props = {
  quizes: IQuiz[];
};

const Quiz: React.FC<Props> = ({ quizes }) => (
  <div className="quiz-list">
    {quizes.map((quiz) => <QuizItem key={quiz.id} title={quiz.skill} level={quiz.level} />)}
  </div>
);

export default Quiz;
