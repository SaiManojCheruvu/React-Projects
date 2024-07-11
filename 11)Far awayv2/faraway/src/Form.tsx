import { useState } from "react";
import { ItemsType } from "./App";
interface FormProps {
    handleAddItems: (item: ItemsType) => void;
  }
  
  {/* Therefore to have the controlled elements like onChange(), we need to write a piece of state and track the changes */}
  export default function Form({ handleAddItems }: FormProps): JSX.Element {
    const [description, setDescription] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    {/* Will the data change? yes, Can be computed from existing state? No
      Should it re-render component? yes
      Place a new piece of state in the component and hence a new state for the items
      */}
  
    {/* But have a closer look in the component tree at dev tools
      The items array must flow from form to packingList.
      But both of these are sibling components and hence props cannot be used.
      This is where lifting up the state comes into play!
      */}
    {/* This state was here, but now as a part of lifting up the state, we need to move this state to 
      nearest parent component, i.e App() and pass items as a prop
      const [items, setItems] = useState<initialItemsType[]>([]); */}
    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
      e.preventDefault();
      if (!description) return;
      const newItem = { description, quantity, packed: false, id: Date.now() };
      {/* After adding the item, set it back to initial state */}
      handleAddItems(newItem);
      setDescription("");
      setQuantity(1);
    }
  
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <select value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    );
  }