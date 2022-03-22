import React from 'react';
import axios from 'axios';

import './index.sass';

class UserPage extends React.Component {
  state = {
    showInput: true,
    value: '',

    fullname: this.props.user.fullname,
    email: this.props.user.email,
    username: this.props.user.username,
    password: this.props.user.password,
    passwordConfirmation: this.props.user.password,
    phone: this.props.user.phone,
  };

  
  handleOnClick() {
    this.setState({
      showInput: !this.state.showInput,
    });
  }
  
  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit(e) {
    e.preventDefault();
    const { fullname, email, username, password, passwordConfirmation, phone } = this.state;
    console.log(this.state)
    axios.put(`/api/user/${this.props.user.username}`, {
      fullname,
      email,
      username,
      password,
      passwordConfirmation,
      phone,
    })
    .then(res => {
      console.log(res)
    }
    )
    .catch(err => {
      console.log(err)
    }
    )
    
  }


  render() {
    const { user } = this.props;
    const showInput = this.state.showInput;
    return (
      <div className="user-page">
        <div className='user-page-center'>
          <div className='user-page-content'>
            <div className='user-page-content-title'>Account Setting</div>
            <div className='up-content-bottom'>
              <div className='up-content-left'>
                <img src={user.avatar}/>
                <div className='up-content-left-btn'>
                  <label htmlFor="changeAvatar"><button>Change Avatar</button></label>
                  <input type="file" id="changeAvatar"/>
                </div>
              </div>
              <div className='up-content-right'>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <div className='up-form-label'>
                    <label htmlFor="name">Name</label>
                    <input
                      onChange={e => this.handleOnChange(e)}
                      disabled={showInput}
                      name="fullname"
                      value={ this.state.fullname || user.fullname}
                      type="text"
                      className="form-control"
                      id="name"/>
                  </div>
                  <div className='up-form-label'>
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={e => this.handleOnChange(e)}
                      disabled={showInput}
                      name="email"
                      value={ this.state.email || user.email}
                      type="email"
                      className="form-control"
                      id="email"/>
                  </div>
                  <div className='up-form-label'>
                    <label htmlFor="phone">Phone</label>
                    <input
                      onChange={e => this.handleOnChange(e)}
                      disabled={showInput}
                      name="phone"
                      value={ this.state.phone || user.phone}
                      type="text"
                      className="form-control"
                      id="phone"/>
                  </div>
                  <div className='up-form-label'>
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={e => this.handleOnChange(e)}
                      onClick={e => (e.target.type = 'text') && (e.target.value = '')}
                      disabled={showInput}
                      name="password"
                      value={ this.state.password || user.password}
                      type="password"
                      className="form-control"
                      id="password"/>
                  </div>
                  {
                    !showInput ?
                    (<div className='up-form-label'>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        onChange={e => this.handleOnChange(e)}
                        onClick={e => (e.target.type = 'text') && (e.target.value = '')}
                        disabled={showInput}
                        name="passwordConfirmation"
                        value={ this.state.passwordConfirmation || user.password}
                        type="password"
                        className="form-control"
                        id="confirmPassword"/>
                    </div>) : null
                  }
                  <input
                    onClick={() => this.handleOnClick()}
                    // type={`${showInput ? 'button' : 'submit'}`}
                    type='submit'
                    className='up-form-submit'
                    value={`${showInput ? 'Edit' : 'Save'}`}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
