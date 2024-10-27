import { TaskRepository } from "../storage/TaskRepository";
import { Task, TaskStatus, TaskValidationError } from "../types";

export class TaskService {
    constructor(private repository: TaskRepository) {}

    private validateTaskId(id: string): number {
        const numId = parseInt(id, 10);
        if (isNaN(numId) || numId < 1) {
            throw new TaskValidationError("Invalid task ID");
        }
        return numId;
    }

    private validateDescription(description: string): void {
        if (!description || description.trim().length === 0) {
            throw new TaskValidationError("Description cannot be empty");
        }
    }

    async createTask(description: string): Promise<void> {
        this.validateDescription(description);
        const task = await this.repository.create(description);
        console.log(`Task added successfully (ID: ${task.id})`);
    }

    async deleteTask(id: string): Promise<void> {
        const validatedId = this.validateTaskId(id);
        await this.repository.delete(validatedId);
        console.log(`Task deleted successfully (ID: ${validatedId})`);
    }

    async updateDescription(id: string, description: string): Promise<void> {
        const validatedId = this.validateTaskId(id);
        this.validateDescription(description);
        await this.repository.updateDescription(validatedId, description);
        console.log(`Task updated successfully (ID: ${validatedId})`);
    }

    async updateStatus(id: string, status: TaskStatus): Promise<void> {
        const validatedId = this.validateTaskId(id);
        await this.repository.updateStatus(validatedId, status);
        console.log(`Task updated successfully (ID: ${validatedId})`);
    }

    async listTasks(status?: TaskStatus): Promise<Task[]> {
        return await this.repository.list(status);
    }
}
