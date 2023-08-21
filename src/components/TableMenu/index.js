import './index.css'

const TableMenuListItem = props => {
  const {tableMenuItem, tableMenuId, setItemId, currentOption} = props
  return (
    <li className="each-menu">
      <button
        type="button"
        className={`item-menu ${tableMenuId === currentOption && 'border-val'}`}
        onClick={() => setItemId(tableMenuId)}
      >
        {tableMenuItem}
      </button>
    </li>
  )
}

export default TableMenuListItem
