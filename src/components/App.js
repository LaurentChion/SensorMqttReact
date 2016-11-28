import React, { Component, PropTypes } from 'react';
import Table from './Table';
import logo from '../logo.svg';
import '../css/App.css'

class App extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired
  }

  render() {
    return (
        <div className="row">
            <div className="col-sm-12 main">
                <h1 className="sub-header"><img src={logo} className="App-logo" alt="logo" />Sensors List</h1>
                <div className="table-responsive">
                  <Table update={this.props.update} />
                </div>
            </div>
        </div>
    );
  }
}

export default App;
