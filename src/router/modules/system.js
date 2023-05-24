/* Layout */
import Layout from '~/views/layout'

/* systemRouter */
const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/user',
  name: 'System',
  meta: { title: '系统管理', icon: 'el-icon-setting' },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('~/views/permission/user/index'),
      meta: { title: '用户管理', icon: 'el-icon-s-check' }
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('~/views/permission/role/index'),
      meta: { title: '角色管理', icon: 'el-icon-coin' }
    },
    {
      path: 'menu',
      name: 'Menu',
      component: () => import('~/views/permission/menu/index'),
      meta: { title: '菜单管理', icon: 'el-icon-menu' }
    },
    {
      path: 'systematic',
      name: 'Systematic',
      component: () => import('~/views/permission/systematic/index'),
      meta: { title: '系统管理', icon: 'el-icon-s-grid' }
    }
  ]
}

export default systemRouter
