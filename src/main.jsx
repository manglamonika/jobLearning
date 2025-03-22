import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  RouterProvider, createBrowserRouter ,Route,createRoutesFromElements} from 'react-router-dom'
// import './index.css'
import App from './App.jsx'
import Home from './component/home/Home.jsx'
import Routes  from './Routes.jsx'
import About from './component/about/About.jsx'
import Job from './component/getStarted/Job.jsx'
import JobSeeker from './component/getStarted/jobSeeker/JobSeeker.jsx'  
import JobPoster from './component/jobPoster/JobPoster.jsx'
import Login from './component/register/Login.jsx'
import Register from './component/register/Register.jsx'
import Profile from './component/getStarted/edit/Profile.jsx'

// import { store } from '../../redux/my-react-app/src/store.jsx'
import {Provider} from 'react-redux'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Routes />}>
      <Route path="" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/job" element={<Job />} />
      <Route path="/jobseeker" element={<JobSeeker />} />
      <Route path="/jobPoster" element={<JobPoster />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Profile" element={<Profile />} />
       
</Route>

  )

);

createRoot(document.getElementById('root')).render(
  <StrictMode>

 <RouterProvider router={router} />
{/* <Provider store={store}> */}
{/* <App /> */}
{/* </Provider> */}
    
  </StrictMode>,
)
