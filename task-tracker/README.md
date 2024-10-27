# Task Tracker

Task Tracker is a simple command-line application for managing tasks. It allows users to create, update, delete, and list tasks with different statuses.

Idea from roadmap.sh

## Features

-   Add new tasks
-   Delete tasks
-   Update task descriptions
-   Mark tasks as in-progress or done
-   List tasks (optionally filtered by status)

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/yourusername/task-tracker.git
    ```

2. Navigate to the project directory:

    ```
    cd task-tracker
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Build the project:
    ```
    npm run build
    ```

## Usage

Run the application:

```
npm run start <command> [options]
```

### Available Commands

-   `add <description>`: Add a new task
-   `delete <id>`: Delete a task
-   `update <id> <description>`: Update a task's description
-   `mark-in-progress <id>`: Mark a task as in-progress
-   `mark-done <id>`: Mark a task as done
-   `list [status]`: List all tasks (optionally filtered by status: todo, in-progress, done)
-   `help`: Show help information

## Project Structure

-   `src/`: Source code directory
    -   `cli/`: Command-line interface implementation
    -   `services/`: Business logic and task management
    -   `storage/`: Data persistence layer
    -   `types.ts`: Type definitions and custom errors
    -   `index.ts`: Application entry point

## Development

To run the project in development mode with automatic reloading:

```
npm run dev <command> [options]
```
