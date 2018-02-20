import React, { Component } from 'react'

import './App.css'

class App extends Component {
  onClick() {
    const value = parseInt(this.refs.input.value, 10);
    const { set } = this.props;

    set(value);
    this.refs.input.value = '';
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <p>The stored value is: {this.props.value}</p>
            <input type="text" ref="input"></input>
            <button onClick={this.onClick.bind(this)}>Set</button>
          </div>
        </main>
      </div>
    );
  }
}

export default App
