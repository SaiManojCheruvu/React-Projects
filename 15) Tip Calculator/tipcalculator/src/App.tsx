import React, { Dispatch, SetStateAction, useState } from 'react';


function App(): JSX.Element {
  return (
    <div className="App">
        <TipCalculator />
    </div>
  );
}

function TipCalculator():JSX.Element{
  const [bill, setBill] = useState<number>(0);
  const [percentage1, setPercentage1] = useState<number>(0);
  const [percentage2, setPercentage2] = useState<number>(0);
  const tip: number = bill * ((percentage1 + percentage2) / 2 / 100);
  function handleReset(): void{
    setBill(0);
    setPercentage1(0);
    setPercentage2(0);

  }
  return(
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage onSelect={setPercentage1} percentage={percentage1}>How did you like the service?</SelectPercentage>
      <SelectPercentage onSelect={setPercentage2} percentage={percentage2}>How did your friend like the service?</SelectPercentage>
      

      {bill > 0 && (<>
        <Output bill={bill} tip={tip}/>
        <Reset onReset={handleReset}/>
        </>)
      }
    </div>
  );
}

interface BillInputPropType{
  bill:number;
  onSetBill : Dispatch<SetStateAction<number>>;
}
function BillInput({bill, onSetBill}: BillInputPropType){
  return(
    <>
      <label>How much was your bill?</label>
      <input type='text' value={bill ?? ''} placeholder='Bill value' onChange={(e) => onSetBill(+e.target.value)} />

    </>
  );
}
interface SelectPercentagePropsType{
  children: React.ReactNode;
  percentage: number;
  onSelect: Dispatch<SetStateAction<number>>;
}
function SelectPercentage({children, percentage, onSelect}: SelectPercentagePropsType){
  return(
    <div>
      <label>{children}</label>
      <select value={percentage} onChange={(e) => onSelect(+e.target.value)}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay! (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing (20%)</option>
      </select>
    </div>
  )
}
interface OutputPropType{
bill : number;
tip: number;
}
function Output({bill, tip}: OutputPropType): JSX.Element{
  return <h3> You pay ${bill + tip} (${bill} + ${tip} tip) </h3>
}
interface ResetPropsType{
  onReset: () => void;
}
function Reset({onReset}: ResetPropsType): JSX.Element{
  return <button onClick={onReset}>Reset</button>
}
export default App;
