import { useState } from 'react';
import './styles.css'
interface FaqsType{
  title: string;
  text:string;
}
const faqs: FaqsType[] = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

interface AccordionPropsType{
  data: FaqsType[];
}

function App() {
  return (
    <div className="App">
      <Accordion data={faqs} />
    </div>
  );
}
function Accordion({data}: AccordionPropsType) : JSX.Element{
  return (
    <div className="accordion">
      {data.map((el, i) => <AccordionItem title={el.title} text = {el.text} num={i} key={el.title} />)}
    </div>
  )
}
interface AccordianItemPropsType{
  num: number;
  title: string;
  text: string;
}
function AccordionItem({num, title, text}:AccordianItemPropsType){
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function handleToggle(): void{
    setIsOpen(isOpen => !isOpen)
  }
  return (
    <div className={`item ${isOpen ? "open":""}`} onClick={handleToggle}>
        <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
        <p className="text">{title}</p>
        <p className="icon">-</p>
    {isOpen && <div className="content-box">{text}</div>}
    </div>
  )

}

export default App;
