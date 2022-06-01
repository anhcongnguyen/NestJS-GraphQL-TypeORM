import { Field, InputType } from '@nestjs/graphql';
import { TaskStatus } from '../entities/task-status.enum';

@InputType()
export class UpdateTaskInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => TaskStatus)
  status: TaskStatus;
}
