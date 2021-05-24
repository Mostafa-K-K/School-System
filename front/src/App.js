import { Component } from 'react'
import Routes from './components/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import SessionProvider from './components/session/SessionProvider'
import './App.css'

export default class App extends Component {

    render() {
        return (
            <Router>
                <SessionProvider>
                    <Routes />
                </SessionProvider>
            </Router>
        );
    }
}