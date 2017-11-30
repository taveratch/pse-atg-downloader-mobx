import Actions from 'src/common/actions'
import React from 'react'
import styled from 'styled-components'

const Link = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export default props => (
  <div className={props.className}>
    <Link className="mr-2" onClick={() => { Actions.changePageLocale('en') }}>EN</Link> | <Link className="ml-2" onClick={() => { Actions.changePageLocale('th') }}>ไทย</Link>
  </div>
)