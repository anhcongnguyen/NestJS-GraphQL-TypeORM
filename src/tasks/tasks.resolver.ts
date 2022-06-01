import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Resolver((of) => Task)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query((returns) => [Task])
  tasks(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Mutation((returns) => Task)
  createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskInput);
  }

  @Query((returns) => Task)
  async findTaskById(
    @Args({ name: 'taskId', type: () => Int }) taskId: number,
  ): Promise<Task> {
    return this.tasksService.findTaskById(taskId);
  }

  @Mutation((returns) => String)
  async updateTask(
    @Args({ name: 'taskId', type: () => Int }) taskId: number,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<string> {
    return this.tasksService.updateTask(taskId, updateTaskInput);
  }

  @Mutation((returns) => String)
  async deleteTask(
    @Args({ name: 'taskId', type: () => Int }) taskId: number,
  ): Promise<string> {
    return this.tasksService.deleteTask(taskId);
  }
}
