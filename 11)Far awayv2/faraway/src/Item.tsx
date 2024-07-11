import { ItemsType } from "./App";
interface ItemProps {
    item: ItemsType;
    onDeleteItems: (id: number) => void;
    onToggle: (id: number) => void;
  }
  
  export default function Item({ item, onDeleteItems, onToggle }: ItemProps): JSX.Element {
    {/* On careful observation, it can be observed that the component Item() is responsible for deletion of the 
      items in the list, but the state resides in the parent component App(), this is a case of parent-child communication
      and the solution is to pass the setState i.e setItem() as a prop from the parent component App() to child component Item()
      */}
    {/* But look at the component tree, it is not possible to directly pass the setItems() from App() to Item()
      Therefore we pass it to its parent component that is PackingList and receive it from there as a prop to <Item/>.
      */}
    return (
      <li>
        {/* Updating an Item, this is a complex operation */}
        {/* This resides where the state resides, therefore we need to come from App() to Item() through PackingList() again */}
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => {
            onToggle(item.id);
          }}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItems(item.id)}>❌</button>
      </li>
    );
  }