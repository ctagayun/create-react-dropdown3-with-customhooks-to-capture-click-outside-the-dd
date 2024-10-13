
import * as React from "react";


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
       
    ); //eof return
  };
  
  export default Dropdown;