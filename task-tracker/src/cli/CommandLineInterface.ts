import { TaskService } from "../services/TaskService";
import { TaskStatus } from "../types";
export class CommandLineInterface {
    constructor(private service: TaskService) {}

    async execute(command: string, ...params: string[]): Promise<void> {
        switch (command) {
            case "add":
                await this.handleAdd(params);
                break;
            case "delete":
                await this.handleDelete(params);
                break;
            case "mark-in-progress":
                await this.handleMarkInProgress(params);
                break;
            case "mark-done":
                await this.handleMarkDone(params);
                break;
            case "update":
                await this.handleUpdate(params);
                break;
            case "list":
                await this.handleList(params);
                break;
            case "help":
                this.showHelp();
                break;
            default:
                console.log("Invalid command");
                this.showHelp();
                break;
        }
    }

    private async handleAdd(params: string[]): Promise<void> {
        await this.service.createTask(params[0]);
    }

    private async handleDelete(params: string[]): Promise<void> {
        await this.service.deleteTask(params[0]);
    }

    private async handleMarkInProgress(params: string[]): Promise<void> {
        await this.service.updateStatus(params[0], TaskStatus.IN_PROGRESS);
    }

    private async handleMarkDone(params: string[]): Promise<void> {
        await this.service.updateStatus(params[0], TaskStatus.DONE);
    }

    private async handleUpdate(params: string[]): Promise<void> {
        await this.service.updateDescription(params[0], params[1]);
    }

    private async handleList(params: string[]): Promise<void> {
        const status = params[0] as TaskStatus;
        const tasks = await this.service.listTasks(status);
        console.table(tasks);
    }

    private showHelp(): void {
        console.log(`
            Usage: task-tracker <command> [options]
            Commands:
                add <description> - Add a new task
                delete <id> - Delete a task
                update <id> <description> - Update a task
                mark-in-progress <id> - Mark a task as in progress
                mark-done <id> - Mark a task as done
                list [status] - List all tasks (status is optional: in-progress, done)
            `);
    }
}
