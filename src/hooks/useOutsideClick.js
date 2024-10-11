import * as React from "react";

/*    
  Now the custom hook can be used the following way in 
our React component: pass the event handler as callback 
function to the hook -- which executes whenever the document 
gets clicked. In addition, use the returned reference (here: ref) 
and assign it to the button HTML element: 
  See hacker9-stories-react-side-effects-useEffects-9 to on how to 
use React.useEffect

  See hacker10-stories-on-react-custom-hooks on how to create custom hooks
  See hacker14-stories-react-imperative-react on how to use React.useRef
*/
const useOutsideClick = (callback) => {

    //custom hook initiates a React.useRef (tps://www.robinwieruch.de/react-ref/) 
    const ref = React.useRef(); 
    
    //React's useEffect Hook takes two arguments: 
       //    1. The first argument is a function that runs our 
       //     side-effect. Example: localStorage.setItem('search', searchTerm)
       //    2. Dependency array of variables: []); 
       //
     //In our case, the side-effect function stores searchTerm into 
       //the browser's local storage. The second argument is a dependency
       //array of variables [searchTerm]. If one of these variables changes, 
       //the function for the side-effect is called. In our case, 
       //the function is called every time the searchTerm changes 
       //(e.g. when a user types into the HTML input field).    
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
  