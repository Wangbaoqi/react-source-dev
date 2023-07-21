import React, { useLayoutEffect, useState, useEffect } from "react";

const Home = () => {
  const [count, setcount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setcount((count) => count + 1);
    }, 1000);

    setTimeout(() => {
      setcount(2);
    }, 1050);
  }, []);

  return (
    <div>
      {new Array(4000).fill(0).map((item, idx) => (
        <span key={idx} item={item}>
          {count}
        </span>
      ))}
    </div>
  );
};



class Index extends React.Component {

  state = {
    count: 0
  }

  btnRef = React.createRef(null)

  componentDidMount() {

    const btn = this.btnRef.current;
    setTimeout(() => {
      this.setState({ count: 2 })
    }, 1000);

    setTimeout(() => {
      btn.click()
    }, 1002);


    new Promise((resolve, reject) => {
      
    })
    
    // this.setState({count: 2})

    // this.setState((state, props) => {
    //   return {
    //     count: state.count + 1
    //   }
    // })
  }

  handleClick() {

    this.setState((state, props) => {
      return {
        count: state.count + 1
      }
    })
  }

  // 

  render() {

    console.log('render', this.state.count);

    return (
      <div >
        <button onClick={() => this.handleClick()} ref={this.btnRef}>
          add
        </button>
        {new Array(4000).fill(0).map((item, idx) => (
          <span key={idx} item={item} >
            {this.state.count}
          </span>
        ))}
      </div>
    )
  }

}

export default Index;
