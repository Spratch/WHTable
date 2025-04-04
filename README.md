# WHTable - Accessible React Table Component

WHTable is a TypeScript React component providing an accessible, feature-rich table for WealthHealth applications. Built with React Aria Components and styled with Tailwind CSS.

## Features

- ✅ Fully accessible (WCAG compliant)
- 🔍 Built-in search functionality
- 📊 Sortable columns
- 📏 Resizable columns
- 🔢 Pagination
- 🌓 Light and dark mode support
- 🔄 Redux state management
- 📱 Responsive design
- 🏢 WealthHealth corporate design

## Prerequisites

To use WHTable, you need:

- React 19 or higher
- [Tailwind CSS 4](https://tailwindcss.com/docs/installation/using-vite) or higher configured in your project
- [Tailwind React Aria Components plugin](https://www.npmjs.com/package/tailwindcss-react-aria-components)

## Installation

```bash
npm install @spratch/whtable
```

## Usage

### Tailwind CSS

First you need to add these lines in your Tailwind CSS 4 file if they are not already here:

```css
/* App.css */

@import "tailwindcss";

@source "../../node_modules/@spratch/whtable";

@plugin "tailwindcss-react-aria-components";
```

Then in the component using the table

```jsx
// index.jsx

import { WHTable } from "@spratch/whtable";

function YourComponent() {
  const employees = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      startDate: "2023-01-15",
      department: "Engineering"
    }
    // more data...
  ];

  const columns = [
    { id: "firstName", title: "First Name" },
    { id: "lastName", title: "Last Name" },
    { id: "startDate", title: "Start Date" },
    { id: "department", title: "Department" }
  ];

  return (
    <WHTable
      itemsStatus="succeeded"
      itemsMessage=""
      items={employees}
      itemsName={{ singular: "employee", plural: "employees" }}
      newItemLink="/create-employee"
      lengthOptions={["10", "25", "50", "100"]}
      columnsTitles={columns}
      emailAddress="support@wealthhealth.com"
    />
  );
}
```

## Props

| Prop            | Type                                   | Description                                              | Default                                 |
| --------------- | -------------------------------------- | -------------------------------------------------------- | --------------------------------------- |
| `itemsStatus`   | `string`                               | Loading state ("idle", "loading", "succeeded", "failed") | Required                                |
| `itemsMessage`  | `string`                               | Message to display (e.g., error message)                 | Required                                |
| `items`         | `Record<string, string>[]`             | Array of data objects                                    | Required                                |
| `itemsName`     | `{ singular: string, plural: string }` | Names for your data items                                | `{ singular: "item", plural: "items" }` |
| `newItemLink`   | `string`                               | Link to create a new item                                | `undefined`                             |
| `lengthOptions` | `string[]`                             | Options for page size                                    | `["10", "25", "50", "100"]`             |
| `columnsTitles` | `{ id: string, title: string }[]`      | Column definitions                                       | Required                                |
| `emailAddress`  | `string`                               | Support email (shown on error)                           | `undefined`                             |

## License

MIT

## Issues

For bugs or feature requests, please open an issue on the [GitHub repository](https://github.com/Spratch/WHTable/issues).
