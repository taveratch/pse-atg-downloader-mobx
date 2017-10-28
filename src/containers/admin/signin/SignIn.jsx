import Header from 'src/containers/signin/Header'
import React from 'react'
import { adminSignin } from 'src/actions/auth'
import { connect } from 'react-redux'

class SignIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(event) {
        let state = {}
        state[event.target.name] = event.target.value
        this.setState(state)
    }

    handleClick() {
        let { username, password } = this.state
        this.props.adminSignin(username, password)
    }

    render() {
        return (
            <div className='h-100 w-100 bg-info'>
                <div className='container d-flex align-items-center h-100 justify-content-center'>
                    <div className='col-md-6 col-sm-10 col-xs-10 col-lg-6 box-shadow-heavy p-0 bg-faded'>
                        <Header title='Sign in' />
                        <div className='p-4'>
                            <input className='form-control' ref='username' name='username' placeholder='Username' onChange={this.handleChange.bind(this)} />
                            <input className='form-control mt-2' ref='password' name='password' type='password' placeholder='Password' onChange={this.handleChange.bind(this)} />
                            <button className='btn btn-second mt-4 w-100' onClick={this.handleClick.bind(this)} >Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { adminSignin })(SignIn)