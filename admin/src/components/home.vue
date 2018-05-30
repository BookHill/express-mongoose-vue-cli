<template>
    <div class="homeVue">
        <!-- 头部 -->
        <div class="Home-Top min-layout">
            <div class="left title">
                <router-link :to="'/home'">后台管理系统</router-link>
            </div>
            <ul class="left column">
                <li><a :class="{ active:column == 'system' }" 
                       @click="columnClick('system')">系统设置
                </a></li>
                <li><a :class="{ active:column == 'info' }" 
                       @click="columnClick('info')">信息发布
                </a></li>
            </ul>
            <ul class="right users">
                <li>
                    欢迎您！
                    <router-link :to="'/home/admin/'+this.$store.state.user.id">
                        {{ this.$store.state.user.name }}
                    </router-link>
                </li>
                <li><a @click="logOutClick()">退出</a></li>
            </ul>
        </div>
        <!-- 侧栏 -->
        <nav class="Home-Sidebar">
            <ul class="navs">
                <li v-for="(value, key, index) in navs">
                    <a class="navsLink" 
                        :class="{active:navsActive == index}" 
                        @click="navsLinkClick(index)">
                        <img v-show="navsActive!=index" src="@/assets/tool/navs_01.png" alt="img"/>
                        <img v-show="navsActive==index" src="@/assets/tool/navs_02.png" alt="img"/>
                        {{ key }}
                    </a>
                    <ul class="subnavs" v-show="navsActive==index" style="display: none;">
                        <li v-for="(router, item) in value">
                            <router-link class="subnavslink" :to="'/home/'+router">{{ item }}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <!-- 主体 -->
        <div class="Home-Wrapper">
            <router-view></router-view>
        </div>
        <!-- 弹窗 -->
        <v-popup></v-popup>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                column: '',         // Home-Top
                navs: {},           // Home-Sidebar
                navsActive: -1,     // Home-Sidebar active
                Sidebars: {         // Home-Sidebar -> all
                    system: {
                        '网站设置': {
                            '基本设置': 'base',
                            '友情链接': 'links'
                        },
                        '管理员': {
                            '列表': 'admin'
                        },
                        '留言': {
                            '列表': 'message'
                        }
                    },
                    info: {
                        'Banner': {
                            '列表': 'banner'
                        },
                        '新闻': {
                            '分类': 'news/type',
                            '列表': 'news'
                        },
                        '招租': {
                            '标签': 'lease/type/tag',
                            '区域': 'lease/type/place',
                            '面积': 'lease/type/area',
                            '价格': 'lease/type/money',
                            '列表': 'lease'
                        }
                    }
                }
            }
        },
        created() {
            this.navs = this.Sidebars.info;     // 侧栏
            this.homeUserPost();                // 用户状态
        },
        methods: {
            // 用户
            homeUserPost() {
                this.$http.post('/api/users/homeUser').then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        // vuex -> news
                        this.$store.commit('userVuex', res.result);
                    } else {
                        this.$router.push({ path: `/login` });
                    }
                }).catch( (error) => {
                    console.log(error);
                });
            },
            // 退出登录
            logOutClick() {
                this.$http.post('/api/users/logOut').then( (response) => {
                    let res = response.data;
                    if ( res.status==1 ) {
                        this.$router.push({ path: `/login` });
                    }
                }).catch( (error) => {
                    console.log(error);
                });
            },
            // home -> column
            columnClick(target) {
                switch (target) {
                    case 'system':
                        this.column = target;
                        this.navs = this.Sidebars.system;
                        this.navsActive = -1;
                        break;
                    case 'info':
                        this.column = target;
                        this.navs = this.Sidebars.info;
                        this.navsActive = -1;
                        break;
                }
            },
            // home -> Sidebar
            navsLinkClick(index) {
                if (this.navsActive == index) {
                    this.navsActive = -1;
                } else {
                    this.navsActive = index;
                }
            }
        }
    }
</script>

<style>
    /* Home-Top */
    .Home-Top {
        position: absolute;
		top: 0;
		left: 0;
        right: 0;
        height: 59px;
		z-index: 9999;
        line-height: 59px;
		background: #F1F2F7;
        border-bottom: 1px solid #ddd;
    }
    .Home-Top .title {
        padding-left: 30px;
        width: 170px;
        background: #1B2B36;
    }
    .Home-Top .title a {
        font-size: 18px;
        color: #f0f0f0;
    }
    .Home-Top .column li {
        float: left;
    }
    .Home-Top .column li a {
        display: block;
        padding: 0 30px;
        font-size: 15px;
        color: #333;
        cursor: pointer;
    }
    .Home-Top .column li a.active {
        color: #0CB6E7;
    }
    .Home-Top .column li a:focus,
	.Home-Top .column li a:hover {
		color: #0CB6E7;
	}
    .Home-Top .users {
        padding-right: 30px;
        font-size: 14px;
        color: #666;
    }
    .Home-Top .users li {
        float: left;
        margin-left: 20px;
    }
    .Home-Top .users li a {
        font-size: 14px;
        color: #666;
        cursor: pointer;
    }
    .Home-Top .users li a:focus,
	.Home-Top .users li a:hover {
		color: #ff0000;
	}
    /* Home-Sidebar */
    .Home-Sidebar {
        position: absolute;
        top: 59px;
        bottom: 0;
        left: 0;
        z-index: 9999;
        width: 200px;
        min-height: 430px;
        background: #1B2B36;
        border-top: 1px solid #0E151B;
        overflow-y: auto;
    }
    .Home-Sidebar .navs {
        padding-bottom: 30px;
    }
    .Home-Sidebar .navs > li {
        border-bottom: 1px solid #0E151B;
    }
    .Home-Sidebar .navs > li .navsLink {
		display: block;
		padding-left: 30px;
		font-size: 14px;
		line-height: 40px;
		color: #a7c6dc;
		cursor: pointer;
	}
    .Home-Sidebar .navs > li .navsLink.active {
        color: #6AFDFF;
        background: #152028;
        border-right: 2px solid #71fdff;
    }
    .Home-Sidebar .navs > li .navsLink img {
        float: left;
        margin-top: 12px;
        margin-right: 10px;
    }
        /* subnavs */
    .Home-Sidebar .subnavs .subnavslink {
        display: block;
        padding-left: 58px;
        font-size: 12px;
        line-height: 35px;
        color: #a7c6dc;
    }
    .Home-Sidebar .subnavs .subnavslink:hover {
        color: #fff;
        background: rgba(21, 32, 40, 0.6);
    }
    /* Home-Wrapper */
    .Home-Wrapper {
        position: absolute;
        top: 60px;
        left: 200px;
        right: 0;
        bottom: 0;
        z-index: 9999;
        min-width: 880px;
        background: #fff;
        overflow-y: auto;
    }
</style>