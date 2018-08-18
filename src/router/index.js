import Vue from 'vue'
import Router from 'vue-router'

import IndexPage from '@/components/IndexPage'
import LoginPage from '@/components/LoginPage'
import LogoutPage from '@/components/LogoutPage'
import AuthPage from '@/components/AuthPage'

import ProfilePage from '@/components/profile/ProfilePage'
import InstructionPage from '@/components/profile/InstructionPage'
import ControlPanelPage from '@/components/profile/ControlPanelPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'IndexPage', component: IndexPage },
    { path: '/login', name: 'LoginPage', component: LoginPage },
    { path: '/logout', name: 'LogoutPage', component: LogoutPage },
    { path: '/oidc_callback', name: 'AuthPage', component: AuthPage },
    {
      path: '/profile',
      component: ProfilePage,
      redirect: { name: 'InstructionPage' },
      children: [
        {
          path: 'instruction',
          name: 'InstructionPage',
          component: InstructionPage
        },
        {
          path: 'settings',
          name: 'ControlPanelPage',
          component: ControlPanelPage
        }
      ]
    }
  ]
})
