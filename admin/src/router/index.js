import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/login/login'                     // 登录
import home from '@/components/home'                        // home
import homeIndex from '@/components/homeIndex'              // homeIndex
import base from '@/views/system/base'                      // 网站基本设置
import links from '@/views/links/list'                      // 友情链接
import linksDetail from '@/views/links/detail'
import admin from '@/views/admin/list'                      // 管理员
import adminDetail from '@/views/admin/detail'
import message from '@/views/message/list'                  // 留言
import messageDetail from '@/views/message/detail'
import banner from '@/views/banner/list'                    // banner
import bannerDetail from '@/views/banner/detail'
import newsType from '@/views/news/type'                    // news -> type
import newsEdit from '@/views/news/edit'
import news from '@/views/news/list'                        // news
import newsDetail from '@/views/news/detail'
import placeType from '@/views/lease/placeType'             // lease -> type -> place
import placeEdit from '@/views/lease/placeEdit'
import areaType from '@/views/lease/areaType'               // lease -> type -> area 
import areaEdit from '@/views/lease/areaEdit'
import moneyType from '@/views/lease/moneyType'             // lease -> type -> money
import moneyEdit from '@/views/lease/moneyEdit'
import tagType from '@/views/lease/tagType'                 // lease -> type -> tag
import tagEdit from '@/views/lease/tagEdit'
import lease from '@/views/lease/list'                      // lease
import leaseDetail from '@/views/lease/detail'


Vue.use(Router)

export default new Router({
    // mode: 'history',                // 路由模式 history、hash
    linkActiveClass: 'active',      // 设置 链接激活时使用的 CSS 类名
    routes: [
        {
            path: '/',
            name: '_index',
            redirect: '/login'      // 重定向
        },{
            path: '/login',
            name: '_login',
            component: login
        },{
            path: '/home',
            name: '_home',
            component: home,
            redirect: '/home/index',
            children: [
                {
                    path: 'index',
                    name: '_homeIndex',
                    component: homeIndex
                },{
                    // 网站设置
                    path: 'base',
                    name: '_base',
                    component: base
                },{
                    // 友情链接
                    path: 'links',
                    name: '_links',
                    component: links
                },{
                    path: 'links/:id(\\d+|add)',
                    name: '_linksDetail',
                    component: linksDetail
                },{
                    // 管理员
                    path: 'admin',
                    name: '_admin',
                    component: admin
                },{
                    path: 'admin/:id(\\d+|add)',
                    name: '_adminDetail',
                    component: adminDetail
                },{
                    // 留言
                    path: 'message',
                    name: '_message',
                    component: message
                },{
                    path: 'message/:id(\\d+)',
                    name: '_messageDetail',
                    component: messageDetail
                },{
                    // banner
                    path: 'banner',
                    name: '_banner',
                    component: banner
                },{
                    path: 'banner/:id(\\d+)',
                    name: '_bannerDetail',
                    component: bannerDetail
                },{
                    // news -> type
                    path: 'news/type',
                    name: '_newsType',
                    component: newsType
                },{
                    path: 'news/type/:id(\\d+|add)',
                    name: '_newsEdit',
                    component: newsEdit
                },{
                    // news
                    path: 'news',
                    name: '_news',
                    component: news
                },{
                    path: 'news/:id(\\d+|add)',
                    name: '_newsDetail',
                    component: newsDetail
                },{
                    // lease -> type -> place
                    path: 'lease/type/place',
                    name: '_placeType',
                    component: placeType
                },{
                    path: 'lease/type/place/:id(\\d+|add)',
                    name: '_placeEdit',
                    component: placeEdit
                },{
                    // lease -> type -> area
                    path: 'lease/type/area',
                    name: '_areaType',
                    component: areaType
                },{
                    path: 'lease/type/area/:id(\\d+|add)',
                    name: '_areaEdit',
                    component: areaEdit
                },{
                    // lease -> type -> money
                    path: 'lease/type/money',
                    name: '_moneyType',
                    component: moneyType
                },{
                    path: 'lease/type/money/:id(\\d+|add)',
                    name: '_moneyEdit',
                    component: moneyEdit
                },{
                    // lease -> type -> tag
                    path: 'lease/type/tag',
                    name: '_tagType',
                    component: tagType
                },{
                    path: 'lease/type/tag/:id(\\d+|add)',
                    name: '_tagEdit',
                    component: tagEdit
                },{
                    // lease
                    path: 'lease',
                    name: '_lease',
                    component: lease
                },{
                    path: 'lease/:id(\\d+|add)',
                    name: '_leaseDetail',
                    component: leaseDetail
                }
            ]
        },{
            path: '*',
            name: '_notFound',
            redirect: '/login'      // 404
        }
    ]
})