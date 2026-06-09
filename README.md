# Notification Application - Submission (2300320130186)

This project consists of a full-stack notification system with a React frontend, Node.js backend, and a logging middleware. It features a **Priority Inbox** with weight-based scoring and automated **Bearer Token Authentication**.

## Project Structure
- `notification_app_be`: Node.js/Express Backend.
- `notification_app_fe`: React/Vite Frontend.
- `logging_middleware`: Custom logging service with auto-retry authentication.
- `screenshots/`: Proof-of-work images.

## Backend API Endpoints

### 1. Standard Notifications
- **GET** `/api/notifications`
- **Query Params**: 
  - `type`: (Optional) `Placement`, `Result`, or `Event`.
  - `page`: (Optional) For pagination (defaults to 1).
- **Description**: Fetches standard notifications from the external test API.

### 2. Priority Inbox
- **GET** `/api/notifications/priority`
- **Description**: Fetches notifications and sorts them by priority using a weight-based scoring formula:
  - `Placement`: 3 pts
  - `Result`: 2 pts
  - `Event`: 1 pt
  - *Score = (Weight * 1,000,000) - AgeInSeconds*

## Setup & Running

### 1. Environment Configuration
Ensure the [.env](file:///c:/Users/rm273/Downloads/Afford/2300320130186/notification_app_be/.env) file in `notification_app_be` is populated with the correct credentials.

### 2. Backend
```bash
cd notification_app_be
npm install
npm start
```

### 3. Frontend
```bash
cd notification_app_fe
npm install
npm run dev
```

## Mandatory Logging Middleware
This project strictly follows the requirement of integrating logging throughout the entire codebase:
- **Global Middleware**: Registered in `app.js` to log every incoming request/response.
- **Service & Controller Logs**: Granular `Log()` calls are integrated into `notificationService.js`, `notificationController.js`, and `server.js` to track internal logic and server state.
- **Auto-Auth Logger**: The logger itself handles its own authentication and retries to ensure no logs are lost due to token expiration.

## Features & Improvements
- **Authentication**: Implemented a "set and forget" token retrieval system in `notificationService.js` and `Log.js`.
- **Usability**: Reduced vertical scrolling by moving pagination to the top and compacting the card design.
- **Error Handling**: Added robust retries for expired tokens (401 errors) and validation for API limits (max 10 items).

## Proof of Work
Screenshots of the working application can be found in the [screenshots/](file:///c:/Users/rm273/Downloads/Afford/2300320130186/screenshots) folder.
- `media__...161.png`: Notifications filtered by Event.
- `media__...188.png`: Priority Inbox scoring.
- `media__...424.png`: API verification via Postman.

---
**System Design**: Detailed architectural decisions are documented in [notification_system_design.md](file:///c:/Users/rm273/Downloads/Afford/2300320130186/notification_system_design.md).
