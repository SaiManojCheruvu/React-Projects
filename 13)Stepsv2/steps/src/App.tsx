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
  
  Note: If we are using the same component multiple times, state is still isolated to one component.
  Eg: If we used Counter state thrice, they still might have different count values.
  */}
function App(): JSX.Element {
  const [step, setStep] = useState<number>(1); // Initialize with step 1
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handlePrevious(): void {
    // Setting state
    if (step > 1) {
      // Use the functional form of setState to ensure we have the current state
      setStep((currentStep) => currentStep - 1);
    }
  }

  function handleNext(): void {
    // Setting state
    if (step < messages.length) {
      // Use the functional form of setState to ensure we have the current state
      setStep((prevStep) => prevStep + 1);
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
          <StepMessage step={step}>{messages[step-1]}</StepMessage>
          <div className='buttons'>
            <Button bgColor='#7950f2' textColor='#fff' onClick={handlePrevious}> <span>👈</span> Previous </Button>
            <Button bgColor='#7950f2' textColor='#fff' onClick={handleNext}> Next <span>👉</span> </Button>
          </div>
        </div>
      )}
    </>
  );
}
interface stepMessagePropsType{
  step: number;
  children: React.ReactNode;
}

function StepMessage({step, children}: stepMessagePropsType):JSX.Element{
  return (
    <div className="message">
    <h3>
      Step {step}: {children}
    </h3>
  </div>
  );
}

interface ButtonPropsType {
  textColor: string;
  bgColor: string;
  onClick: () => void;
  children: React.ReactNode;
  
}

function Button({ textColor, bgColor, onClick, children }: ButtonPropsType) {
  return (
    <button style={{ backgroundColor: bgColor, color: textColor }} onClick={onClick}>
    {/* Now if we look at the emojis, the emoji for left and right are plaed at the left of the button which is now a problem.
      We need to fix this using the "Children" prop. This is just a prop that takes the JSX up there and renders it here just like a hole.
    */}
      {children}
    </button>
  );
}

export default App;
