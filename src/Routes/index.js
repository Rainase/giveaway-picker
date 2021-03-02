import { lazy } from 'react';
import { ROUTES } from './routes';

export const routes = (isLoggedIn) => {

if(!isLoggedIn) return [
  {path: '/terms', component: lazy(() => import('../Pages/Terms'))},
  {path: '/privacy', component: lazy(() => import('../Pages/Privacy'))},
  {path: '/*', component: lazy(() => import('../Pages/LandingPage'))},
]
return [
  {path: '/', component: lazy(() => import('../Pages/LandingPage'))},
  {path: '/terms', component: lazy(() => import('../Pages/Terms'))},
  {path: '/privacy', component: lazy(() => import('../Pages/Privacy'))},
  {path: `/app/ig/:id`, component: lazy(() => import('../Pages/InstagramAccounts'))},
  {path: `/app/:id`, component: lazy(() => import('../Pages/FacebookAccount'))},
  {path: `/app/:id/:postId`, component: lazy(() => import('../Pages/Post'))},
  {path: `${ROUTES.APP}`, component: lazy(() => import('../Pages/Dashboard'))},
  ]
}