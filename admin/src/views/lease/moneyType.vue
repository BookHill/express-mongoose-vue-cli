<template>
    <div class="wrapperVue">
        <v-crumb :crumbs="crumbs"></v-crumb>
        <div class="wrapper">
            <!-- wrapper-nav -->
            <div class="clearfix wrapper-nav">
                <ul class="left">
                    <li>
                        <router-link class="navlink" :to="'/home/lease/type/money/add'">
                            <img src="@/assets/tool/plus.png" alt="plus">添加
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- table -->
            <table class="_Table_">
                <tr>
                    <th class="chkbox">#</th>
                    <th>价格范围</th>
                    <th class="handle">操作</th>
                </tr>
                <tr v-for="(table, index) in tables">
                    <td>{{ index+(page.current-1)*10 }}</td>
                    <td>{{ table.bottom }}~{{ table.top }}</td>
                    <td>
                        <router-link class="handleEdit" 
                            :to="'/home/lease/type/money/'+(index+(page.current-1)*10)">编辑
                        </router-link>
                        <span class="vertical-line">|</span>
                        <a class="handleDelete" 
                            @click="deletePost(table.bottom, table.top)">删除
                        </a>
                    </td>
                </tr>
                <tr v-show="NoData">
                    <td colspan="3"><img src="@/assets/NoData.png" alt="暂无数据"/></td>
                </tr>
            </table>
            <!-- page -->
            <div class="pageBox">
                <v-pagination 
                    :all="page.all" 
                    :current="page.current" 
                    :left="pageLeft" 
                    :right="pageRight"
                    :turn="pageTurn">
                </v-pagination>
            </div>
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
                    },{
                        url: '/home/lease/type/money',
                        name: '招租--价格',
                        slash: false
                    }
                ],
                NoData: false,
                tables: [],
                page: {
                    all: 1,             // 记录总页数
                    current: 1          // 当前的页数
                }                
            }
        },
        created() {
            this.listPost(this.page.current);
        },
        methods: {
            listPost(page) {
                this.$http.post('/api/users/leaseType/money/find', {
                    params: { page }
                }).then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        this.page.all = res.result.count;
                        this.page.current = res.result.current;
                        this.tables = res.result.doc;
                        switch (res.result.doc.length) {
                            case 0:
                                this.NoData = true;
                                break;
                            default:
                                this.NoData = false;
                                break;
                        }
                    } else {
                        this.$router.push({ path: `/login` });
                    }
                }).catch( (error) => {
                    console.log(error);
                });
            },
            deletePost(bottom, top) {
                // 提示
                this.$popup.prompt( () => {                 // callback
                    this.$http.post('/api/users/leaseType/money/delete', {
                        params: { bottom, top }
                    }).then( (response) => {
                        let res = response.data;
                        if ( res.session==true && res.status==1 ) {
                            // 成功
                            this.$popup.success( () => {    // callback
                                this.listPost(this.page.current);
                            });
                        } else {
                            this.$router.push({ path: `/login` });
                        }
                    }).catch( (error) => {
                        // 失败
                        this.$popup.fail( () => {           // callback
                            console.log(error);
                        });
                    });
                });
            },
            pageLeft(left) {
                this.page.current = --left;
                this.listPost(left);
            },
            pageRight(right) {
                this.page.current = ++right;
                this.listPost(right);
            },
            pageTurn(turn) {
                this.page.current = turn;
                this.listPost(turn);
            }
        }
    }
</script>