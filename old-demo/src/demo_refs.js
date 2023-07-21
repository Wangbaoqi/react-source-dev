import React, { Component, memo, createRef } from 'react'




function MemoDemo(props) {


  return (
    <div>
      {props.name}
    </div>
  )
}




class RefsClass extends Component<Props> {

  ref = createRef()

  constructor(props: Props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  
  componentDidMount() {

    console.log(this.ref, 'ref');
  }

  changeName = () => {
    if(this.ref) {
      console.log(this.ref.current);
      this.setState({
        text: this.ref.current.value
      })
    }
  }

  render() {
    return (
      <div>

        <input type="text" ref={this.ref}/>

        <button onClick={this.changeName}>changeName</button>
        <p>{this.state.text}</p>
      </div>
    )
  }
}




export default RefsClass