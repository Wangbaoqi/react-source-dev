import React, { Component, PureComponent } from 'react'


class TestComponent extends Component {


  constructor(props) {
    super(props);
    this.state = {
      numbers: [1,2,3,4] 
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState, 'shouldComponentUpdate');
    return true
  }
  changeNumber() {
    const nums = this.state.numbers
    nums.pop()
    this.setState({
      numbers: nums
    })
  }
  
  render() {
    console.log('render comp');

    return (
      <div>
        TestComponent

        <button onClick={() => this.changeNumber()}>changeNumber</button>
        <p>数字改变:{this.state.numbers.map((e, i) => (<span key={i}>{e}</span>))}</p>
      </div>
    )
  }
}


class TestPureComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      // number: 0
      numbers: [1,2,3,4] 
    }
  }
  changeNumber() {
    const nums = this.state.numbers
    nums.pop()
    this.setState({
      numbers: nums
    })
  }
  
  render() {
    console.log('render pure');
    return (
      <div>
        TestPureComponent
        <button onClick={() => this.changeNumber()}>changeNumber</button>
        {/* <p>数字改变:{this.state.number}</p> */}

        <p>数字改变:{this.state.numbers.map((e, i) => (<span key={i}>{e}</span>))}</p>
      </div>
    )
  }
}


function App() {


  return (
    <div>
      <TestComponent />
      <TestPureComponent />
    </div>
  )
}

export default App


// TODO PureComponent 在更新引用类型的时候 不会执行render方法？
// ?在两者state的更新阶段有什么区别？