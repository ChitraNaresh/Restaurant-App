import {AiTwotoneCiCircle} from 'react-icons/ai'
import './index.css'

const ProductItem = props => {
  const {eachItemObj, countBtn} = props
  const description = eachItemObj.dish_name.split('')
  const totalStr = description[0].toUpperCase() + description.slice(1).join('')
  const renderPlusAndMinus = () => (
    <div className="plus-minus-card">
      <button
        type="button"
        className="change-icon"
        onClick={() => countBtn(eachItemObj.dish_id, 0)}
      >
        -
      </button>
      <p>{eachItemObj.count}</p>
      <button
        type="button"
        className="change-icon"
        onClick={() => countBtn(eachItemObj.dish_id, 1)}
      >
        +
      </button>
    </div>
  )
  return (
    <li className="each-product-card">
      <div className="product-name-card">
        <div
          className={`show-color ${
            eachItemObj.dish_price <= 10 ? 'less-than-ten' : 'greater-than-ten'
          }`}
        >
          <AiTwotoneCiCircle />
        </div>
        <div className="product-about">
          <h1 className="dish-name">{totalStr}</h1>
          <p className="dish-cost">SAR {eachItemObj.dish_price}</p>
          <p className="dis-des">{eachItemObj.dish_description}</p>
          {eachItemObj.dish_Availability ? (
            renderPlusAndMinus()
          ) : (
            <p className="not-available">Not available</p>
          )}
          <p className="customization">
            {eachItemObj.addonCat.length > 0 && 'Customizations Available'}
          </p>
        </div>
      </div>
      <p className="dish-calories">{eachItemObj.dish_calories} calories</p>
      <div className="dish-image-card">
        <img
          src={eachItemObj.dish_image}
          alt={eachItemObj.dish_name}
          className="dish-image"
        />
      </div>
    </li>
  )
}

export default ProductItem
