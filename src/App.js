import * as React from "react";
import "./App.css";
import useOutsideClick from "./hooks/useOutsideClick";

const App = () => {
  //Move this to the dropdown component
  //const [open, setOpen] = React.useState(false);

   //Move this to the dropdown component
  // const handleOpen = () => {
  //   setOpen(!open);
  // };

  const handleMenuOne = () => {
    console.log('clicked one');
    //alert ('Clicked menu1');
  };

  const handleMenuTwo = () => {
    console.log('clicked two');
    //alert ('Clicked menu2');
  };

  const style = {
    padding: '10px',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
  };

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
          //populate the "trigger" prop
          trigger={<button >Show Dropdown</button>}
         
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
  //Code to handle outside click
  const [count, setCount] = React.useState(0);
 // const handleClick = () => {
 //   setCount((state) => state + 1);
 // };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
     
    <div className="dropdown">
       {React.cloneElement(trigger, {  //trigger is what opens the dropdown
        onClick: handleOpen,
      })}   
     
      {/* React's cloneElement API allows us to attach props to the passed trigger element (here: opening/closing the dropdown, because it toggles the open state within the dropdown component). */}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
               {/* replicate the menuitem in every iteration */}
               {React.cloneElement(menuItem, {
                onClick: () => {
                  // Furthermore, the high-level API allows us to 
                  //close the dropdown once a menu item in a native
                  //dropdown is clicked while still preserving its 
                  //implementation (here: menuItem.props.onClick).
                  menuItem.props.onClick(); //closes the dropdown and preserve implementation
                  setOpen(false); //close the dropdwn
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