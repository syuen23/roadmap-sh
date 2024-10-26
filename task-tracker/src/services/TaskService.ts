import { TaskRepository } from "../storage/TaskRepository";
import { TaskStatus, TaskValidationError } from "../types";

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
}
