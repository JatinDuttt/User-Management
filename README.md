# User Management

A React + Vite user management dashboard for adding, editing, deleting, filtering, and sorting user profiles. The app stores user data and recent activity in the browser using localStorage, so it works without a backend server.

## Author

Jatin

## Features

- Add new users with name, email, mobile number, password, and role.
- Edit existing user details.
- Delete users from the directory.
- Search and filter users by role.
- Sort users by recent activity and other available sort options.
- View dashboard statistics such as total users, visible users, admins, newest user, recent activity, and role distribution.
- Load demo users for quick testing.
- Persist users and activity in browser localStorage.

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- localStorage

## Clone the Repository

```bash
git clone https://github.com/JatinDuttt/User-Management.git
cd User-Management
```

## How to Run the Project

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

### 1. Install Dependencies

Make sure Node.js and npm are installed, then run:

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

After the server starts, open the local URL shown in the terminal. Vite usually runs at:

```text
http://localhost:5173
```

### 3. Build for Production

```bash
npm run build
```

This creates a production-ready `dist` folder.

### 4. Preview the Production Build

```bash
npm run preview
```

Open the preview URL shown in the terminal to check the production build locally.

## Project Structure

```text
User-Management/
├── src/
│   ├── components/      # UI components
│   ├── data/            # Demo user data
│   ├── hooks/           # User directory state and actions
│   ├── lib/             # Storage helpers
│   ├── styles/          # App styles
│   ├── utils/           # Constants, validation, dates, and transforms
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Creates a production build in the `dist` folder. |
| `npm run preview` | Serves the production build locally for preview. |

## How It Works

The app uses the `useUserDirectory` hook to manage users, form state, filters, edit mode, dashboard stats, recent activity, and localStorage syncing.

Main flow:

1. Users and activity are loaded from localStorage when the app starts.
2. Form data is validated before a user is created or updated.
3. User changes are saved back to localStorage automatically.
4. Search, role filter, and sorting are applied before rendering the table.
5. Dashboard cards are calculated from the current user list.

## User Validation Rules

A user can be saved only when:

- Name, email, mobile number, and password are filled in.
- Email has a valid email format.
- Mobile number contains valid phone characters and is between 7 and 20 characters.
- Password is at least 4 characters long.
- Email is unique across users, except for the user currently being edited.

## Local Storage

The app stores data in the browser using these keys:

| Key | Stores |
| --- | --- |
| `user-management-users` | Saved user profiles |
| `user-management-activity` | Recent activity entries |

To reset the app manually, clear these keys from browser localStorage or clear the site data from browser developer tools.

## Notes

This is a frontend-only project. User data is stored in the browser and is not sent to a backend server.
