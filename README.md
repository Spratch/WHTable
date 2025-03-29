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

## Prerequisites

To use WHTable, you need:

- React 19 or higher
- Node.js 18 or higher
- npm 9 or higher
- [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) configured in your project
- [React Aria Components](https://react-spectrum.adobe.com/react-aria/getting-started.html)
- [Tailwind React Aria Components plugin](https://www.npmjs.com/package/tailwindcss-react-aria-components)

## Installation

```bash
npm install wh-table
```

## Usage

```jsx
import { TableSection, WHTableStore } from "wh-table";
import { Provider } from "react-redux";

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
    <Provider store={WHTableStore}>
      <TableSection
        itemsStatus="succeeded"
        itemsMessage=""
        items={employees}
        itemsName={{ singular: "employee", plural: "employees" }}
        newItemLink="/create-employee"
        lengthOptions={["10", "25", "50", "100"]}
        columnsTitles={columns}
        emailAddress="support@wealthhealth.com"
      />
    </Provider>
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

## Author

Joseph Clenet

## Issues

For bugs or feature requests, please open an issue on the [GitHub repository](https://github.com/Spratch/WHTable/issues).
