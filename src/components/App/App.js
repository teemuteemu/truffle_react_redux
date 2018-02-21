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
      <div className="app">
        <main className="container">
          <div className="value">
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
