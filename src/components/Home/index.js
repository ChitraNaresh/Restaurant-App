import {useState, useEffect} from 'react'
import Header from '../Header'
import TableMenu from '../TableMenu'
import ProductItem from '../ProductItem'
import './index.css'

const Home = () => {
  const [dataValueObj, setData] = useState({isTrue: true, dataValue: []})

  const [currentOption, setOption] = useState('11')
  const [currentCount, setCount] = useState(0)
  const fetchRestaurantData = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099',
    )
    const data = await response.json()
    console.log(data)
    const createCount = eachItem1 => ({
      ...eachItem1,
      category_dishes: eachItem1.category_dishes.map(eachItem2 => ({
        ...eachItem2,
        count: 0,
      })),
    })
    const newData = data[0].table_menu_list.map(eachItem =>
      createCount(eachItem),
    )
    console.log(newData)
    const changeData = [{...data[0], table_menu_list: newData}]
    console.log(changeData)
    setData({isTrue: false, dataValue: changeData})
  }

  useEffect(() => {
    fetchRestaurantData()
  }, [])

  let activeMenuItems

  if (!dataValueObj.isTrue) {
    activeMenuItems = dataValueObj.dataValue[0].table_menu_list.filter(
      eachTabItem => eachTabItem.menu_category_id === currentOption,
    )
  }

  console.log(activeMenuItems)

  const countBtn = (id, sign) => {
    const createCount = eachItem2 => ({
      ...eachItem2,
      category_dishes: eachItem2.category_dishes.map(eachItem3 => {
        if (eachItem3.dish_id === id) {
          return sign === 1
            ? {...eachItem3, count: eachItem3.count + 1}
            : {
                ...eachItem3,
                count: eachItem3.count > 0 ? eachItem3.count - 1 : 0,
              }
        }
        return eachItem3
      }),
    })
    const newData = dataValueObj.dataValue[0].table_menu_list.map(eachItem =>
      eachItem.menu_category_id === currentOption
        ? createCount(eachItem)
        : eachItem,
    )
    console.log(newData)
    const changeData = [
      {...dataValueObj.dataValue[0], table_menu_list: newData},
    ]
    console.log(changeData)
    const checkDecrease = () => (currentCount > 0 ? currentCount - 1 : 0)

    setData({isTrue: false, dataValue: changeData})
    setCount(prevState => (sign === 1 ? prevState + 1 : checkDecrease()))
  }

  const renderHeaderAndData = () => {
    console.log(2)
    return (
      <>
        <Header
          restaurantName={dataValueObj.dataValue[0].restaurant_name}
          currentCount={currentCount}
        />
        <div className="home-container">
          <ul className="table-menu-container">
            {dataValueObj.dataValue[0].table_menu_list.map(eachItem => (
              <TableMenu
                tableMenuItem={eachItem.menu_category}
                tableMenuId={eachItem.menu_category_id}
                key={eachItem.menu_category_id}
                setItemId={id => setOption(id)}
                currentOption={currentOption}
              />
            ))}
          </ul>
          <div className="products-container">
            <ul className="product-card">
              {activeMenuItems[0].category_dishes.map(eachItemObj => (
                <ProductItem
                  eachItemObj={eachItemObj}
                  key={eachItemObj.dish_id}
                  countBtn={countBtn}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="home-card">
      {dataValueObj.isTrue ? <h1>Loading..</h1> : renderHeaderAndData()}
    </div>
  )
}

export default Home
