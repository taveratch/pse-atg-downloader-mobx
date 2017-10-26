import React from 'react'
import { observer } from 'mobx-react'
import stores from 'src/stores'
import styled from 'styled-components'

const BlueText = styled.h1`
  color: blue;
`

@observer
class App extends React.Component {

  increase = () => {
    stores.counter.increase()
  }
  
  decrease = () => {
    stores.counter.decrease()
  }
  
  render() {
    return (
      <div>
        <BlueText>Counter game wih mobx</BlueText>
        <div>
          <button onClick={this.decrease}>-</button>
          <span>{stores.counter.number}</span>
          <button onClick={this.increase}>+</button>
        </div>
      </div>
    )
  }
}

export default App