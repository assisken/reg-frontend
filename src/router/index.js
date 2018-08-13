import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import AuthPage from '@/components/AuthPage'
import IndexPage from '@/components/IndexPage'
import LoginPage from '@/components/LoginPage'
import LogoutPage from '@/components/LogoutPage'
import AuthPage from '@/components/AuthPage'

import ProfilePage from '@/components/profile/ProfilePage'
import AboutPage from '@/components/profile/AboutPage'
import InstructionPage from '@/components/profile/InstructionPage'

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
      children: [
        { path: 'about', name: 'AboutPage', component: AboutPage },
        {
          path: 'instruction',
          name: 'InstructionPage',
          component: InstructionPage
        }
      ]
    }
  ]
})
