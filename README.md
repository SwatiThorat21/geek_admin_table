# Geek Admin

`Geek Admin` is a small React + Vite admin dashboard that displays a list of users in a table and allows basic client-side management actions.

## What the project does

When the app loads, it fetches member data from the Geektrust JSON endpoint and shows it in an admin table. From the UI, you can:

- search users by name, email, or role
- paginate through the results
- select one or more rows with checkboxes
- delete a single row
- delete multiple selected rows
- edit a row's name, email, and role

All edits and deletions happen only in the browser state. There is no backend or database persistence in this project right now.

## Tech stack

- React 19
- Vite 6
- PropTypes for runtime prop validation
- Plain CSS for styling

## Project structure

- [src/main.jsx](D:/IT-Study/geekcrust_project/geek-admin/src/main.jsx) bootstraps the React app.
- [src/App.jsx](D:/IT-Study/geekcrust_project/geek-admin/src/App.jsx) renders the main page component.
- [src/components/TableListPage.jsx](D:/IT-Study/geekcrust_project/geek-admin/src/components/TableListPage.jsx) contains the main state and feature logic.
- [src/components/UserTable.jsx](D:/IT-Study/geekcrust_project/geek-admin/src/components/UserTable.jsx) renders the user table and row actions.
- [src/components/Pagination.jsx](D:/IT-Study/geekcrust_project/geek-admin/src/components/Pagination.jsx) renders the pagination controls.

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

## Data source

The user data is loaded from:

`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
