import { argv } from "process";
import { CommandLineInterface } from "./cli/CommandLineInterface";
import { TaskRepository } from "./storage/TaskRepository";
import { TaskService } from "./services/TaskService";
import { TaskNotFoundError, TaskValidationError } from "./types";

async function main() {
    const repository = new TaskRepository();
    await repository.initialize();
    const service = new TaskService(repository);
    const cli = new CommandLineInterface(service);

    const command = argv.slice(2)[0];
    const args = argv.slice(3);

    await cli.execute(command, ...args);
}

main().catch((error) => {
    if (
        error instanceof TaskNotFoundError ||
        error instanceof TaskValidationError
    ) {
        console.error(error.message);
    } else {
        console.error(error);
    }
});
