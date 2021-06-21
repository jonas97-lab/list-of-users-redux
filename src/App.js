import './App.css'
import Homepage from './containers/Homepage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Userpage from './containers/Userpage'

function App() {
	return (
		<Router>
			<div className='app'>
				<Switch>
					<Route exact path='/' component={Homepage} />
          <Route path='/user/:userId' component={Userpage} />
					<Route>404 Not Found!</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
