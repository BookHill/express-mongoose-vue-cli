<template>
    <div class="wrapperVue">
        <v-crumb :crumbs="crumbs"></v-crumb>
        <div class="wrapper">
            <form id="form" @submit.prevent="validateBeforeSubmit">
                <!-- table -->
                <table class="_Table_Form_">
                    <tr><th colspan="2">编辑</th></tr>
                    <tr><td><input type="hidden" name="id" :value="this.$route.params.id"/></td></tr>
                    <tr>
                        <td class="_key_">价格范围：</td>
                        <td class="_value_">
                            <input :class="{'range': true, 'is-danger': errors.has('bottom')}"  
                                v-validate="'required|regex:^\\d+$'" 
                                type="text" 
                                name="bottom" 
                                v-model="formData.bottom"/>
                                &nbsp;~&nbsp;
                            <input :class="{'range': true, 'is-danger': errors.has('top')}" 
                                v-validate="'required|regex:^\\d+$'" 
                                type="text" 
                                name="top" 
                                v-model="formData.top"/>
                            <label class="is-danger" v-show="errors.has('bottom')">{{ errors.first('bottom') }}</label>
                            <label class="is-danger" v-show="errors.has('top')">{{ errors.first('top') }}</label>
                        </td>
                    </tr>
                </table>
                <button class="confirm" type="submit">确认</button>
            </form>
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
                formData: {
                    bottom: '',
                    top: ''
                }
            }
        },
        mounted() {
            let id = this.$route.params.id;
            switch (id) {
                case 'add': break;
                default: this.detailPost();
                    break;
            }
        },
        methods: {
            detailPost() {
                // FormData
                let _formData_ = new FormData(document.getElementById('form'));
                this.$http({
                    method: 'post',
                    url: '/api/users/leaseType/money/detail',
                    data: _formData_,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
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
            },
            createPost(){
                // FormData
                let _formData_ = new FormData(document.getElementById('form'));
                this.$http({
                    method: 'post',
                    url: '/api/users/leaseType/money/create',
                    data: _formData_,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        // 成功
                        this.$popup.success( () => {    // callback
                            this.$router.go(-1);
                        });
                    } else {
                        this.$router.push({ path: `/login` });
                    }
                }).catch( (error) => {
                    console.log(error);
                });
            },
            updatePost(){
                // FormData
                let _formData_ = new FormData(document.getElementById('form'));
                this.$http({
                    method: 'post',
                    url: '/api/users/leaseType/money/update',
                    data: _formData_,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        // 成功
                        this.$popup.success( () => {    // callback
                            this.$router.go(-1);
                        });
                    } else {
                        this.$router.push({ path: `/login` });
                    }
                }).catch( (error) => {
                    console.log(error);
                });
            },
            // vee-validate
            validateBeforeSubmit() {
                this.$validator.validateAll().then( (result) => {
                    if (result) {
                        let id = this.$route.params.id;
                        switch (id) {
                            case 'add': 
                                this.createPost();
                                break;
                            default: 
                                this.updatePost();
                                break;
                        }
                        return;
                    }
                });
            }
        }
    }
</script>