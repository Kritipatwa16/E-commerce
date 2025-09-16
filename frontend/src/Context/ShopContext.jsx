
import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null);

const getDefaultCart = () =>{
        let cart = {};
        for(let index = 0; index < 300+1; index++){
            cart[index] = 0;
        }
        return cart;
    }

const   ShopContextProvider = (props) =>{
   
    const[all_product,setAll_Product]=useState([]);
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    
    const [cartItems,setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
       
fetch(backendUrl+'/allproducts').then((response)=>response.json()).then((data)=>setAll_Product(data))

if(localStorage.getItem('auth-token')){
    fetch(backendUrl+'/getcart',{
        method:'POST',
        headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json'
        },
        body:"",
    }).then((response)=>response.json()).then((data)=>setCartItems(data));
}


    },[])
    
    

   const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId] + 1}));
        if(localStorage.getItem('auth-token')){
            fetch(backendUrl+'/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
                     })
                     .then((response)=>response.json()).then((data)=>console.log(data.message));
        }
     } 
     
     const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
           fetch(backendUrl+'/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
                     })
                     .then((response)=>response.json()).then((data)=>console.log(data.message));
                    }
     }  

     const getTotalCartAmount = ()=>{
        let totalAmount =0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item));
                totalAmount +=itemInfo.new_price*cartItems[item];
            }
            
        }
        return totalAmount;
     }
    
     const getTotalCartItems = ()=>{
            let totalItem =0;
            for(const item in cartItems){
                if(cartItems[item]>0){
                    totalItem+=cartItems[item];
                }
            }
            return totalItem;

     }
     const contextvalue = { getTotalCartItems ,getTotalCartAmount ,all_product, cartItems,addToCart,removeFromCart,backendUrl}
    return(
        <ShopContext.Provider value={contextvalue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider