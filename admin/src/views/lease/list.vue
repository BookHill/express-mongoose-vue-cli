<template>
    <div class="wrapperVue">
        <v-crumb :crumbs="crumbs"></v-crumb>
        <div class="wrapper">
            <!-- wrapper-nav -->
            <div class="clearfix wrapper-nav">
                <ul class="left">
                    <li>
                        <router-link class="navlink" :to="'/home/lease/add'">
                            <img src="@/assets/tool/plus.png" alt="plus">添加
                        </router-link>
                    </li>
                </ul>
                <ul class="right">
                    <li>
                        <select class="select" v-model="selected">
                            <option selected="selected" value="allType">全部</option>
                            <option v-for="select in selects" 
                                :value="select">{{select}}
                            </option>
                        </select>
                    </li>
                </ul>
            </div>
            <!-- table -->
            <table class="_Table_">
                <tr>
                    <th class="chkbox">#</th>
                    <th>分类</th>
                    <th>标题</th>
                    <th>时间</th>
                    <th>发布</th>
                    <th>推荐</th>
                    <th class="handle">操作</th>
                </tr>
                <tr v-for="table in tables">
                    <td>{{ table.id }}</td>
                    <td>{{ table.placeType }}</td>
                    <td>{{ table.title }}</td>
                    <td>{{ $chGMT(table.updateTime) }}</td>
                    <td>
                        <span v-show="table.release">是</span>
                        <span v-show="!table.release">否</span>
                    </td>
                    <td>
                        <span v-show="table.recom">是</span>
                        <span v-show="!table.recom">否</span>
                    </td>
                    <td>
                        <router-link class="handleEdit" 
                            :to="'/home/lease/'+table.id">编辑
                        </router-link>
                        <span class="vertical-line">|</span>
                        <a class="handleDelete" 
                            @click="deletePost(table.id)">删除
                        </a>
                    </td>
                </tr>
                <tr v-show="NoData">
                    <td colspan="6"><img src="@/assets/NoData.png" alt="暂无数据"/></td>
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
                        url: '/home/lease',
                        name: '招租',
                        slash: false
                    }
                ],
                selected: 'allType',
                selects: [],
                NoData: false,
                tables: [],
                page: {
                    all: 1,             // 记录总页数
                    current: 1          // 当前的页数
                }
            }
        },
        created() {
            this.selectPost();  // 下拉select
            this.listPost(this.selected, this.page.current);
        },
        computed: {
            _select() {
                return this.selected;
            }
        },
        watch: {
            _select() {
                this.listPost(this.selected, this.page.current);
            }
        },
        methods: {
            selectPost(){
                this.$http.post('/api/users/lease/type').then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        this.selects = res.result;
                    } else {
                        this.$router.push({ path: `/login` });
                    }
                }).catch( (error) => {
                    console.log(error);
                });
            },
            listPost(type, page) {
                this.$http.post('/api/users/lease/find', {
                    params: { type, page }
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
            deletePost(id) {
                // 提示
                this.$popup.prompt( () => {                 // callback
                    this.$http.post('/api/users/lease/delete', {
                        params: { id }
                    }).then( (response) => {
                        let res = response.data;
                        if ( res.session==true && res.status==1 ) {
                            // 成功
                            this.$popup.success( () => {    // callback
                                this.listPost(this.selected, 1);
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
                this.listPost(this.selected, left);
            },
            pageRight(right) {
                this.page.current = ++right;
                this.listPost(this.selected, right);
            },
            pageTurn(turn) {
                this.page.current = turn;
                this.listPost(this.selected, turn);
            }
        }
    }
</script>