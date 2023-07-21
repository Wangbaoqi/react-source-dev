import React, { useRef } from 'react'


const CustomComponent = React.lazy(() => import('./components/Header'))

const LazyCom = () => {

  return (
    <React.Suspense fallback={'loading'}>
      <CustomComponent />
    </React.Suspense>
  )
}

export default LazyCom