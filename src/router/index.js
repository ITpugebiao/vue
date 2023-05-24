import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '~/views/layout'

/* Router Moudles */
import systemRouter from './modules/system'
import infoRouter from './modules/info'

/* All Router Moudles */
export const publicRoutes = [
  infoRouter,
  systemRouter,
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        name: 'Welcome',
        component: () => import('~/views/welcome'),
        meta: {
          title: '首页',
          icon: 'el-icon-house',
          affix: true,
          keepAlive: true
        }
      },
      {
        path: '/financialAudit',
        name: 'financialAudit',
        component: () => import('~/views/financialAudit'),
        meta: {
          title: '财务审计',
          icon: 'el-icon-s-platform'
        }
      },
      {
        path: '/fineManagement',
        name: 'fineManagement',
        component: () => import('~/views/fineManagement'),
        meta: {
          title: '罚款管理',
          icon: 'el-icon-coin'
        }
      },
      {
        path: '/affiche',
        name: 'affiche',
        component: () => import('~/views/affiche'),
        meta: {
          title: '公告管理',
          icon: 'el-icon-document'
        }
      },
      {
        path: 'files',
        name: 'Files',
        component: () => import('~/views/files'),
        meta: {
          title: '共享文件',
          icon: 'el-icon-document'
        }
      }
    ]
  },
  {
    path: '/functionsManagement',
    component: Layout,
    redirect: '/functionsManagement/pugelog',
    children: [
      {
        path: 'pugelog',
        name: 'Pugelog',
        component: () => import('~/views/functionsManagement/pugelog'),
        meta: {
          title: '普歌日志',
          icon: 'el-icon-notebook-1'
        }
      },
      {
        path: 'meetingrecord',
        name: 'Meetingrecord',
        component: () => import('~/views/functionsManagement/meetingrecord'),
        meta: {
          title: '例会记录',
          icon: 'el-icon-s-ticket'
        }
      }
    ]
  },
  {
    path: '/contract',
    component: Layout,
    redirect: '/contract/manager',
    children: [
      {
        path: 'manager',
        name: 'Manager',
        component: () => import('~/views/contract/manager'),
        meta: {
          title: '合同管理',
          icon: 'el-icon-document-copy'
        }
      },
      {
        path: 'audit',
        name: 'Audit',
        component: () => import('~/views/contract/audit'),
        meta: {
          title: '合同审核',
          icon: 'el-icon-tickets'
        }
      },
      {
        path: 'charge',
        name: 'Charge',
        component: () => import('~/views/contractcharge/charge'),
        meta: {
          title: '合同缴费',
          icon: 'el-icon-orange'
        }
      }
    ]
  },
  {
    path: '/interview',
    component: Layout,
    redirect: '/interview/interviewManagement',
    children: [
      {
        path: '/interviewManagement',
        name: 'interviewManagement',
        component: () => import('~/views/interviewManagement'),
        meta: {
          title: '面试管理',
          icon: 'el-icon-set-up'
        }
      }
    ]
  },
  {
    path: '/slideshow',
    component: Layout,
    redirect: '/slideshow/controlling',
    children: [
      {
        path: '/controlling',
        name: 'controlling',
        component: () => import('~/views/controlling'),
        meta: {
          title: '轮播图管理',
          icon: 'el-icon-set-up'
        }
      }
    ]
  },
  {
    path: '/performance',
    component: Layout,
    redirect: '/performance/item',
    children: [
      {
        path: 'item',
        name: 'Item',
        component: () => import('~/views/performance/item'),
        meta: {
          title: '绩效项',
          icon: 'el-icon-s-help'
        }
      },
      {
        path: 'approver',
        name: 'Approver',
        component: () => import('~/views/performance/approver'),
        meta: {
          title: '审批人管理',
          icon: 'el-icon-orange'
        }
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('~/views/permission/register')
  },
  {
    path: '/404',
    component: () => import('~/views/err-page/404'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: publicRoutes,
  mode: 'hash'
})

const router = createRouter()

export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

const RouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return RouterPush.call(this, to).catch(err => err)
}

export default router
