import { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import Forgot_Password from '../pages/Login/Forgot_Password'

import AdminMain_Panel from '../pages/AdminMain_Panel/AdminMain_Panel'
import Admin_Panel from '../pages/Admin_panel/Admin_Panel'

import Edit_Profile_Admin from '../pages/Admin_panel/Edit_Profil'
import Edit_Profile from '../pages/AdminMain_Panel/Manage_Profile/Edit_Profile'
import Change_Username from '../pages/AdminMain_Panel/Manage_Profile/Change_Username'
import Change_Password from '../pages/AdminMain_Panel/Manage_Profile/Change_Password'
import Change_Email from '../pages/AdminMain_Panel/Manage_Profile/Change_Email'

import Manage_Contact from '../pages/AdminMain_Panel/Manage_Contact/Manage_Contact'
import Edit_Contact from '../pages/AdminMain_Panel/Manage_Contact/Edit_Contact'

import Data_Teacher from '../pages/AdminMain_Panel/Manage_Teachers/Data_Teacher'
import Manage_Teacher from '../pages/AdminMain_Panel/Manage_Teachers/Manage_Teacher'
import Edit_Teacher from '../pages/AdminMain_Panel/Manage_Teachers/Edit_Teacher'
import Add_Teacher from '../pages/AdminMain_Panel/Manage_Teachers/Add_Teacher'

import Data_Student from '../pages/AdminMain_Panel/Manage_Students/Data_Student'
import Manage_Student from '../pages/AdminMain_Panel/Manage_Students/Manage_Student'
import Edit_Student from '../pages/AdminMain_Panel/Manage_Students/Edit_Student'
import Add_Student from '../pages/AdminMain_Panel/Manage_Students/Add_Student'

import Data_Classroom from '../pages/AdminMain_Panel/Manage_Grades/Data_Grade'
import Manage_Classroom from '../pages/AdminMain_Panel/Manage_Grades/Manage_Grade'
import Edit_Classroom from '../pages/AdminMain_Panel/Manage_Grades/Edit_Grade'
import Add_Classroom from '../pages/AdminMain_Panel/Manage_Grades/Add_Grade'

import Data_Admin from '../pages/AdminMain_Panel/Manage_Admins/Data_Admin'
import Manage_Admin from '../pages/AdminMain_Panel/Manage_Admins/Manage_Admin'
import Edit_Admin from '../pages/AdminMain_Panel/Manage_Admins/Edit_Admin'
import Add_Admin from '../pages/AdminMain_Panel/Manage_Admins/Add_Admin'

import SessionContext from './session/SessionContext';

export default class Routes extends Component {

    render() {

        let { state: { user } } = this.context;

        return (
            <Switch>

                <Route path="/" component={props => (
                    <Home {...props} />
                )} exact />

                <Route path="/login" render={props => user.token ?
                    <Redirect {...props} to="/panel" /> :
                    <Login {...props} />
                } />

                <Route path="/panel" render={props => {
                    if (user.RoleID === 0) {
                        return <AdminMain_Panel {...props} />
                    } else if (user.RoleID === 1) {
                        return <Redirect {...props} to="/subpanel" />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/subpanel" render={props => user.token ?
                    <Admin_Panel {...props} /> :
                    <Redirect {...props} to="/" />
                } />

                <Route path="/profile/Social Media" render={props => {
                    if (user.RoleID === 0) {
                        return <Manage_Contact {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/profile/Social/:name" render={props => {
                    if (user.RoleID === 0) {
                        return <Edit_Contact {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/teacher/manage" render={props => {
                    if (user.RoleID === 0) {
                        return <Manage_Teacher {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/teacher/data" render={props => {
                    if (user.RoleID === 0) {
                        return <Data_Teacher {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/teacher/create" render={props => {
                    if (user.RoleID === 0) {
                        return <Add_Teacher {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/teacher/update-delete/:id" render={props => {
                    if (user.RoleID === 0) {
                        return <Edit_Teacher {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/classroom/manage" render={props => {
                    if (user.RoleID === 0) {
                        return <Manage_Classroom {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/classroom/data" render={props => {
                    if (user.RoleID === 0) {
                        return <Data_Classroom {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/classroom/create" render={props => {
                    if (user.RoleID === 0) {
                        return <Add_Classroom {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/classroom/update-delete/:id" render={props => {
                    if (user.RoleID === 0) {
                        return <Edit_Classroom {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/admin/manage" render={props => {
                    if (user.RoleID === 0) {
                        return <Manage_Admin {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/admin/data" render={props => {
                    if (user.RoleID === 0) {
                        return <Data_Admin {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/admin/create" render={props => {
                    if (user.RoleID === 0) {
                        return <Add_Admin {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/admin/update-delete/:id" render={props => {
                    if (user.RoleID === 0) {
                        return <Edit_Admin {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/profile/manage" render={props => {
                    if (user.RoleID === 0) {
                        return <Edit_Profile {...props} />
                    } else {
                        return <Redirect {...props} to="/adminprofile/manage" />
                    }
                }} />

                <Route path="/adminprofile/manage" render={props => {
                    if (user.RoleID === 1) {
                        return <Edit_Profile_Admin {...props} />
                    } else {
                        return <Redirect {...props} to="/" />
                    }
                }} />

                <Route path="/forgot password" component={Forgot_Password} />

                <Route path="/profile/username" component={Change_Username} />
                <Route path="/profile/password" component={Change_Password} />
                <Route path="/profile/email" component={Change_Email} />

                <Route path="/student/manage" component={Manage_Student} />
                <Route path="/student/data" component={Data_Student} />
                <Route path="/student/create" component={Add_Student} />
                <Route path="/student/update-delete/:id" component={Edit_Student} />
            </Switch>
        );
    }
}

Routes.contextType = SessionContext;