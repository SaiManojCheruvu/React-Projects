import { useState } from "react";
import { ItemsType} from "./App";
import Item from "./Item";
interface PackingListProps {
    items: ItemsType[];
    onDeleteItems: (id: number) => void;
    onToggle: (id: number) => void;
    onClear: () => void;
  }
  
  export default function PackingList({ items, onDeleteItems, onToggle, onClear }: PackingListProps): JSX.Element {
    const [sortBy, setSortBy] = useState<string>("input");
    let sortedItems = items;
    
    if (sortBy === 'description') {
      sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    }
  
    if (sortBy === 'packed') {
      sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
    }
  
    return (
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item onDeleteItems={onDeleteItems} onToggle={onToggle} key={item.id} item={item} />
          ))}
        </ul>
        {/* Now, to implement the sorting techniques
          We have a controlled element to know which value is selected in the drop down menu
          so we have the three steps of dealing with the controlled elements as seen in previous projects.
          1) create a piece of state
          2) Use the state as a value in the options
          3) set the state using events like onChange()
        */}
  
        {/* 
          Here, it is completely unnecessary to create a new state because it causes multiple re-renders.
          Now to deal with this, going with our flow chart we won't create a new state.
          But, we can derive the state from the items prop that we received, we can use items.sort()
        */}
  
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by Description</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={onClear}>Clear list</button>
        </div>
      </div>
    );
  }