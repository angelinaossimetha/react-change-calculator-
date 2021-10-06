import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: 0,
      amountDue: 0,
      amountReceived: 0,
      changeDue: 0,
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  calculate(amountDue, amountReceived) {
    this.reset();
    const totalDue = Number(this.state.amountReceived - this.state.amountDue).toFixed(2);
    if (totalDue > 0) {
      this.setState({ success: 1 });
    } else if (totalDue < 0) {
      this.setState({ success: -1 });
    } else {
      this.setState({ success: 0 })
    }
    var difference = Math.abs(totalDue);
    this.setState({ changeDue: difference });


    if (difference > 0) {
      this.setState({ twenties: this.updateCount(20, difference) });
      difference = this.updateDifference(20, difference);
    }

    if (difference > 0) {
      this.setState({ tens: this.updateCount(10, difference) });
      difference = this.updateDifference(10, difference);
    }

    if (difference > 0) {
      this.setState({ fives: this.updateCount(5, difference) });
      difference = this.updateDifference(5, difference);
    }

    if (difference > 0) {
      this.setState({ ones: this.updateCount(1, difference) });
      difference = this.updateDifference(1, difference);
    }

    if (difference > 0) {
      this.setState({ quarters: this.updateCount(0.25, difference) });
      difference = this.updateDifference(0.25, difference);
    }

    if (difference > 0) {
      this.setState({ dimes: this.updateCount(0.10, difference) });
      difference = this.updateDifference(0.10, difference);
    }

    if (difference > 0) {
      this.setState({ nickels: this.updateCount(0.05, difference) });
      difference = this.updateDifference(0.05, difference);
    }

    if (difference > 0) {
      this.setState({ pennies: this.updateCount(0.01, difference) });
      difference = this.updateDifference(0.01, difference);
    }
  }

  /**
   * Caluclates and updates the amount in change due for a given currency type
   * @param {number} amount - The currency amount for given variable
   */
  updateCount(amount, difference) {
    return Math.floor(difference / amount);

  }

  /**
  * Calculates new remaining difference
  * @param {number} amount - The currency amount for given currency type
  */
  updateDifference(amount, difference) {
    return Number(difference % amount).toFixed(2);
  }

  handleClick(e) {
    e.preventDefault();
    const amountDue = this.state.amountDue;
    const amountReceived = this.state.amountReceived;
    this.calculate(amountDue, amountReceived);
  }

  /**
    * Reset all amount of change due to 0 
  */
  reset() {
    this.setState({ twenties: 0 });
    this.setState({ tens: 0 });
    this.setState({ fives: 0 });
    this.setState({ ones: 0 });
    this.setState({ quarters: 0 });
    this.setState({ dimes: 0 });
    this.setState({ ones: 0 });
    this.setState({ nickels: 0 });
    this.setState({ pennies: 0 });
  }

  render() {
    return (
      <div className="container">
        <div className='page-header'>
          <h1 style={{ color: "white" }}>Change Calculator</h1>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="panel-heading">Enter Information</div>
                <div className="form-group">
                  <label htmlFor="amountDue" className="control-label">How much is due?</label>
                  <input
                    name="amountDue"
                    value={this.state.amountDue}
                    onChange={this.handleChange}
                    type="number"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="amountReceived" className="control-label">How much was received?</label>
                  <input
                    name="amountReceived"
                    value={this.state.amountReceived}
                    onChange={this.handleChange}
                    type="number"
                    className="form-control"
                  ></input>
                </div>
                <div className="panel-footer">
                  <button type="submit"
                    onClick={this.handleClick}
                    name="submit"
                    className="btn btn-primary btn-lg btn-block form-control" >Calculate</button>
                </div>
              </div>
            </div>
          </div>



          <div className="col-md-8">
            <div className='panel'>
              <div className="panel-body">
                <div>
                  {
                    (this.state.success < 0) ? (
                      <div className="alert alert-danger" role="alert">The additional money owed is ${this.state.changeDue}</div>
                    ) : (this.state.success > 0) ? (
                      <div className="alert alert-success" role="alert" >The total change due is ${this.state.changeDue} </div>
                    ) : (
                      null
                    )
                  }
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="panel panel-default">
                      <div className="panel-footer">
                        <div className="panel-heading  text-center" style={{ fontWeight: 'bold' }}>Twenties</div>
                        <p name="twenties" className="change text-center" value={this.state.twenties}
                          onChange={this.handleChange}>{this.state.twenties}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="panel panel-default">
                      <div className="panel-footer">
                        <div className="panel-heading  text-center" style={{ fontWeight: 'bold' }}>Tens</div>
                        <p name="tens" className="change text-center" value={this.state.tens}
                          onChange={this.handleChange} >{this.state.tens}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="panel panel-default">
                      <div className="panel-footer">
                        <div className="panel-heading  text-center" style={{ fontWeight: 'bold' }}>Fives</div>
                        <p name="fives" className="change text-center" value={this.state.fives}
                          onChange={this.handleChange}>{this.state.fives}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="panel panel-default">
                      <div className="panel-footer">
                        <div className="panel-heading  text-center" style={{ fontWeight: 'bold' }}>Ones</div>
                        <p name="ones" className="change text-center" value={this.state.ones}
                          onChange={this.handleChange}>{this.state.ones}</p>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="panel panel-default">
                      <div className="panel-footer">
                        <div className="panel-heading  text-center" style={{ fontWeight: 'bold' }}>Quarters</div>
                        <p name="quarters" className="change text-center" value={this.state.quarters}
                          onChange={this.handleChange}>{this.state.quarters}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="panel panel-default">
                      <div className="panel-footer">
                        <div className="panel-heading  text-center" style={{ fontWeight: 'bold' }}>Dimes</div>
                        <p name="dimes" className="change text-center" value={this.state.dimes}
                          onChange={this.handleChange}>{this.state.dimes}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="panel panel-default">
                      <div className="panel-footer">
                        <div className="panel-heading  text-center" style={{ fontWeight: 'bold' }}>Nickels</div>
                        <p name="nickels" className="change text-center" value={this.state.nickels}
                          onChange={this.handleChange}>{this.state.nickels}</p>
                      </div>
                    </div>
                  </div>


                  <div className="col-md-3">
                    <div className="panel panel-default">
                      <div className="panel-footer">
                        <div className="panel-heading  text-center" style={{ fontWeight: 'bold' }}>Pennies</div>
                        <p name="pennies" className="change text-center" value={this.state.pennies}
                          onChange={this.handleChange}>{this.state.pennies}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    );
  }
}

export default App;
