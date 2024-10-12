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

    console.log("Custom hook useOutsideClick fired");
    //custom hook initiates a React.useRef (tps://www.robinwieruch.de/react-ref/) 

    const ref = React.useRef(); 
    
    //What does useEffect do? by using this hook you tell React that 
    //your component needs to do something after a render.
    //useEffect is a Hook, so you can only call it at the top level 
    //of your component or your own Hooks. You can’t call it inside 
    //loops or conditions. 
    //https://react.dev/reference/react/useEffect#useeffect

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

    //The purpose of useEffect Hook here is to assign (and remove)  
    //an event listener(here: click event) on document level. After all, 
    //whenever the document gets clicked, the handler and the  
    //callback function you passed will run.
    React.useEffect(() => {
      const handleClick = (event) => {

        //What we want to accomplish: Execute the callback function only when 
        //anything outside of the passed ref (representing the button here) is clicked, 
        //not when the ref itself (or its content) gets clicked:

        //The reference assigned to 
        //the button is the border between triggering the button's event handler and the 
        //document's event handler. Everything clicked that's outside of the reference will 
        //be considered as an outside click.
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
  
      document.addEventListener('click', handleClick);
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [ref]);
  
    return ref;
  };
  
  export default useOutsideClick;