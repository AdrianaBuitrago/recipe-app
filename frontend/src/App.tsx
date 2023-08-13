import React from 'react'
import './styles.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import * as ROUTES from './routes'
import MainPage from 'components/MainPage'


const App: React.FC = () => {
  // Depends of your implementation of authentication
  const isLoggedIn = false

  return (
    <Router>
      {!isLoggedIn &&
        <Switch>
          <>
            <Redirect from={'*'} to={ROUTES.ROOT} />
            <Route path={ROUTES.ROOT}>
              <>
                <MainPage></MainPage>
              </>
            </Route>
          </>
        </Switch>
      }
      {isLoggedIn &&
        <div>
          {/* <AuthenticatedSwitch /> */}
        </div>
      }
    </Router>
  )
}

export default App
