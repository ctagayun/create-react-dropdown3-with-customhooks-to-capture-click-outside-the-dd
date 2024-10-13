import * as React from "react";
import "./App.css";
import useOutsideClick from "./hooks/useOutsideClick";

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
  //Initialize the state to zero
  const [count, setCount] = React.useState(0);

  //event handler for the dropdown click event
  const handleClick = () => {
    setCount((state) => count + 1);
  };

  const handleMenuOne = () => {
    console.log('clicked one');
    //alert ('Clicked menu1');
  };

  const handleMenuTwo = () => {
    console.log('clicked two');
    //alert ('Clicked menu2');
  };

  //This is the call back function passed to  useOutsideClick hook.
  //This function will reset the state thereby closing the dropdown
  const handleClickOutside = () => {
    setCount(0);
  };

  //Now let use the custom hook called "useOutsideClick" from "./hooks/useOutsideClick";
  // Now the custom hook can be used the following way in 
 //our React component: pass the event handler as callback 
 // function to the hook -- which executes whenever the document gets clicked.
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
          trigger={<button ref={ref} onClick={handleClick} >MenuDropdown</button>}
         
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

const Dropdown = ({ trigger, menu }) => {
  
  const [count, setCount] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
 
  return (
    <div className="dropdown">
       {React.cloneElement(trigger, {  //trigger is what opens the dropdown
        onClick: handleOpen,
      })}   
     
      {/* React's cloneElement API allows us to attach props to the passed trigger 
        element (here: opening/closing the dropdown, because it toggles the open 
        state within the dropdown component). */}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
               {/* replicate the menuitem in every iteration */}
               {React.cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick(); //high-level API that allows us to close the dropdown once a 
                                            //menu item in a dropdown is clicked while still preserving 
                                            //its native implementation (here: menuItem.props.onClick). 
                  setOpen(false);           //close the dropdwn
                  setCount((state) => state + 1);  //increments the state count. the number of times the list item was clicked
                },
              })}
            </li>
          ))}
       
        </ul>
      ) : null}
           Click Count: {count}
    </div>
     
  );
};

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