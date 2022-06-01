import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
    const newTask = this.tasksRepository.create(createTaskInput);
    await this.tasksRepository.save(newTask);
    return newTask;
  }

  async findAll(): Promise<Task[]> {
    const task = await this.tasksRepository.find();
    return task;
  }

  async findTaskById(taskId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne(taskId);
    return task;
  }

  async updateTask(
    taskId: number,
    updateTaskInput: UpdateTaskInput,
  ): Promise<string> {
    const task = await this.findTaskById(taskId);
    if (task) {
      task.title = updateTaskInput.title;
      task.status = updateTaskInput.status;
      task.description = updateTaskInput.description;
      await this.tasksRepository.save(task);

      return `This task with Id ${task.id} update successful`;
    }

    return `Cannot found task with ${task.id}`;
  }

  async deleteTask(taskId: number): Promise<string> {
    const task = await this.findTaskById(taskId);
    if (task) {
      await this.tasksRepository.delete(task);

      return `This task with Id ${task.id} delete successful`;
    }

    return `Cannot found task with ${task.id}`;
  }
}
