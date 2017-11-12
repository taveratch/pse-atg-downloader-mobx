import React from 'react'

const style = {
  inputStyle: {
    height: 38
  }
}
class InputWithLabel extends React.Component {
  render() {
    return (
      <div style={this.props.style}>
        <span>{this.props.label}</span>
        <input style={style.inputStyle} className='form-control' id={this.props.elementId} type="text" defaultValue={this.props.text}/>
      </div>
    )
  }
}

export default InputWithLabel