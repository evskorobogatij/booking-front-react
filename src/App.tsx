import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import MainLayout from './components/layouts/MainLayout'
import SignInPage from './modules/Auth/SignInPage'
import RolesPage from './modules/Role/RolesPage'
import UsersPage from './modules/User/UsersPage'
import LabelsPage from './modules/Label/LabelsPage'
import DepartmentsPage from './modules/Department/DepartmentsPage'
import HospitalsPage from './modules/Hospital/HospitalsPage'
import CompaniesPage from './modules/Company/CompaniesPage'
import RatesPage from './modules/Rate/RatesPage'
import ApplicationSettingsPage from './modules/Application/ApplicationSettingsPage'

const App: React.FC = () => {
  return (
    // @ts-ignore*
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={SignInPage} exact />
        <MainLayout>
          <Route path="/" exact>
            {localStorage.getItem('auth') ? (
              <Redirect to="/users" />
            ) : (
              <Redirect to="/signin" />
            )}
          </Route>
          <Route path="/roles" component={RolesPage} exact />
          <Route path="/users" component={UsersPage} exact />
          <Route path="/labels" component={LabelsPage} exact />
          <Route path="/departments" component={DepartmentsPage} exact />
          <Route path="/hospitals" component={HospitalsPage} exact />
          <Route path="/companies" component={CompaniesPage} exact />
          <Route path="/rates" component={RatesPage} exact />
          <Route
            path="/application"
            component={ApplicationSettingsPage}
            exact
          />
        </MainLayout>
      </Switch>
    </BrowserRouter>
  )
}

export default App
