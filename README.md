## Pomodoro App (Tauri + Angular)

This is a Pomodoro-based task tracking application built with Angular and Tauri.

### Current release

**Windows:** [Download the latest build](/output/pomodoro-app_0.1.0_x64-setup.exe)  
**macOS:** Currently, I don't have a macOS machine. Please follow the build instructions to compile the app yourself if you use macOS.

### Overview of the app

[![Watch the video](/screenshots/youtube-image.png)](https://www.youtube.com/watch?v=BmkxaTUH9y8)

### Features

- Add, select, complete, and delete tasks.
- Tracks time spent on each task.
- Saves tasks and time logs using LokiJS.
- Visualize time spent per week/month using Chart.js.
- Runs as a lightweight desktop application.

### Tech Stack

- Frontend: Angular
- Backend: Tauri (Rust-powered desktop app framework)
- Database: LokiJS (Lightweight NoSQL storage)
- Charts: Chart.js (Time spent tracking)

### Installation & Setup

1. Clone the Repository

git clone https://github.com/emintt/pomodoro-app.git

2. Install Dependencies

npm install

3. Run the App in Development Mode

npm run tauri dev

4. Build for Production

npm run tauri build
