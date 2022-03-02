import React, { PureComponent } from 'react'


class App extends PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      name: 'nate'
    }
  }

  changeName = () => {
    this.setState({
      name: 'baoqi'
    })
  }

  render() {


    return <div>
      {this.state.name}
      <button onClick={this.changeName}>changeName</button>
    </div>
  }
  
}

export default App