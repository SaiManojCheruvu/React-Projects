import { useState } from "react";

{/*
    - Components must be pure when it comes to render logic, given some props, a component instance should always return same JSX element
    - Render logic should have no side effects: No interaction with out side world is allowed.
          i) Do Not perform network requests (API calls).
          ii)Do not start timers
         iii)Do not directly use the DOM API
         iV) Do not mutate objects or variables outside the function scope
         V) Do not update state (or refs): this will create an infinite loop!
    - Side effects ae allowed in event handler functions!
      There is also a special hook to register side effects(useEffect()).

      Also, state updates are batched.
      If there are multiple setState()'s in a function.
      All of the state updates are batched and re-render happens in one go.
      So the assumption of re-render on every setState() is false.

      If we were to consider an event function as follows:
      
      const reset = function(){
        setAnswer('');
        console.log(answer)
        setBest(true)
        setSolved(false)
      }
       In the above code snipped, whatwe would expect is the console.log to print an empty string, 
       as we set the state to ''. But it is wrong! setState happens only after the re-render.
       Therefore, the answer is not yet updated to '' but its previous value.
      State is stored in the fiber tree during render phase -> At this point re-render has not happened yet -> Therefore, answer still contains current state and not the updated state ('') -> Updating the state in react is asynchronous
      - Updated state variables are not immediately available after the setState call, but only after the re-render.
      - This also applies when only one state variable is updated.
      - If we need to update the state based on the previous update, we need to use setState with call back
      setAnswer((answer) => do something!);
  */}

type FriendType = {
  id: string;
  name: string;
  image: string;
  balance: number;
};

const initialFriends: FriendType[] = [
  {
    id: "118836",
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: "933372",
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: "499476",
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

type ButtonPropsType = {
  children: React.ReactNode;
  onClick?: () => void;
};

function Button({ children, onClick }: ButtonPropsType): JSX.Element {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App(): JSX.Element {
  const [friends, setFriends] = useState<FriendType[]>(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<FriendType | null>(null);

  function handleShowAddFriend(): void {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend: FriendType): void {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend: FriendType): void {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value: number): void {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {/* Having the selectedFriend.id as the key is resetting the state on rvery re-render, otherwise the data entered in the fields would have stayed back even on switching friends */}
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

type FriendsListPropsType = {
  friends: FriendType[];
  onSelection: (friend: FriendType) => void;
  selectedFriend: FriendType | null;
};

function FriendsList({
  friends,
  onSelection,
  selectedFriend,
}: FriendsListPropsType): JSX.Element {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

type FriendPropsType = {
  friend: FriendType;
  onSelection: (friend: FriendType) => void;
  selectedFriend: FriendType | null;
};

function Friend({
  friend,
  onSelection,
  selectedFriend,
}: FriendPropsType): JSX.Element {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

type FormAddFriendPropsType = {
  onAddFriend: (friend: FriendType) => void;
};

function FormAddFriend({ onAddFriend }: FormAddFriendPropsType): JSX.Element {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("https://i.pravatar.cc/48");

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();

    if (!name || !image) return;

    const id: string = crypto.randomUUID();
    const newFriend: FriendType = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

type FormSplitBillPropsType = {
  selectedFriend: FriendType;
  onSplitBill: (value: number) => void;
};

function FormSplitBill({
  selectedFriend,
  onSplitBill,
}: FormSplitBillPropsType): JSX.Element {
  const [bill, setBill] = useState<number | "">("");
  const [paidByUser, setPaidByUser] = useState<number | "">("");
  const paidByFriend = bill ? bill - (paidByUser as number) : "";
  const [whoIsPaying, setWhoIsPaying] = useState<string>("user");

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? (paidByFriend as number) : -(paidByUser as number));
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="number"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > (bill as number) ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="number" disabled value={paidByFriend as number} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
