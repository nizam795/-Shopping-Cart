
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './routes/AppRouter'
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <BrowserRouter>
    <Toaster position="top-right" />
     <AppRouter />
     </BrowserRouter>
    </>
  )
}

export default App


