import { Provider } from "react-redux";
import { store } from "../redux/store";
import { TableSection, TableSectionProps } from "./tableSection";

/**
 * TableSection component
 * @param itemsStatus - Status of the items (idle, loading, succeeded, failed)
 * @param itemsMessage - Message to display in case of error
 * @param items - Array of items to display in the table
 * @param itemsName - Object containing singular and plural names for the items
 * @param newItemLink - Link to create a new item
 * @param lengthOptions - Array of options for the number of items per page
 * @param columnsTitles - Array of objects containing id and title for each column
 * @param emailAddress - Email address for support contact
 */
export function WHTableWrapper({
  itemsStatus,
  itemsMessage,
  items,
  itemsName,
  newItemLink,
  lengthOptions,
  columnsTitles,
  emailAddress
}: TableSectionProps) {
  return (
    <Provider store={store}>
      <TableSection
        itemsStatus={itemsStatus}
        itemsMessage={itemsMessage}
        items={items}
        itemsName={itemsName}
        newItemLink={newItemLink}
        lengthOptions={lengthOptions}
        columnsTitles={columnsTitles}
        emailAddress={emailAddress}
      />
    </Provider>
  );
}
