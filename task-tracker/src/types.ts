export enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in-progress",
    DONE = "done",
}

export type Task = {
    id: number;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
};

export class TaskNotFoundError extends Error {
    constructor(id: number) {
        super(`Task with id ${id} not found`);
        this.name = "TaskNotFoundError";
    }
}

export class TaskValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TaskValidationError";
    }
}
