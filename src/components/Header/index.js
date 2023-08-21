import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {restaurantName, currentCount} = props
  return (
    <div className="nav-card">
      <h1 className="app-name">{restaurantName}</h1>
      <div className="card-container">
        <p className="dish-cost my-orders">My Orders</p>
        <div className="count-card">
          <p className="count">{currentCount}</p>
        </div>
        <AiOutlineShoppingCart className="cart" />
      </div>
    </div>
  )
}

export default Header
