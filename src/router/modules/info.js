/* Layout */
import Layout from '~/views/layout'

/* infoRouter */
const infoRouter = {
  path: '/info',
  component: Layout,
  name: 'Info',
  children: [
    {
      path: 'person',
      name: 'Person',
      component: () => import('~/views/info/person'),
      meta: { title: '个人信息', icon: 'el-icon-user-solid' }
    },
    {
      path: 'dimission',
      name: 'Dimission',
      /* webpackChunkName: "Info" */
      component: () => import('~/views/info/dimission'),
      meta: { title: '离职人员', icon: 'el-icon-s-custom' }
    }
  ]
}

export default infoRouter

