import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC = () =>  {
  const [advice, setAdvice] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const getAdvice = async () =>{
      const response = await fetch('https://api.adviceslip.com/advice')
      const data = await response.json();
      setAdvice(data.slip.advice);
      setCount((c)=> c + 1);
  }

  useEffect(function(){
    getAdvice();
  }, []);
  return (
    <div className="App">
      <h1> {advice}</h1>
      <button onClick={getAdvice}>Get advice</button>
      <Message count = {count} />
    </div>
  );
}
interface MessageProps{
  count: number;
}
const Message: React.FC<MessageProps> = ({count}) =>{
  return (
    <p> You have read <strong>{count}</strong> pieces of advice</p>
  )
}

export default App;
