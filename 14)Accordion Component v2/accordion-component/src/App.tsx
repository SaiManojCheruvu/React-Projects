import React, { useState } from 'react';
import './styles.css';

interface FaqsType {
  title: string;
  text: string;
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

interface AccordionPropsType {
  data: FaqsType[];
}

function App() {
  return (
    <div className="App">
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }: AccordionPropsType): JSX.Element {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          key={el.title}
          num={i}
          title={el.title}
          currOpen={openItemIndex}
          onOpen={setOpenItemIndex}>
            {el.text}
          </AccordionItem>
      ))}
    </div>
  );
}

interface AccordionItemPropsType {
  num: number;
  title: string;
  children: React.ReactNode;
  currOpen: number | null;
  onOpen: (num: number | null) => void;
}

function AccordionItem({ num, title, children, currOpen, onOpen }: AccordionItemPropsType): JSX.Element {
  const isOpen = num === currOpen;

  function handleToggle(): void {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? '-' : '+'}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

export default App;
