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
        await this.repository.create(description);
    }

    async deleteTask(id: string): Promise<void> {
        const validatedId = this.validateTaskId(id);
        await this.repository.delete(validatedId);
    }

    async updateDescription(id: string, description: string): Promise<void> {
        const validatedId = this.validateTaskId(id);
        this.validateDescription(description);
        await this.repository.updateDescription(validatedId, description);
    }

    async updateStatus(id: string, status: TaskStatus): Promise<void> {
        const validatedId = this.validateTaskId(id);
        await this.repository.updateStatus(validatedId, status);
    }

    async listTasks(status?: TaskStatus): Promise<Task[]> {
        return await this.repository.list(status);
    }
}
