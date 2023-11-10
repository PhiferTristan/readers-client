import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'

export default function App() {

  return (
    <>
      <div className='min-h-screen bg-gradient-to-b from-gray-900'>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='home' element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

