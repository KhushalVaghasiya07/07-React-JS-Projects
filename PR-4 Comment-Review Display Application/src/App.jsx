import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserRewiew from './Components/UserReview'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserRewiew/>
    </>
  )
}

export default App
