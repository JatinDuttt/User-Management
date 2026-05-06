# User Management Studio

User Management Studio is a responsive React + Vite application for creating, editing, searching, sorting, and managing user profiles in the browser. It keeps the UI split into focused components, moves stateful business logic into a custom hook, and persists users locally with `localStorage`.

## Features

- Add new users with name, email, mobile number, password, and role
- Edit existing user records without losing the rest of the directory
- Delete users with a confirmation prompt
- Search by name, email, mobile number, or role
- Filter users by role: Admin, Manager, Support, or User
- Sort users by newest, oldest, name A-Z, or name Z-A
- View dashboard stats for total users, visible users, admins, newest user, role distribution, and recent activity
- Load demo users for quick testing
- Persist users and activity history in browser local storage
- Validate required fields, email format, mobile format, password length, and duplicate emails

## Tech Stack

- React 18
- Vite 5
- Plain CSS
- Browser local storage

## Getting Started

### Prerequisites

Install Node.js and npm before running the project.

Recommended versions:

- Node.js 18 or newer
- npm 9 or newer

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

After the dev server starts, open the local URL shown in the terminal. Vite usually serves the app at:

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally for preview |

## Project Structure

```text
User-Management/
  index.html
  package.json
  vite.config.js
  src/
    App.jsx
    main.jsx
    components/
      Dashboard.jsx
      Filters.jsx
      Hero.jsx
      UserForm.jsx
      UserTable.jsx
    data/
      demoUsers.js
    hooks/
      useUserDirectory.js
    lib/
      storage.js
    styles/
      app.css
    utils/
      constants.js
      date.js
      userTransforms.js
      validation.js
```

## How It Works

The app is centered around `useUserDirectory`, a custom hook that manages users, filters, form state, edit mode, dashboard data, activity history, and local storage syncing.

Main flow:

1. Users are loaded from local storage when the app starts.
2. Form submissions are validated before creating or updating a user.
3. User changes are saved back to local storage automatically.
4. Filters and sorting are applied in memory before rendering the table.
5. Dashboard cards and activity logs are derived from the current user list.

## User Validation Rules

A user can be saved only when:

- Name, email, mobile number, and password are filled in
- Email has a valid email format
- Mobile number contains valid phone characters and is between 7 and 20 characters
- Password is at least 4 characters long
- Email is unique across users, except for the user currently being edited

## Local Storage

The app stores data using these keys:

| Key | Stores |
| --- | --- |
| `user-management-users` | Saved user profiles |
| `user-management-activity` | Recent activity entries |

To reset the app manually, clear these keys from your browser's local storage or use the browser developer tools to clear site data.

## Usage Tips

- Use **Load Demo Users** to quickly populate the dashboard.
- Use **Clear Form** to reset the add/edit form.
- Use **Clear Filters** to return to the full user list.
- Editing a user scrolls the page back to the form so updates can be made immediately.

## Notes

This is a frontend-only project. User data is stored in the browser and is not sent to a backend server.
