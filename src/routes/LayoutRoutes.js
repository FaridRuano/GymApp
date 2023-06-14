import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../components/app'

import Dashboard from '../components/dashboard'
import Createplan from '../components/plans/create-plan'
import Listplan from '../components/plans/list-plan'
import Createpays from '../components/pays/create-pay'
import Listpays from '../components/pays/list-pay'
import Createasis from '../components/asis/create-asis'
import Listasis from '../components/asis/list-asis'
import Reports from '../components/reports/report'
import Profile from '../components/settings/profile'
import Createclient from '../components/clients/create-client'
import Listclient from '../components/clients/list-client'
import Listactives from '../components/actives/list-actives'
import Listreactive from '../components/actives/list-reactive'
import Createactive from '../components/actives/create-active'
import Listpesa from '../components/pesa/list-pesa'
import Createpesa from '../components/pesa/create-pesa'

const LayoutRoutes = () => {
  return (
    <Fragment>
        <Routes>
            <Route element={<App />}>
            <Route
							path={`${process.env.PUBLIC_URL}/dashboard`}
							element={<Dashboard />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/pays/list-pay`}
							element={<Listpays />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/pays/create-pay`}
							element={<Createpays />}
						/>

						<Route
							path={`${process.env.PUBLIC_URL}/asis/list-asis`}
							element={<Listasis />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/asis/create-asis`}
							element={<Createasis />}
						/>						
						<Route
							path={`${process.env.PUBLIC_URL}/plans/list-plan`}
							element={<Listplan />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/plans/create-plan`}
							element={<Createplan />}
						/>

						<Route
							path={`${process.env.PUBLIC_URL}/clients/list-client`}
							element={<Listclient />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/clients/create-client`}
							element={<Createclient />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/actives/list-actives`}
							element={<Listactives />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/actives/list-reactive`}
							element={<Listreactive />}
						/>	
						<Route
							path={`${process.env.PUBLIC_URL}/actives/create-active`}
							element={<Createactive />}
						/>	
						<Route
							path={`${process.env.PUBLIC_URL}/pesa/list-pesa`}
							element={<Listpesa />}
						/>	
						<Route
							path={`${process.env.PUBLIC_URL}/pesa/create-pesa`}
							element={<Createpesa />}
						/>															
						<Route
							path={`${process.env.PUBLIC_URL}/reports/report`}
							element={<Reports />}
						/>
						<Route 
							path={`${process.env.PUBLIC_URL}/settings/profile`}
							element={<Profile />}
						/>
												
                </Route>
        </Routes>
    </Fragment>
    )
}

export default LayoutRoutes