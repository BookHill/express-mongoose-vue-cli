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
                        <td class="_key_">区域：</td>
                        <td class="_value_">
                            <input :class="{'input': true, 'is-danger': errors.has('name')}" 
                                v-validate="'required'" 
                                type="text" 
                                name="name" 
                                v-model="formData.name"/>
                            <label class="is-danger" v-show="errors.has('name')">{{ errors.first('name') }}</label>
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
                        url: '/home/lease/type/place',
                        name: '招租--区域',
                        slash: false
                    }
                ],
                formData: {
                    name: ''
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
                    url: '/api/users/leaseType/place/detail',
                    data: _formData_,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        this.formData.name = res.result;
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
                    url: '/api/users/leaseType/place/create',
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
                    url: '/api/users/leaseType/place/update',
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