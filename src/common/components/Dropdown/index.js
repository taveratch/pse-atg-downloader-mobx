import React from 'react'
import styled from 'styled-components'

const DropdownItem = styled.span`
  white-space: normal;
  cursor: pointer;
  display: flex;
  align-items: center;
  span {
    flex: 1;
  }
`

export default props => {
  const { itemSelector, id, items, onItemClick, initialLabel } = props
  return (
    <div className="dropdown">
      <DropdownItem className="w-100 btn btn-secondary dropdown-toggle" id={id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span>{initialLabel}</span>
      </DropdownItem>
      <div className="w-100 dropdown-menu dropdown-menu-left" aria-labelledby={id}>
        {
          items.map((item, i) => <DropdownItem key={i} className='dropdown-item' onClick={() => { onItemClick(i, item) }}><span>{itemSelector(item)}</span></DropdownItem>)
        }
      </div>
    </div>
  )
}