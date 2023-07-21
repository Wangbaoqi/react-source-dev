import React, { Component, memo } from 'react'




function MemoDemo(props) {


  return (
    <div>
      {props.name}
    </div>
  )
}


const MyMemo = memo(MemoDemo)


class MemoClass extends Component<Props> {


  constructor(props: Props) {
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
    return (
      <div>
        <MyMemo name={this.state.name}/>

        <button onClick={this.changeName}>changeName</button>
      </div>
    )
  }
}




export default MemoClass