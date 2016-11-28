import React, { Component, PropTypes } from 'react';
import Table from './Table';


class App extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired
  }

  render() {
    return (
        <div className="row">
            <div className="col-sm-12 main">
                <h2 className="sub-header">Sensors List</h2>
                <div className="table-responsive">
                  <Table update={this.props.update} />
                </div>
            </div>
        </div>
    );
  }
}

export default App;
