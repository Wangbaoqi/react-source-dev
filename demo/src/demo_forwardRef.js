import React, { useRef } from 'react'







const logProps = (WrapperComponent) => {
  class LogProps extends React.Component {

    componentDidUpdate(prevProps: any) {

    }
    render() {
      const { forwardedRef, ...rest } = this.props;
      return <WrapperComponent {...rest} tref={forwardedRef}/>
    }
  }

  return React.forwardRef((props, ref) => <LogProps {...props} forwardedRef={ref}/>)
}


class FancyButton extends React.Component {

  render() {
    // console.log(this.props);
    
    return (
      <div ref={this.props.tref}>FancyButton</div>
    )
  }
}

const FancyButtonNew = logProps(FancyButton)

class ForwardRefs extends React.Component {

  ref = React.createRef();

  componentDidMount() {
    console.log(this.ref);
    
  }

  render() {

    return (
      <div>
        <p>Ref forward</p>
        <FancyButtonNew  ref={this.ref} />
         
      </div>
    )
  }
}

export default ForwardRefs