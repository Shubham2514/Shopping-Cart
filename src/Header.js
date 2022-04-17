import "./Header.css"

function Header(prop){

    return(<>
         <header>
         <div className="header-container">
         <p><img id="logo" src="./image/logo.jpg" alt="" /></p>
         <div className="cart-icon-div">
         <button id="cart-icon" onClick={prop.cartHandler}><img id="cart-icon-image" src="./image/CartIcon.png" alt="" /></button>
         <span id="cart-item-count">{prop.cartlength}</span>
         </div>
         </div>
         </header>
    </>)
}

export default Header