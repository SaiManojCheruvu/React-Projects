import { useState } from 'react';
import './index.css';
import Logo from './Logo';
import Form from './Form';
import PackingList from './packingList';
import Stats from './Stats';

export interface ItemsType {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

function App(): JSX.Element {
  const [items, setItems] = useState<ItemsType[]>([]);
  {/* For the stats component, we could've declared a state as
    const [itemsLength, setItemsLength] = useState<number>(0) and set the state as 
    setItemsLength((itemsLength) => itemsLength + 1 ) soon after the setItems(...) in handleAddItems
    but we would rather have the props sent to the Stats() component and let the Stats() figure out the length as
    items.length; by passing items as a prop to the Stats(), now this way of passing props can be termed as "Derived state"
    */}
  function handleAddItems(item: ItemsType): void {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id: number): void {
    setItems(items => items.filter((item) => item.id !== id));
  }

  function handleToggle(id: number): void {
    setItems(items => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  }
  function handleClear(){
    const confirmed = window.confirm("Are you sure to delete all the values ?");
    if(confirmed)
    setItems([]);
  }

  return (
    <div className="App">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList onClear={handleClear} onDeleteItems={handleDeleteItem} onToggle={handleToggle} items={items} />
      <Stats items={items} />
    </div>
  );
}




export default App;
