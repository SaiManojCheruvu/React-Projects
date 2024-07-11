 import { useState } from 'react';
import './index.css'
 interface initialItemsType{
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
 }
 const initialItems: initialItemsType[] = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App(): JSX.Element{
  return (
    <div className="App">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo(): JSX.Element{
  return <h1>🌴 Far Away 💼</h1>
}
function PackingList():JSX.Element{
  return( <div className='list'>
        <ul>
        {initialItems.map((item) => (
          <Item item={item} />
        ))} 
        </ul>
    </div>

  );
}
function Stats():JSX.Element{
  return <footer className="stats"> <em>💼 You packed X items on your list, and you already packed X (X%) </em> </footer>
}
{/* Therefore to have the controlled elements like onChange(), we need to write a piece of state and track the changes */}
function Form():JSX.Element{
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>):void{
    if(!description) return;
    e.preventDefault();
    const newItem = {description, quantity, packed:false, id:Date.now()};
    {/* After adding the item, set it back to initial state */}
    setQuantity(1);
  }
  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({length:20}, (_,i)=> i + 1).map(
          (num) => (
            <option value={num} key={num}>
              {num}
            </option>
          )
        )
        
        }
      </select>
      <input type='text' placeholder='Item...' value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button>Add</button>
    </form>
  )
}

interface itemProps{
  item: initialItemsType;
}
function Item({item}: itemProps): JSX.Element{
    return <li>
      <span style={item.packed?{textDecoration:"line-through"}:{}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
      </li>
}
export default App;
