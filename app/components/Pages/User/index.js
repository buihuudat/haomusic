import React from 'react';
import './index.sass';

class UserPage extends React.Component {
  state = {
    showInput: true,
    value: '',
  }

  handleOnClick() {
    this.setState({
      showInput: !this.state.showInput,
    });
  }

  handleOnChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const { user } = this.props;
    const showInput = this.state.showInput;
    const value = this.state.value;
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
                <form>
                  <div className='up-form-label'>
                    <label htmlFor="name">Name</label>
                    <input
                      onChange={e => this.handleOnChange(e)}
                      disabled={showInput}
                      value={ value.length > 0 ? this.handleOnChange.value : user.fullname}
                      type="text"
                      className="form-control"
                      id="name"/>
                  </div>
                  <div className='up-form-label'>
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={e => this.handleOnChange(e)}
                      disabled={showInput}
                      value={ value.length > 0 ? this.handleOnChange.value : user.email}
                      type="email"
                      className="form-control"
                      id="email"/>
                  </div>
                  <div className='up-form-label'>
                    <label htmlFor="phone">Phone</label>
                    <input
                      onChange={e => this.handleOnChange(e)}
                      disabled={showInput}
                      value={ value.length > 0 ? this.handleOnChange.value : user.phone}
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
                      value={ value.length > 0 ? this.handleOnChange.value : user.password}
                      type="password"
                      className="form-control"
                      id="password"/>
                  </div>
                  <div className='form-btns'>
                    <input
                      onChange={e => this.handleOnChange(e)}
                      onClick={() => this.handleOnClick()}
                      type={'button'}
                      className='up-form-submit'
                      value={'Edit'}
                    ></input>
                    <input type={'submit'} className='up-form-submit' value='Save'/>
                  </div>
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
