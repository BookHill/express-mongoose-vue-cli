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
                        <td class="_key_">新闻分类：</td>
                        <td class="_value_">
                            <select class="select" name="newsType" v-model="selected">
                                <option v-for="select in selects" 
                                    :value="select.name">{{select.name}}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">作者：</td>
                        <td class="_value_">
                            <input :class="{'input': true, 'is-danger': errors.has('author')}" 
                                v-validate="'required'" 
                                type="text" 
                                name="author"
                                v-model="formData.author"/>
                            <label class="is-danger" v-show="errors.has('author')">{{ errors.first('author') }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">标题：</td>
                        <td class="_value_">
                            <input :class="{'input': true, 'is-danger': errors.has('newstitle')}" 
                                v-validate="'required'" 
                                type="text" 
                                name="newstitle"
                                v-model="formData.title"/>
                            <label class="is-danger" v-show="errors.has('newstitle')">{{ errors.first('newstitle') }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">摘要：</td>
                        <td class="_value_">
                            <textarea :class="{'textarea': true, 'is-danger': errors.has('summary')}" 
                                v-validate="'required'" 
                                type="text" 
                                name="summary"
                                v-model="formData.summary"/>
                            </textarea>
                            <label class="is-danger" v-show="errors.has('summary')">{{ errors.first('summary') }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">缩略图：</td>
                        <td class="_value_">
                            <vue-core-image-upload 
                                class="images-upload" 
                                text="上传图片" 
                                url="/api/users/news/thumbnail" 
                                inputOfFile="thumbnail" 
                                :data="data" 
                                :maxFileSize="10485760" 
                                :crop="false" 
                                @imageuploaded="imageuploaded" 
                                @errorhandle="errorhandle">
                            </vue-core-image-upload>
                            <label class="label">（建议尺寸：2:1，360*180）</label>
                            <ul class="imgShow">
                                <li v-for="_thumbnail in thumbnail">
                                    <img :src="'/static/news/'+_thumbnail" alt="images"/>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">是否推荐：</td>
                        <td class="_value_">
                            <input type="radio" name="recom" id="recomOne" :value="true" v-model="formData.recom">
                            <label for="recomOne">是</label>
                            <input type="radio" name="recom" id="recomTwo" :value="false" v-model="formData.recom">
                            <label for="recomTwo">否</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">是否发布：</td>
                        <td class="_value_">
                            <input type="radio" name="release" id="releaseOne" :value="true" v-model="formData.release">
                            <label for="releaseOne">是</label>
                            <input type="radio" name="release" id="releaseTwo" :value="false" v-model="formData.release">
                            <label for="releaseTwo">否</label>
                        </td>
                    </tr>
                </table>
                <!-- table -->
                <table class="_Table_Form_">
                    <tr><th>新闻内容</th></tr>
                    <tr>
                        <td class="_editor_">
                            <!-- vue-core-image-upload -->
                            <vue-core-image-upload 
                                id="editor-images-upload" 
                                class="images-upload editor-images-upload" 
                                text="多图上传" 
                                url="/api/users/editor/news/images" 
                                inputOfFile="editor-images" 
                                :maxFileSize="10485760" 
                                :crop="false" 
                                :multiple="true" 
                                @imageuploaded="imageuploaded" 
                                @errorhandle="errorhandle">
                            </vue-core-image-upload>
                            <!-- vue-quill-editor -->
                            <vue-quill-editor ref="myTextEditor"
                                :options="editorOption"
                                v-model="content">
                            </vue-quill-editor>
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
    let toolbarOptions = [
        [{ 'align': [] }],                                // 左中右
        ['link', 'image', 'video'],                       // 地址，图片，视频

        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

        [{ 'font': [] }],
        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

        ['clean']                                         // remove formatting button
    ];
    export default {
        data() {
            return {
                crumbs: [
                    {
                        url: '/home',
                        name: '主页',
                        slash: true
                    },{
                        url: '/home/news',
                        name: '新闻',
                        slash: false
                    }
                ],
                formData: {
                    author: '',
                    title: '',
                    summary: '',
                    recom: false,
                    release: false,
                    SEO: {
                        title: '',
                        keywords: '',
                        description: '' 
                    }
                },
                selected: '',   // select
                selects: [],    // 分类
                thumbnail: [],  // 缩略图
                data: {         // 上传图片向服务端发送数据
                    id: this.$route.params.id
                },
                content: '',    // 编辑器
                editorOption: {
                    // something config
                    theme: 'snow',                          // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,      // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('#editor-images-upload input[type=file]').click();
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        mounted() {
            this.selectPost();  // 新闻分类
            let id = this.$route.params.id;
            switch (id) {
                case 'add': break;
                default: this.detailPost();
                    break;
            }
        },
        methods: {
            selectPost(){
                this.$http.post('/api/users/news/type').then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        try {
                            this.selects = res.result;
                            this.selected = res.result[0].name;
                        } catch(e) {
                            console.log(e.message);
                        }
                    } else {
                        this.$router.push({ path: `/login` });
                    }
                }).catch( (error) => {
                    console.log(error);
                });
            },
            detailPost() {
                // FormData
                let _formData_ = new FormData(document.getElementById('form'));
                this.$http({
                    method: 'post',
                    url: '/api/users/news/detail',
                    data: _formData_,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        this.formData = res.result;
                        this.selected = res.result.newsType;        // 分类
                        this.thumbnail[0] = res.result.thumbnail;   // 缩略图
                        this.content = res.result.content;          // 内容
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
                    _formData_.append('thumbnail', this.thumbnail);
                    _formData_.append('content', this.content);
                this.$http({
                    method: 'post',
                    url: '/api/users/news/create',
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
                    _formData_.append('thumbnail', this.thumbnail);
                    _formData_.append('content', this.content);
                this.$http({
                    method: 'post',
                    url: '/api/users/news/update',
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
                if (this.selects.length == 0) {
                    alert('请添加新闻分类');
                    this.$router.push({ path: `/home/news/type/add` });
                    return false;
                }
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
            },
            // 图片上传成功
            imageuploaded(res) {
                this.$popup.success( () => {    // callback
                    let name = res.result.fieldName;
                    switch (name) {
                        case 'thumbnail': 
                            this.thumbnail = res.result.fileName;
                            break;
                        case 'editor-images': 
                            let files = res.result.fileName;
                            this.uploadSuccess(files);
                            break;
                    }
                });
            },
            // 图片上传失败
            errorhandle(error) {
                this.$popup.fail( () => {       // callback
                    console.log(error);
                });
            },
            // 编辑器上传图片 editor -> images
            uploadSuccess(files) {
                // 获取富文本组件实例
                let quill = this.$refs.myTextEditor.quill;
                // 获取光标所在位置
                let index = quill.getSelection().index;
                // 插入图片 files 是数组
                for(let i=0, j=files.length; i<j; i++) {
                   quill.insertEmbed(index, 'image', '/static/editor/news/' + files[i]); 
                }
                // 调整光标到最后
                quill.setSelection(parseInt(index) + parseInt(files.length));
            }
        }
    }
</script>