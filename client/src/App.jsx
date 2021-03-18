import React, {useContext} from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import {AuthContext, AuthProvider} from './context/auth'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

const AuthRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Redirect to='/'/>
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

const HomeRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/login'/>
                )
            }
        />
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <HomeRoute path='/' exact component={Home}/>
                <AuthRoute path='/login' exact component={Login}/>
                <AuthRoute path='/signup' exact component={Signup}/>
            </Router>
        </AuthProvider>
    );
};

export default App;
