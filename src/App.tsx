import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>CSS 475 Final Project</h1>
      <h2>Team: Team 1</h2>
      <h2>Members: Julia Nguyen, Jason Xu, Joel Yim, Tamir Michaely</h2>

      <div className="card">
        <div>
          <button onClick={() => setCount((count) => count + 1)}>
            Tamir1: List API (40 points)
          {count}
          </button>
        </div>
        <div>

        </div>
        <div>
          <button onClick={() => setCount((count) => count + 1)}>
            Tamir2: Complex Query (60 points)
          {count}
          </button>
        </div>
        <div>
          
        </div>
      </div>
    </>
  )
}

export default App
