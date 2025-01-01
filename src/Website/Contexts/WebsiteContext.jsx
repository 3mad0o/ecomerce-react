import { createContext, use, useState } from "react";

const WebsiteContext = createContext();



const WebsiteProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [isCartSideOpen,setIsCartSideOpen] =useState(false);
    const [isLoading,setIsLoading] =useState(true);

    const addToCart = () => {
        setCartCount((prevCount) => prevCount + 1);
      };

      const toggleCartSide = () =>{
        setIsCartSideOpen((prev) => !prev);
      }

      const changeIsLoading = (value) =>{
        setIsLoading(value);
      }
   
   
      const values = {
        cartCount,
        addToCart,
        isCartSideOpen,
        toggleCartSide,
        isLoading,
        changeIsLoading
      };
    return (
      <WebsiteContext.Provider value={values}>
        {children}
      </WebsiteContext.Provider>
    );
   };
   
   export { WebsiteContext, WebsiteProvider };