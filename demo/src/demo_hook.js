
import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback, 
  useMemo,
  useReducer,
  useRef,
  useContext,


} from 'react'


const HookState = () => {

  const [count, setcount] = useState(0);

  const updateCount = () => {
    // setcount(count => count + 0)
    setcount(count => count + 1)
    setcount(count => count + 2)
    setcount(count => count + 3)
  }
  return (
    <div onClick={() => updateCount()}>
      {count}
    </div>
  )
}


const HookEffect = () => {


  useEffect(() => {
  
    
    return () => {
      second
    }
  }, [])


  return (
    <div>

    </div>
  )
  
}

export default HookEffect

