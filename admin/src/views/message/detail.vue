<template>
    <div class="wrapperVue">
        <v-crumb :crumbs="crumbs"></v-crumb>
        <div class="wrapper">
            <!-- table -->
            <table class="_Table_Form_">
                <tr><th colspan="2">编辑</th></tr>
                <tr><td><input type="hidden" name="id" :value="this.$route.params.id"/></td></tr>
                <tr>
                    <td class="_key_">名称：</td>
                    <td class="_value_">
                        <input class="input" 
                            type="text" 
                            name="name" 
                            readonly="readonly" 
                            :value="formData.name"/>
                    </td>
                </tr>
                <tr>
                    <td class="_key_">电话：</td>
                    <td class="_value_">
                        <input class="input" 
                            type="text" 
                            name="tel" 
                            readonly="readonly" 
                            :value="formData.tel"/>
                    </td>
                </tr>
                <tr>
                    <td class="_key_">内容：</td>
                    <td class="_value_">
                        <textarea class="textarea" 
                            type="text" 
                            name="content" 
                            readonly="readonly" 
                            :value="formData.content">
                        </textarea>
                    </td>
                </tr>
                <tr>
                    <td class="_key_">时间：</td>
                    <td class="_value_">
                        <input class="input" 
                            type="text" 
                            name="updateTime" 
                            readonly="readonly" 
                            :value="this.$chGMT(formData.updateTime)"/>
                    </td>
                </tr>
            </table>
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
                        url: '/home/message',
                        name: '留言',
                        slash: false
                    }
                ],
                formData: {
                    name: '',
                    tel: '',
                    content: '',
                    updateTime: ''
                }
            }
        },
        mounted() {
            this.detailPost();
        },
        methods: {
            detailPost() {
                this.$http.post('/api/users/message/detail', {
                    params: { id: this.$route.params.id }
                }).then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        this.formData = res.result;
                    } else {
                        this.$router.push({ path: `/login` });
                    }
                }).catch( (error) => {
                    console.log(error);
                });
            }
        }
    }
</script>