import * as React from "react";
import "./App.css";
import useOutsideClick from "./hooks/useOutsideClick";
import Dropdown from "./customcontrols/dropdown";

/* 
  https://www.robinwieruch.de/react-hook-detect-click-outside-component

  Continue Reading: Event Capturing and Bubbling in React -https://www.robinwieruch.de/react-event-bubbling-capturing/

  This demo is a tutorial about how to detect a click outside of a React component 
  by creating a custom React hook for it. For example, you may want such custom React hook 
  FOR VARIOUS COMPONENTS like a dialog or dropdown, because they should close when a user 
  clicks outside of them. So we need a way to find out about this outside click.

  Objective: Next we want to reset the state (here: count) whenever a user
     clicks outside of the button
*/

const style = {
  padding: '10px',
  border: '1px solid black',
  display: 'flex',
  justifyContent: 'center',
};

const App = () => {
 // Initialize the state to zero
 const [count, setCount] = React.useState(0);

 
  const handleMenuOne = () => {
    console.log('clicked one');
    alert ('Clicked menu1');
  };

  const handleMenuTwo = () => {
    console.log('clicked two');
    alert ('Clicked menu2');
  };

  //Now let us use our custom hook

  //This is the call back function passed to  useOutsideClick hook.
  //This function will reset the state thereby closing the dropdown
  const handleClickOutside = () => {
    setCount(0);
  };

  //Now the custom hook can be used the following way: pass the event handler 
  //as callback to the hook -- which executes whenever the document gets clicked.
  //and returns "ref" whenever the document is clicked. Use the returned "ref"
  //and assigned it to the "button" HTML element. (see trigger)
  const ref = useOutsideClick(handleClickOutside);

 
  return (
     <> 
      <div>
        <h5 className="themeFontColor text-center">
          Dropdown Component
        </h5>
      </div>
      <hr />
       
       <div style={style} >
        <Dropdown  
          //Now we will use the "ref" returned by "useOutsideClick" 
          //be considered as an outside click.
          trigger={<button ref={ref}>MenuDropdown</button>}
         
          //populate the "menu" prop
          menu={[
            <button onClick={handleMenuOne}>Menu 1</button>,
            <button onClick={handleMenuTwo}>Menu 2</button>,
          ]}
      
        />
        </div>
    </>
  );
};


//However there is still logic of the dropdown component 
//sitting in its parent component App.js.

//When instantiating multiple dropdown components, this will 
//become repetitive logic in each parent component.

//So the next step shows how to elegantly move all repetitive 
//implementation details such as:
//   const handleOpen = () => {
//   const [open, setOpen] = React.useState(false);
//into the dropdown component by using 
//React's cloneElement API:


export default App;

/* 
 The reusable dropdown component is finished. What's missing is 
 the implementation detail to close the dropdown if a user 
 clicks outside of it. To do this go to: 

     React Hook: Detect Click outside of Component
     https://www.robinwieruch.de/react-hook-detect-click-outside-component/

 A tutorial about how to detect a click outside of a React component by creating 
 a custom React hook for it. So we need a way to find out about this outside click.   
*/