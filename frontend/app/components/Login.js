import React, {Component} from 'react';
import {login} from '../utils/auth';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      username: '',
      password: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {username, password} = this.state;
    login(username, password).then(() => {
      location.href = '/';
    }).catch(() => {
      this.setState({
        error: 'Feil brukernavn eller passord'
      });
    });

  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const {error} = this.state;
    const errorMessage = error ? <div className="alert alert-danger" role="alert">{error}</div> : null;

    return (
      <div>
      {errorMessage}
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Brukernavn</label>
          <input type="text" className="form-control" id="username" placeholder="Brukernavn" name="username" value={this.state.username} onChange={this.handleUsernameChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Passord</label>
          <input type="password" className="form-control" id="password" placeholder="Passord" name="password" onChange={this.handlePasswordChange} />
        </div>
        <button type="submit" className="btn btn-default">Logg inn</button>
        </form>
      </div>
  );
  }
}

export default Login;