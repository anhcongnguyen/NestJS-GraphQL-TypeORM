import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { TaskStatus } from '../entities/task-status.enum';

@InputType()
export class CreateTaskInput {
  @IsAlpha()
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => TaskStatus)
  status: TaskStatus;
}
