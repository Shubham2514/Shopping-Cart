
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';

function App() {
  const [arr,setArr] = useState([]);
  const [copyArr,setCopyArr] = useState([]);
  const [showItem,setShowItem] =useState(true);
  const [showDescription,setShowDescription] = useState(false);
  const [id,setId] = useState();
  const [cart,setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [skip,setSkip] = useState(1);
  const [cartLength,setCartLength] = useState(0);
  const [total,setTotal] = useState(0);
async function addProfessor() {
    try {
      const options = {
        url: "http://api.products.luezoid.com/products?page=1",
        method: "GET",
        headers: { Authorization: "Bearer " + "ULxG9gG98KDGPql/BFI/woCN9T8=" },       
      };
      const response = await axios(options);
      setArr(response.data.data.items);
    } catch (error) {
      console.log("error im",error);
    }
  }
 
 function addToCopyArr(y){
   let pageMin = ((y-1)*6);
   let pageMax = pageMin + 6;  
   let a = arr.filter((data,index)=>{
      if(index >= pageMin && index < pageMax){
        return data;
      }
   })
    setCopyArr(a);
 }
  
  useEffect(()=>{
    addProfessor();
  },[]) 

  useEffect(()=>{
    console.log(arr)
    addToCopyArr(skip);
  },[arr])

  useEffect(()=>{
    addToCopyArr(skip);
  },[skip])
  
  function pageHandler(pageNumber){
    setSkip(pageNumber);
  }
 
 function descriptionHandler(id){
   setShowItem(false);
   setId(id);
   setShowDescription(true);
 }

 function backHandler(){
   setShowDescription(false);
   setId(0);
   setShowItem(true);
 }

 function cartHandler(){
   setShowDescription(false);
   setShowItem(false);
   setShowCart(true);
 }

 function cartBackHandler(){
   setShowCart(false);
   setShowItem(true);
 }

 function cartItemNumberHandler(){
  let length = 0;
  cart.map((data)=>{
    length += data.quantity;
  })
  setCartLength(length);
}

function totalAmountCalculator(){
  let x = 0;
   cart.map((data)=>{
      x += data.price*data.quantity;
   })
   setTotal(x);
}

 function addToCart(id,name,price){
   let add = true;
   if(cart.length>0){
   cart.map((data)=>{
     if(data.id === id){
        data.quantity += 1;
        add = false;
     }
   })
  }
  if(add){
   cart.push({id:id,name:name,quantity:1,price:price});
  }
  cartItemNumberHandler();
  totalAmountCalculator();
 }

 function addHandler(id){
   let x = cart.map((data)=>{
      if(data.id === id){
       data.quantity += 1;
     }
     return data;
   })
  setCart(x);
  cartItemNumberHandler();
  totalAmountCalculator();
 }

 function removeHandler(id){
   const copyCart = cart;
  let x = copyCart.filter((data,index)=>{
       if(data.id === id && data.quantity >1){
         data.quantity = data.quantity -1 ;
         return data;
       }
       else if(data.id === id && data.quantity === 1){
           let y = copyCart.filter((data)=>{
             if(data.id !== id){
               return data;
             }
             else{
               data.quantity = 0;
             }
           })
           return setCart(y);
       }
       else{
         return data;
       }
   })
   setCart(x);
   cartItemNumberHandler();
   totalAmountCalculator();
 }
 console.log(cart);


  return (
   <>
   <Header cartHandler={cartHandler} cartlength={cartLength}/>
   {showCart?
    <div className="cart">
    <table>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
    {cart.map((data)=>{
      return (
        <>
          <tr>
            <td>{data.name}</td>
            <td>{data.quantity}</td>
            <td>{data.price*data.quantity}</td>
            <td><button id="cart-item-remove-btn" onClick={()=>removeHandler(data.id)}>Remove</button></td>
            <td><button id='cart-item-add-btn' onClick={()=>addHandler(data.id)}>Add</button></td>
          </tr>
               </>
               )
    })}
    <tr>
            <td>Total</td>
            <td>{cartLength}</td>
            <td>{total}</td>
          </tr>
    </table>
    <button id='cart-back-btn' onClick={cartBackHandler}>Back</button>
    </div>
   :null}
   {showItem ?
    <div className="container">
   <div className="item-container">
     {copyArr.map((data)=>{
       return <div className="items" key={data.id}>
       <img key={data.id} onClick={()=>descriptionHandler(data.id)} id='items-image' src={data.bannerImage.url} alt="" /> 
       <p id='item-name'>{data.name}</p>
       <p id='item-price'>{data.price}</p>
       <button id='addToCartBtn' onClick={()=>addToCart(data.id,data.name,data.price)}>Add to Cart</button>   
       </div>
     })}
   </div>
   <div className="button-div">
       <button className='page-btn' onClick={()=>pageHandler(1)}>1</button>
       <button className='page-btn' onClick={()=>pageHandler(2)}>2</button>
       <button className='page-btn' onClick={()=>pageHandler(3)}>3</button>
       <button className='page-btn' onClick={()=>pageHandler(4)}>4</button>
     </div>
   </div>
   : null}
   {showDescription ?
   <div className="description">
   {arr.map((data)=>{
    if(data.id === id){
       return (
         <div className="description-main-div">
         <div className="description-left-div">
         <img id='description-image' src={data.bannerImage.url} alt="" />
         </div>
         <div className="description-right-div">
         <p className='description-heading'>Description</p>
         <p id='description-para'>{data.description}</p>
         <p className='description-heading'>Price</p>
         <p id='description-price'>{data.price}</p>
         <p className='description-heading'>Category</p>
         <p id='description-catagory'>{data.subCategory.name}</p>
         <button id='description-back-btn' onClick={backHandler}>Back</button>
         </div>
         </div>
         )
     }
   })}
   </div>
   :null}
   <Footer/>
   </>
  );
}

export default App;
