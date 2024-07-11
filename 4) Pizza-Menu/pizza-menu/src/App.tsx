import React from "react";
import './index.css'
interface Pizza {
    name: string;
    ingredients: string;
    price: number;
    photoName: string;
    soldOut: boolean;
  };
  const pizzaData: Pizza[] = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "pizzas/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "pizzas/margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "pizzas/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "pizzas/funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "pizzas/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "pizzas/prosciutto.jpg",
      soldOut: false,
    },
  ];
  
const App: React.FC = () => {
    return (
    <div className="container">
    <Header />
    <Menu pizzas={pizzaData}/>
    <Footer />
    </div>
    );
 };
 const Header: React.FC = () => {
    return (
    <header className="header">
        <h1> Fast React Pizza, CO</h1>
    </header>
    );
 };
 interface MenuProps{
    pizzas: Pizza[]
 }
 const Menu: React.FC<MenuProps> = ({ pizzas }) => {
    const numPizzas = pizzas.length;
    return (
        <div className="menu">
            <h2>Our Menu</h2>
            {numPizzas > 0 ? (
                <>
                <p>Authentic Italian cusine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious.</p>
                <ul className="pizzas">
                    {pizzas.map((pizza) => (
                        <Pizza key={pizza.name} pizza={pizza} />
                    ))}
                </ul>
                </>
            ) : null}
        </div>
    );
};

 const Footer: React.FC = () => {
    const hour: number = new Date().getHours();
    const openHour: number = 8;
    const closeHour: number = 22;
    const isOpen:boolean = hour >= openHour && hour <= closeHour;

 
    return (
        <footer className="footer"> 
        {/* way 1: short circuiting {isOpen ? (
        <div className="order"> <p>We're Open until {closeHour}:00. Come visit us or order online.</p>
        <button className="btn">Order</button>
        </div>   
        ) way 2 is tenary, can be seen below out of comments, way 3 is in Pizza component */}
        {isOpen ? (
        <div className="order"> <p>We're Open until {closeHour}:00. Come visit us or order online.</p>
        <button className="btn">Order</button>
        </div>   
        ) : <p>We're happy to welcome you between {openHour}:00 to {closeHour}:00</p>} 
       </footer>
    )
 }
 interface PizzaProps{
    pizza: Pizza;
 }
 const Pizza: React.FC<PizzaProps> = ({pizza}) => {
    {/* way 3, Before the actual return, we could say,
        if(pizza.soldOut){
        return null}
        then the sold out pizza will not show up
        
        */}
    return (
        <>
        {/* conditionally rendering class name */}
        <li className={`pizza ${pizza.soldOut? "sold-out": ""}`}>
            <img src={pizza.photoName} alt={pizza.name} />
            <div>
                <h3>{pizza.name}</h3>
                <p>{pizza.ingredients}</p>
                {/* Conditionally rendering text */}
                <span>{pizza.soldOut ? 'SOLD OUT' : pizza.price}</span>
            </div>
        </li>
    </>
    );
 };
 export default App;