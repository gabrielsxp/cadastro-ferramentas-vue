
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      { path: '/painel', name: 'painel', component: () => import('pages/UserPanel.vue') },
      { path: '/relacao', name: 'relacao', component: () => import('pages/Relationship.vue') },
      { path: '/cadastro', name: 'cadastro', component: () => import('pages/Users.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
