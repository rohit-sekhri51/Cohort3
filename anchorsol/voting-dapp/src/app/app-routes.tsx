import { UiLayout } from '@/components/ui/ui-layout'
import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const AccountListFeature = lazy(() => import('../components/account/account-list-feature'))
const AccountDetailFeature = lazy(() => import('../components/account/account-detail-feature'))
const ClusterFeature = lazy(() => import('../components/cluster/cluster-feature'))
const VotingdappFeature = lazy(() => import('../components/votingdapp/votingdapp-feature'))
const DashboardFeature = lazy(() => import('../components/dashboard/dashboard-feature'))

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Votingdapp Program', path: '/votingdapp' },
]

const routes: RouteObject[] = [
  { path: '/account/', element: <AccountListFeature /> },
  { path: '/account/:address', element: <AccountDetailFeature /> },
  { path: '/votingdapp', element: <VotingdappFeature /> },
  { path: '/clusters', element: <ClusterFeature /> },
]

export function AppRoutes() {
  const router = useRoutes([
    { index: true, element: <Navigate to={'/dashboard'} replace={true} /> },
    { path: '/dashboard', element: <DashboardFeature /> },
    ...routes,
    { path: '*', element: <Navigate to={'/dashboard'} replace={true} /> },
  ])
  return <UiLayout links={links}>{router}</UiLayout>
}
