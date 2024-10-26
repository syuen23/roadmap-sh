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

    async create(task: Task): Promise<Task> {
        const newTask: Task = {
            ...task,
            id: this.getNextId(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.tasks.push(newTask);
        await this.save();
        return task;
    }
}
