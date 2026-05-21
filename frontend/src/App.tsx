import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Discover from './pages/discover'
import Favorites from './pages/favorites'
import Create from './pages/create'
import SignIn from './pages/signin'
import ActivityDetail from './pages/activity-detail'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activities/:activityId" element={<ActivityDetail />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/create" element={<Create />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
