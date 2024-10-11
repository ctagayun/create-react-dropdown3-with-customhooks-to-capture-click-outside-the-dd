import * as React from "react";

/*    
  Now the custom hook can be used the following way in 
our React component: pass the event handler as callback 
function to the hook -- which executes whenever the document 
gets clicked. In addition, use the returned reference (here: ref) 
and assign it to the button HTML element: 
*/
const useOutsideClick = (callback) => {

    //custom hook initiates a React.useRef (tps://www.robinwieruch.de/react-ref/) 
    const ref = React.useRef(); 
  
    //https://www.robinwieruch.de/react-useeffect-hook/
    React.useEffect(() => {
      const handleClick = (event) => {
        callback();
      };
  
      document.addEventListener('click', handleClick);
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, []);
  
    return ref;
  };
  