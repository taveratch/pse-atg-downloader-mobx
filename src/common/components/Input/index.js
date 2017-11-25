import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  height: 38px;
`
class Input extends React.PureComponent {

  static defaultProps = {
    onChange: () => {},
    type: 'text',
    defaultValue: ''
  }
  
  render() {
    return (
      <div key={this.props.defaultValue}>
        <span>{this.props.label}</span>
        <StyledInput 
          className="form-control" 
          type={this.props.type} 
          name={this.props.name} 
          placeholder={this.props.placeholder} 
          onChange={this.props.onChange}
          defaultValue={this.props.defaultValue}
        />
      </div>
    )
  }
}

export default Input