import { useState } from "react";

{/* 
  How react works in background?
  Component: Description of UI, returns React elements, Blue print [Function]
  Component Instance: Using the component again and again [Function call]. 
                    - Actual physical manifestation of a component.
                    - Has it's own state and props
                    - Has a lifecycle(can be born, live or die)
                    - We might call it as component lifecycle and not component instance lifecycle
  React element: JSX is converted to React.createElement() function calls
                - A reactelement is the result of these function calls
                - This is the information necessary to create DOM elements and painted on screen as DOM elements

  */}

  {
    /*
    How rendering works?
    - We have a bunch of components and each component has one or more instances.
    - These component instances are actual physical components that live in our react application.
    - These component instances hold state and props.
    - As react calls these components instances, each component instance produces JSX and makes react.createElement() function calls and which inturn will produce a pure React Element.
    - These React elements will ultimately be transformed into DOM Elements (HTML) and be displayed on the UI on the screen.

    We have clear understanding about the first part of this process i.e writing components and component instances.
    However, we need to get hold of the second part of the process where the React Elements are created, rendered into HTML and displayed on the screen.
    The process involved in displaying components on the screen is.
    Render is Triggered: By updating the state some where
    Render Phase: React calls component functions and figures out how DOM should be updated
    Commit Phase: This is the actual render phase than the render phase itself, this is where react actually writes DOM updating, inserting or deleting elements.
    Browser paint: The elements are reflected on the UI
    There are 2 situations that trigger renders:
    1) Initial render of the application
    2) State is updated in one or more component instances(re-render).

    Catch:
    - The render process is triggered for the entire application.
    - In practice, it looks like react only re-renders the components where the state update happens, but that is not how it works behind the scenes.
    - Renders are not triggered immediately, but scheduled for when the type script engine has some free time. There is also batching of the multiple setState calls in the event handlers.

    What we thought mechanics of state would be?
    Updated state -> re-render -> view -> updated state ...
    - Not True #1: Rendering is updating the screen / DOM
    - Not True #2: React completely discards old view (DOM) on Re-Render.
    
    The actual RENDER PHASE:
    Component instances that triggered re-render -> React Elements -> New Virtual DOM.
    Eg: There is an initial render 
        COMPONENT TREE                                                             
              A                                                                 A
              |                                                                 |
        ---------------                                                 --------------------
        |      |      |                 State Update                    |        |         |
        B      C      D               ------------------->              B        C         D (Updated)
                      |                                                                 -------
                    -----                                                               |     |
                    |   |                                                               E     E
                    E   E

              
              |                                                                   |       
              V                                                                   V

        REACT ELEMENT TREE                                            UPDATED REACT ELEMENT TREE AKA VIRTUAL DOM
              A                                                                   A
              |                                                                   |
        ---------------                                                 -----------------------
        |      |      |                                                 |         |           |     
        B      C      D                                                 B         C           D(Updated)
                      |                                                                   -------------
                    -----                                                                 |           |
                    |   |                                                                 E(Updated)  E(Updated)
                    E   E
      Virtual DOM: Tree of all the react elements created from all the instances in the component tree.
                  - Cheap and fast to create multiple trees.
      - rendering a component will cause all of it's child components to be re-rendered as well(no matter if props changed or not) as in the above diagram if a state was update din the component D, the Component E will also get updated.
      - In other words, if there is an update in a component, all it's child components till the leaf node of the tree gets updated.
      - React doesn't know if the updation of parent causes child to re-render. Therefore, react plays a safe game and re-renders everything down the component tree.
      - Who DOM is not re-rendered, just a new Virtual DOM is created.

      Now, carriying forward the phase diagram we saw earlier.
                                    Component instances that triggered re-render 
                                                     |
                                                     V
                                               React Elements 
                                                     |
                                                     V 
                                               New Virtual DOM.
                                                      |
                                                      V
Current Fiber Tree(Before state update) -> Reconciliation + Diffing -> Updated Fiber Tree  -> List of DOM updates
                                            (Fibre)
   What is Reconciliation and why do we need it?
   - Why not update the entire DOM, whenever state changes happen somewhere in the app?
     Ans) It is wasteful: writing to DOM is relatively slow, Usually only a small part of the DOM needs to be updated.
   - React uses as much as existing DOM as possible, How?
     Ans) Reconsiliation: Deciding which DOM elements actually need to be inserted, updated, deleted in order to reflect the latest state changes.
         - Output of Reconsiliation is a list of state changes required to reflect the latest UI
         - Reconsiliation is the heart of React Engine.
         - This Reconciler never allows us to touch the DOM really, but tells the React what the next snapshot would look like based on state.
         - The current reconsiler is called Fiber
    THE RECONCILER: FIBER:
         REACT ELEMENT TREE:
                APP
      ------------------------
      |           |          |
    VIDEO        MODAL      BTN
                  |
                OVERLAY
                  |
              ----------
              |        |
              H3      BUTTON

                  |
                  V
        FIBER TREE:
        APP
         |
        VIDEO - MODAL - BTN
                  |
                OVERLAY
                  |
                  H3 - BUTTON
        - FIBER TREE: Internal Tree that has a fiber for each component instance and DOM element.
        - Fibers are not created on every re-render, instead they are a mutable data structure.
        - Fiber trees are never destroyed, instead they are mutated again and again
        - Therefore, this makes it a good place for the fibers to keep a track of current component state, props, side effects and list of used hooks and more.
        - So, the state, props of the components that we actually see on the screen are internally stored inside corresponding fiber in the fiber tree.
        - Each fiber has it's own queue of work to do like updating the state, updating refs, running registered side effects and updating DOM.
        - On careful observation, unlike a react tree, the fiber tree has a connection with parent to child and then all other siblings are connect with their co-siblings instead of their parent.
        - This data structure is called as Linked List, this makes it easier for react to process.
        - We can observe that both the trees not just has react elements but also regular DOM elements such as h3 and button elements in this example.
        - Work in fiber can be done asynchronosly, Rendering process that reconciler does can be split into chunks, can be prioritized and work can ve paused, reused or thrown away.
        - Everything happens behind the scenes invisibly.
        - Enables concurrent features like suspense and transitions.
        - Long renders wont block Type Script Engine.


      THE COMMIT AND THE BROWSER PAINT
      List of DOM Updates -> updated DOM 
      - React writes to DOM: insertions, deletions and updates(list of DOM updates are flushed to the DOM).
      - Committing in synchronous: DOM is updated in one go, it cannot be interrupted. This is necessary so that the DOM never shows partial results, ensuring a consistent UI(in sync with state all the times).
      - After the commit phase, complete the workInProgress fiber tree becomes the current tree for the next render cycle.
      - Then browser recieved the UI and does the browser paint.
      - The updated DOM phase in the commit phase is executed by the React DOM library and not react itself.
      - Using React Native, we can develop IOS and Android Applications.

    SUMMARY:
    1)Trigger: Happens only on initial render and state updates. Updated React Elements -> New Virtual DOM.
    2)Render Phase: 
          - Does not produce any visual output
          - Rendering a component also renders all of it's child components.
    3) Reconcilliation :  Finds the smallest number of DOM updates required to reflect the latest state update on the screen.
                        - This reconcillation works on a reconciler called fiber that holds the component state, props and queue of work.
                        - Computation of these DOM updates is performed by a diffing operator that step-by-step compares the elements in the new virtual DOM with the current fiber tree to see what has changed.
                        - Now, we get an updated Fiber tree along with List of DOM updates for the next step.
                        - It is important to note that the render phase is asynchronous i.e it can split work into chunks.
                        - We end up with an updated UI at commit phase by ensuring all the DOM upates.
                        - Now, it realizes that the DOM has been updated and paits all the updates.



                        Updated React Elements -> New Virtual DOM -> Reconcillation + Diffing -> Updated Fiber tree -> List of DOM Updates -> Updated DOM -> Updated UI on Screen
                                                                                    ^                                                         COMMIT PHASE        BROWSER PAINT
                                                                                    |
                                                                          Current fiber Tree


      In this project, go as long as you keep traversing within the first 3 tabs, if you are in Show more mode, it is preserved or if you are in show less mode it is preserved.
      But if you go to Tab 4 and come back the state is completely gone because it is a <DifferentComponent /> and the state is now reset.
      Therefore, Key is one way of making the working of the diffing algorithm easier.
      By passing unique key on every re-render. Diffing algorithms can find out the re-render and identify the changes easily.


      EVENTS:
      - Events walk through every element in the DOM tree called as capturing phase and walks back up through every element called as bubbling phase.
      - By default they listen to events on target and during bubbling phase
      - we can prevent bubbling with e.stopPropagation().
      - Now, that we know about bubbling, we can implement an important feature called as event delegation which is to handle multiple events centrally on the single parent element.
      EVENT DELEGATION:
      - Handling events for multiple elements centrally in one single parent element
      - Better for performance and memory as it needs only one handler function.
        Eg. There are 3 buttons
      - Add handler to parent (.options)
      - Check for target element (e.target)
      - If target is one of the <button> s, handle the event.

      HOW REACT HANDLES EVENTS:
      Consider the following code snippet:
      <button className='btn' onClick={()=>setLoading(true)} />
      What we expect to happen is:
      document.querySelector('.btn')
      .addEventListener('click', () => setLoading(true));
      But what happens is:
      document.querySelector('#root')
      .addEventListener('click', ()=>setLoading(true));
      React registers all the event handlers on the root DOM container. This is where all the events are handled.
      

   */  
  }
type ContentItem = {
  summary: string;
  details: string;
};

const content: ContentItem[] = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App():JSX.Element {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

console.log(<DifferentContent />)
{/* This gives an object of stuff in the console
   - $$type of is a security feature react gives against cross site scripting attacks
   If we made a function call as DifferentContent() instead of <Different Content />, 
   we would get a type: div in that object. React then see's it as a raw react element instead of component.

  
  */}

type TabbedProps = {
  content: ContentItem[];
};

function Tabbed({ content }: TabbedProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>
      {/* Now, because of using the key prop, each tab is a differenct component and being reset n every re-render. Look at the component tree, how each tab is a different component by switching */}
      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)!}  key={content.at(activeTab)?.summary}/>
      ) : (
        <DifferentContent />
      )}
      {/* If we did {TabContent({item: content.at(0)})}. Although, component is rendered on UI
          Go check the component tree, you wouldn't see the component at a normal level in the component tree but as a child to the current component and this state is different than the 
          actual TabContent() 's state. so even inside other component do not call the TabContent as TabContent() but <TabContent />
      */}
    </div>
  );
}

type TabProps = {
  num: number;
  activeTab: number;
  onClick: (num: number) => void;
};

function Tab({ num, activeTab, onClick }: TabProps):JSX.Element {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

type TabContentProps = {
  item: ContentItem;
};

function TabContent({ item }: TabContentProps):JSX.Element {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc(): void {
    setLikes(likes => likes + 1);
  }

  function handleUndoLater():void{
    setTimeout(handleUndo, 2000);
    //Batching not only happens inside the event handlers but als the timeouts.
    // If we were to use before React 18, it did multiple renders for every setState() but after and equal to react 18, it only did batch re-rendering.
  }
  function handleTripleInc():void{
    // setLikes(likes + 1);
    // setLikes(likes + 1);
    // setLikes(likes + 1);
    // If we did like this, the like count would be 1 because, at each setLikes() call, the value of the likes is still 0.
    // But now, on using a call back function, we would update it from the current value.
    setLikes(likes => likes + 1);
    setLikes(likes => likes + 1);
    setLikes(likes => likes + 1);
    // Now, this would actually updates the state.
  }
  console.log("This Message is printed only once cuz, the 2 setState()'s are batched and are rendered only once")
  function handleUndo():void{
    {/* These 2 setState()'s are batched and cause only a single re-render*/}
    setShowDetails(true);
    setLikes(0);
    console.log(likes) // previous shows up because, only after re-rendering this state is taken up up until then the previous value is still held(All this happens asynchronously).
    // If you click undo button twice, re-rendering does not happen because the state is already at it's default value.
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent():JSX.Element {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
