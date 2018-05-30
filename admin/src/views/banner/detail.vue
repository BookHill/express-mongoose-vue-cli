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
                        <td class="_key_">banner：</td>
                        <td class="_value_">
                            <vue-core-image-upload 
                                class="images-upload" 
                                text="上传图片" 
                                url="/api/users/banner/banner" 
                                inputOfFile="banner" 
                                :data="data" 
                                :maxFileSize="10485760" 
                                :crop="false" 
                                @imageuploaded="imageuploaded" 
                                @errorhandle="errorhandle">
                            </vue-core-image-upload>
                            <label class="label">（固定尺寸：1920*x）</label>
                            <ul class="imgShow">
                                <li v-for="_banner in banner">
                                    <img :src="'/static/banner/'+_banner" alt="images"/>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">名称：</td>
                        <td class="_value_">
                            <input class="input" 
                                type="text" 
                                name="bannerType" 
                                readonly="readonly" 
                                :value="formData.bannerType"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">Alt：</td>
                        <td class="_value_">
                            <input :class="{'input': true, 'is-danger': errors.has('alt')}" 
                                v-validate="'required'" 
                                type="text" 
                                name="alt" 
                                :value="formData.img.alt"/>
                            <label class="is-danger" v-show="errors.has('alt')">{{ errors.first('alt') }}</label>
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
                        url: '/home/banner',
                        name: 'banner',
                        slash: false
                    }
                ],
                formData: {
                    bannerType: '',
                    img: {
                        alt: ''
                    }
                },
                banner: [],
                data: {     // 上传图片向服务端发送数据
                    id: this.$route.params.id
                }
            }
        },
        mounted() {
            this.detailPost();
        },
        methods: {
            detailPost() {
                this.$http.post('/api/users/banner/detail', {
                    params: { id: this.$route.params.id }
                }).then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        this.formData = res.result;
                        this.banner[0] = res.result.img.name;
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
                    url: '/api/users/banner/update',
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
                        this.updatePost();
                        return;
                    }
                });
            },
            // 图片上传成功
            imageuploaded(res) {
                this.$popup.success( () => {    // callback
                    let name = res.result.fieldName;
                    switch (name) {
                        case 'banner': 
                            this.banner = res.result.fileName;
                            break;
                    }
                });
            },
            // 图片上传失败
            errorhandle(error) {
                this.$popup.fail( () => {       // callback
                    console.log(error);
                });
            }
        }
    }
</script>