import { BrowserRouter, Routes, Route } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'

import HomeFeedPage from './pages/HomeFeedPage'
import NewPostPage from './pages/NewPostPage'
import ViewPostPage from './pages/ViewPostPage'
import EditPostPage from './pages/EditPostPage'
import Home from './pages/Home'
 
/* tnOozqiS5DvFHkOh */
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} >
            <Route path="/" index={true} element={<HomeFeedPage/>} />
            <Route path="/new-post" index={true} element={<NewPostPage />} />
            <Route path="/view-post/:id" index={true} element={<ViewPostPage />} />
            <Route path="/view-post/:id/edit" index={true} element={<EditPostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
