<template>
    <div class="wrapperVue">
        <v-crumb :crumbs="crumbs"></v-crumb>
        <div class="wrapper">
            <!-- table -->
            <table class="_Table_">
                <tr>
                    <th class="chkbox">#</th>
                    <th>名称</th>
                    <th>alt</th>
                    <th>时间</th>
                    <th class="handle">操作</th>
                </tr>
                <tr v-for="table in tables">
                    <td>{{ table.id }}</td>
                    <td>{{ table.bannerType }}</td>
                    <td>{{ table.img.alt }}</td>
                    <td>{{ $chGMT(table.updateTime) }}</td>
                    <td>
                        <router-link class="handleEdit" 
                            :to="'/home/banner/'+table.id">编辑
                        </router-link>
                    </td>
                </tr>
                <tr v-show="NoData">
                    <td colspan="5"><img src="@/assets/NoData.png" alt="暂无数据"/></td>
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
                        url: '/home/banner',
                        name: 'banner',
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
                this.$http.post('/api/users/banner/find', {
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