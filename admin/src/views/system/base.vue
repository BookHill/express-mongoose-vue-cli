<template>
    <div class="wrapperVue">
        <v-crumb :crumbs="crumbs"></v-crumb>
        <div class="wrapper">
            <form id="form" @submit.prevent="validateBeforeSubmit">
                <!-- table -->
                <table class="_Table_Form_">
                    <tr><th colspan="2">操作</th></tr>
                    <tr><td></td></tr>
                    <tr>
                        <td class="_key_">icon：</td>
                        <td class="_value_">
                            <vue-core-image-upload 
                                class="images-upload" 
                                text="上传图片" 
                                url="/api/users/system/icon" 
                                inputOfFile="icon" 
                                :maxFileSize="1048576" 
                                :crop="false" 
                                extensions="ico"
                                @imageuploaded="imageuploaded" 
                                @errorhandle="errorhandle">
                            </vue-core-image-upload>
                            <label class="label">（固定尺寸：16*16，32*32，64*64，128*128）</label>
                            <ul class="imgShow">
                                <li v-for="_icon in icon">
                                    <img :src="'/static/logo/'+_icon" alt="images"/>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">logo：</td>
                        <td class="_value_">
                            <vue-core-image-upload 
                                class="images-upload" 
                                text="上传图片" 
                                url="/api/users/system/logo" 
                                inputOfFile="logo" 
                                :maxFileSize="1048576" 
                                :crop="false" 
                                @imageuploaded="imageuploaded" 
                                @errorhandle="errorhandle">
                            </vue-core-image-upload>
                            <label class="label">（建议尺寸：1:3）</label>
                            <ul class="imgShow">
                                <li v-for="_logo in logo">
                                    <img :src="'/static/logo/'+_logo" alt="images"/>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">h1：</td>
                        <td class="_value_">
                            <input :class="{'input': true, 'is-danger': errors.has('h1')}" 
                                v-validate="'required'" 
                                type="text" 
                                name="h1" 
                                v-model="formData.h1"/>
                            <label class="is-danger" v-show="errors.has('h1')">{{ errors.first('h1') }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">备案号：</td>
                        <td class="_value_">
                            <input :class="{'input': true, 'is-danger': errors.has('copyright')}" 
                                v-validate="'required'" 
                                type="text" 
                                name="copyright" 
                                v-model="formData.copyright"/>
                            <label class="is-danger" v-show="errors.has('copyright')">{{ errors.first('copyright') }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">联系人名称：</td>
                        <td class="_value_">
                            <input :class="{'input': true, 'is-danger': errors.has('name')}" 
                                v-validate="'required'" 
                                type="text" 
                                name="name" 
                                v-model="formData.message.name"/>
                            <label class="is-danger" v-show="errors.has('name')">{{ errors.first('name') }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">联系人电话：</td>
                        <td class="_value_">
                            <input :class="{'input': true, 'is-danger': errors.has('tel')}" 
                                v-validate="'required|regex:^[0-9]{11}$'" 
                                type="text" 
                                name="tel" 
                                v-model="formData.message.tel"/>
                            <label class="is-danger" v-show="errors.has('tel')">{{ errors.first('tel') }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">联系人邮箱：</td>
                        <td class="_value_">
                            <input :class="{'input': true, 'is-danger': errors.has('email')}" 
                                v-validate="'required|email'" 
                                type="text" 
                                name="email" 
                                v-model="formData.message.email"/>
                            <label class="is-danger" v-show="errors.has('email')">{{ errors.first('email') }}</label>
                        </td>
                    </tr>
                </table>
                <!-- table -->
                <table class="_Table_Form_">
                    <tr><th colspan="2">SEO</th></tr>
                    <tr><td></td></tr>
                    <tr>
                        <td class="_key_">标题：</td>
                        <td class="_value_">
                            <input :class="{'input': true, 'is-danger': errors.has('title')}" 
                                v-validate="'required'" 
                                type="text" 
                                name="title" 
                                v-model="formData.SEO.title"/>
                            <label class="is-danger" v-show="errors.has('title')">{{ errors.first('title') }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">关键字：</td>
                        <td class="_value_">
                            <input :class="{'input': true, 'is-danger': errors.has('keywords')}" 
                                v-validate="'required'" 
                                type="text" 
                                name="keywords" 
                                v-model="formData.SEO.keywords"/>
                            <label class="is-danger" v-show="errors.has('keywords')">{{ errors.first('keywords') }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">描述：</td>
                        <td class="_value_">
                            <textarea :class="{'textarea': true, 'is-danger': errors.has('description')}" 
                                v-validate="'required'" 
                                type="text" 
                                name="description" 
                                v-model="formData.SEO.description">
                            </textarea>
                            <label class="is-danger" v-show="errors.has('description')">{{ errors.first('description') }}</label>
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
                        url: '/home/base',
                        name: '网站设置',
                        slash: false
                    }
                ],
                formData: {
                    h1: '',
                    message: {
                        name: '',
                        tel: '',
                        email: '' 
                    },
                    copyright: '',
                    SEO: {
                        title: '',
                        keywords: '',
                        description: '' 
                    }
                },
                icon: [],
                logo: []
            }
        },
        mounted() {
            this.detailPost();
        },
        methods: {
            detailPost() {
                this.$http({
                    method: 'post',
                    url: '/api/users/system/detail',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        this.formData = res.result;
                        this.icon[0] = res.result.icon;
                        this.logo[0] = res.result.logo;
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
                    url: '/api/users/system/update',
                    data: _formData_,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        // 成功
                        this.$popup.success( () => {    // callback
                            location.reload();
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
                        case 'icon': 
                            this.icon = res.result.fileName;
                            break;
                        case 'logo': 
                            this.logo = res.result.fileName;
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