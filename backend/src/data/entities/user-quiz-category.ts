import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { QuizCategory } from './quiz-category';
import { User } from './user';

@Entity()
export class User_QuizCategory extends BaseEntity {
  @PrimaryColumn()
  quizCaregoryId: number;
  @ManyToOne(() => QuizCategory, (quizCategory) => quizCategory.id)
  @JoinColumn({ name: 'quizCaregoryId' })
  quizCategory: QuizCategory;

  @PrimaryColumn()
  userId: number;
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'integer' })
  score: string;
}
