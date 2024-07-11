import React, { useState } from "react";

const messages: string[] = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

{/* Introduction to state, usage of useState() */}
{/* If we were to turn the step variable to let and update it directly in handlePrevious() 
  as step = step - 1 and in the handleNext() as step = step + 1, then it doesn't fire any error 
  but changes does not reflect. That is because the state can be updated only with the tools given by react that is setStep() as we destructure the useState()
  
  Note: If we are using same component multiple times, state is still isolated to one component.
  Eg: we used Counter state thrice they still they might have different count values
  
  */}
function App(): JSX.Element {
  const [step, setStep]: [number, React.Dispatch<React.SetStateAction<number>>] = useState<number>(1); // Initialize with step 1
  const [isOpen, setIsOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
  function handlePrevious(): void {
    //Setting state
    if (step > 1) {
      // Doing this is correct but we donot have access to curret statesetStep(step - 1);
      /* Eg: setStep(step - 1) 
             setStep(step - 1) won't get you back to 2 steps
             but passing a call back like this get's you access to current state and there by update the current state
             in a correct way
             setStep((currentStep) => currentStep - 1);

      */
     setStep((currentStep) => currentStep - 1)
    }
  }

  function handleNext(): void {
    //Setting state
    if (step < messages.length) {
      setStep(prevStep => prevStep + 1);
    }
  }

  return (
    <>
    <button className="close" onClick={() => setIsOpen(!isOpen)}>&times;</button>
    {isOpen && (
      <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`${step >= 3 ? "active" : ""}`}>3</div>
      </div>
      <p className="message">
        Step {step} : {step > 0 && step <= messages.length ? messages[step - 1] : ""}
      </p>
      <div className='buttons'>
        <button style={{backgroundColor: '#7950f2', color:'#fff'}} onClick={handlePrevious}>Previous</button>
        <button style={{backgroundColor: '#7950f2', color:'#fff'}} onClick={handleNext}>Next</button>
      </div>
    </div>)}
    </>
  );
}

export default App;
