import { Task, TaskStatus } from "../types";
import path from "path";
import { existsSync } from "fs";
import fs from "fs/promises";
import { TaskNotFoundError } from "../types";

export class TaskRepository {
    private readonly filePath: string;
    private tasks: Task[] = [];

    constructor(storageDirectory: string = process.cwd()) {
        this.filePath = path.join(storageDirectory, "tasks.json");
    }

    async initialize(): Promise<void> {
        if (!existsSync(this.filePath)) {
            await fs.writeFile(this.filePath, JSON.stringify([]));
        }
        const fileContent = await fs.readFile(this.filePath, "utf-8");
        this.tasks = JSON.parse(fileContent).map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
        }));
    }

    private getNextId(): number {
        return this.tasks.length > 0
            ? Math.max(...this.tasks.map((t) => t.id)) + 1
            : 1;
    }

    private async save(): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(this.tasks, null, 2));
    }

    async create(description: string): Promise<Task> {
        const newTask: Task = {
            id: this.getNextId(),
            description: description,
            status: TaskStatus.TODO,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.tasks.push(newTask);
        await this.save();
        return newTask;
    }

    async updateDescription(id: number, description: string): Promise<Task> {
        const task = this.tasks.find((t) => t.id === id);
        if (!task) {
            throw new TaskNotFoundError(id);
        }

        task.description = description;
        task.updatedAt = new Date();
        await this.save();
        return task;
    }

    async updateStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = this.tasks.find((t) => t.id === id);
        if (!task) {
            throw new TaskNotFoundError(id);
        }
        task.status = status;
        task.updatedAt = new Date();
        await this.save();
        return task;
    }

    async delete(id: number): Promise<void> {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter((t) => t.id !== id);
        if (this.tasks.length === initialLength) {
            throw new TaskNotFoundError(id);
        }

        await this.save();
    }

    async list(status?: TaskStatus): Promise<Task[]> {
        const tasksToReturn = status
            ? this.tasks.filter((t) => t.status === status)
            : this.tasks;

        return tasksToReturn.map((task) => ({ ...task }));
    }
}
