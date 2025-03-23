import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Register1 from './pages/Register1';
import Warehouse from './pages/Register2';

function App() {

  return (
	<Router>
		<Routes>
			<Route path="/" element={<Home/>} />
      		<Route path="/home" element={<Home />} />
			<Route path="/register" element={<Register1 />} />
			<Route path="/warehouse" element={<Warehouse />} />
		</Routes>
	</Router>
  )
}

export default App
