<template>
    <div class="wrapperVue">
        <!-- crumb -->
        <v-crumb :crumbs="crumbs"></v-crumb>
        <!-- wrapper -->
        <div class="wrapper">
            <ul class="clearfix menu">
                <li v-for="menu in menus">
                    <router-link :to="menu.link">
                    <dl>
                        <dt><img :src="'/static/menu/'+menu.img" :alt="menu.strong"></dt>
                        <dd>
                            <strong>{{ menu.strong }}</strong>
                            <p>{{ menu.p }}</p>
                        </dd>
                    </dl>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                crumbs: [
                    {
                        url: '/home',
                        name: '主页',
                        slash: true
                    }
                ],
                menus: [
                    { link: 'banner', img: 'Banner.png', strong: 'Banner图', p: 'Banner' },
                    { link: 'lease', img: 'Product.png', strong: '招租中心', p: 'Lease center' },
                    { link: 'news', img: 'News.png', strong: '新闻中心', p: 'News center' },
                    { link: 'links', img: 'Links.png', strong: '友情链接', p: 'Friendly link' },
                    { link: 'message', img: 'Message.png', strong: '留言', p: 'Message' },
                    { link: 'base', img: 'Setting.png', strong: '网站设置', p: 'System' },
                    { link: 'admin', img: 'Admin.png', strong: '管理员', p: 'Admin' }
                ]
            }
        }
    }
</script>

<style>
    .menu li {
        float: left;
        height: 130px;
        width: 120px;
        margin-right: 120px;
        margin-bottom: 50px;
        text-align: center;
        overflow: hidden;
    }
    .menu li strong {
        font-size: 14px;
        line-height: 2em;
        color: #1d1d1d;
    }
    .menu li p {
        font-size: 12px;
        color: #9a9a9a;
    }
</style>