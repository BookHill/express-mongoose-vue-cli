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
                            <select class="select" name="placeType" v-model="selected">
                                <option v-for="select in selects" 
                                    :value="select">{{select}}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">面积：</td>
                        <td class="_value_">
                            <input :class="{'range': true, 'is-danger': errors.has('areaType')}" 
                                v-validate="'required|regex:^([0-9]+)$'" 
                                type="text" 
                                name="areaType"
                                v-model="formData.areaType"/>
                            <label class="is-danger" v-show="errors.has('areaType')">{{ errors.first('areaType') }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">价格：</td>
                        <td class="_value_">
                            <input :class="{'range': true, 'is-danger': errors.has('moneyType')}" 
                                v-validate="'required|regex:^([0-9]+)$'" 
                                type="text" 
                                name="moneyType"
                                v-model="formData.moneyType"/>
                            <label class="is-danger" v-show="errors.has('moneyType')">{{ errors.first('moneyType') }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">联系人：</td>
                        <td class="_value_">
                            <input :class="{'range': true, 'is-danger': errors.has('linkmanName')}"  
                                v-validate="'required'" 
                                type="text" 
                                name="linkmanName" 
                                placeholder="称呼" 
                                v-model="linkman.name"/>：
                            <input :class="{'range': true, 'is-danger': errors.has('linkmanTel')}" 
                                v-validate="'required|regex:^[0-9]{11}$'" 
                                type="text" 
                                name="linkmanTel" 
                                placeholder="电话" 
                                v-model="linkman.tel"/>
                            <label class="is-danger" v-show="errors.has('linkmanName')">{{ errors.first('linkmanName') }}</label>
                            <label class="is-danger" v-show="errors.has('linkmanTel')">{{ errors.first('linkmanTel') }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">标签：</td>
                        <td class="_value_">
                            <ul class="checkboxs">
                                <li v-for="checkbox in checkboxs">
                                    <input type="checkbox" :value="checkbox" v-model="checked">
                                    <label>{{ checkbox }}</label>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">标题：</td>
                        <td class="_value_">
                            <input :class="{'input': true, 'is-danger': errors.has('leaseTitle')}" 
                                v-validate="'required'" 
                                type="text" 
                                name="leaseTitle"
                                v-model="formData.title"/>
                            <label class="is-danger" v-show="errors.has('leaseTitle')">{{ errors.first('leaseTitle') }}</label>
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
                        <td class="_key_">百度地图：</td>
                        <td class="_value_">
                            <input type="hidden" name="lng" v-model.number="center.lng"/>
                            <input type="hidden" name="lat" v-model.number="center.lat"/>
                            <input type="hidden" name="zoom" v-model.number="zoom"/>
                            <input class="baidu-input" v-model="keyword" placeholder="请输入搜索关键词..."/>
                            <input class="baidu-search" type="button" value="搜索" @click="baiduMap"/>
                            <!-- 百度地图 -->
                            <div id="baiduMap" class="baiduMap"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">缩略图：</td>
                        <td class="_value_">
                            <vue-core-image-upload 
                                class="images-upload" 
                                text="上传图片" 
                                url="/api/users/lease/thumbnail" 
                                inputOfFile="thumbnail" 
                                :data="data" 
                                :maxFileSize="10485760" 
                                :crop="false" 
                                @imageuploaded="imageuploaded" 
                                @errorhandle="errorhandle">
                            </vue-core-image-upload>
                            <label class="label">（建议尺寸：300*180）</label>
                            <ul class="imgShow">
                                <li v-for="_thumbnail in thumbnail">
                                    <img :src="'/static/lease/'+_thumbnail" alt="images"/>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td class="_key_">展示多图：</td>
                        <td class="_value_">
                            <vue-core-image-upload 
                                class="images-upload" 
                                text="多图上传" 
                                url="/api/users/lease/images" 
                                inputOfFile="images" 
                                :data="data" 
                                :maxFileSize="10485760" 
                                :crop="false" 
                                :multiple="true" 
                                @imageuploaded="imageuploaded" 
                                @errorhandle="errorhandle">
                            </vue-core-image-upload>
                            <label class="label">（统一尺寸：640*400；Ctrl+鼠标左键多选）</label>
                            <ul class="imgShow">
                                <li v-for="_images in images">
                                    <img :src="'/static/lease/'+_images" alt="images"/>
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
                    <tr><th>招租资料</th></tr>
                    <tr>
                        <td class="_editor_">
                            <!-- vue-core-image-upload -->
                            <vue-core-image-upload 
                                id="editor-images-upload-1" 
                                class="images-upload editor-images-upload" 
                                text="多图上传" 
                                url="/api/users/editor/lease/images/1" 
                                inputOfFile="editor-images-1" 
                                :maxFileSize="10485760" 
                                :crop="false" 
                                :multiple="true" 
                                @imageuploaded="imageuploaded" 
                                @errorhandle="errorhandle">
                            </vue-core-image-upload>
                            <!-- vue-quill-editor -->
                            <vue-quill-editor ref="myTextEditor_1"
                                :options="editorOption_1"
                                v-model="detail">
                            </vue-quill-editor>
                        </td>
                    </tr>
                </table>
                <!-- table -->
                <table class="_Table_Form_">
                    <tr><th>招租详情</th></tr>
                    <tr>
                        <td class="_editor_">
                            <!-- vue-core-image-upload -->
                            <vue-core-image-upload 
                                id="editor-images-upload-2" 
                                class="images-upload editor-images-upload" 
                                text="多图上传" 
                                url="/api/users/editor/lease/images/2" 
                                inputOfFile="editor-images-2" 
                                :maxFileSize="10485760" 
                                :crop="false" 
                                :multiple="true" 
                                @imageuploaded="imageuploaded" 
                                @errorhandle="errorhandle">
                            </vue-core-image-upload>
                            <!-- vue-quill-editor -->
                            <vue-quill-editor ref="myTextEditor_2"
                                :options="editorOption_2"
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
                        url: '/home/lease',
                        name: '招租',
                        slash: false
                    }
                ],
                formData: {
                    areaType: '',       // 面积
                    moneyType: '',      // 价格
                    title: '',          // 标题
                    summary: '',        // 摘要
                    recom: false,       // 是否推荐
                    release: false,     // 是否发布
                    SEO: {              // SEO
                        title: '',
                        keywords: '',
                        description: '' 
                    }
                },
                linkman: {              // 联系人
                    name: '',
                    tel: ''
                },
                selected: '',           // 当前区域
                selects: [],            // 所有区域
                checked: [],            // 选中标签
                checkboxs: [],          // 所有标签
                thumbnail: [],          // 缩略图
                images: [],             // 展示多图
                data: {                 // 上传图片向服务端发送数据
                    id: this.$route.params.id
                },
                detail: '',             // 编辑器 -- 详情detail
                content: '',            // 编辑器 -- 内容content
                editorOption_1: {
                    // something config
                    theme: 'snow',                          // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,      // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('#editor-images-upload-1 input[type=file]').click();
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                },
                editorOption_2: {
                    // something config
                    theme: 'snow',                          // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,      // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('#editor-images-upload-2 input[type=file]').click();
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                },
                // 百度地图
                center: {
                    lng: 114.068124,
                    lat: 22.546379
                },
                zoom: 12,
                keyword: ''
            }
        },
        mounted() {
            this.selectPost();      // 区域
            this.checkboxPost();    // 标签
            let id = this.$route.params.id;
            switch (id) {
                case 'add': this.baiduMap();
                    break;
                default: this.detailPost();
                    break;
            }
        },
        methods: {
            selectPost(){
                this.$http.post('/api/users/lease/type').then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        try {
                            this.selects = res.result;
                            this.selected = res.result[0];
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
            checkboxPost(){
                this.$http.post('/api/users/lease/tag').then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        this.checkboxs = res.result;
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
                    url: '/api/users/lease/detail',
                    data: _formData_,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        this.formData = res.result;
                        this.selected = res.result.placeType;       // 区域
                        this.checked = res.result.tagType;          // 标签
                        this.thumbnail[0] = res.result.thumbnail;   // 缩略图
                        this.images = res.result.images;            // 展示多图
                        this.detail = res.result.detail;            // 详情
                        this.content = res.result.content;          // 内容
                        for (let key in res.result.linkman) {
                            this.linkman.name = key;
                            this.linkman.tel = res.result.linkman[key];
                        }
                        this.center.lng = res.result.map.lng;       // map 经度
                        this.center.lat = res.result.map.lat;       // map 纬度
                        this.zoom = res.result.map.zoom;            // map 级别 1~19
                        // 百度地图
                        this.baiduMap();
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
                    _formData_.append('tagType', this.checked);         // 标签
                    _formData_.append('thumbnail', this.thumbnail);     // 缩略图
                    _formData_.append('images', this.images);           // 多图展示
                    _formData_.append('detail', this.detail);           // 详情
                    _formData_.append('content', this.content);         // 内容
                this.$http({
                    method: 'post',
                    url: '/api/users/lease/create',
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
                let _formData_ = new FormData(document.getElementById('form'))
                    _formData_.append('tagType', this.checked);         // 标签
                    _formData_.append('thumbnail', this.thumbnail);     // 缩略图
                    _formData_.append('images', this.images);           // 多图展示
                    _formData_.append('detail', this.detail);           // 详情
                    _formData_.append('content', this.content);         // 内容
                this.$http({
                    method: 'post',
                    url: '/api/users/lease/update',
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
                    alert('请添加招租区域');
                    this.$router.push({ path: `/home/lease/type/place/add` });
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
                        case 'images': 
                            this.images = res.result.fileName;
                            break;
                        case 'editor-images': 
                            let ref = res.result.editor;
                            let files = res.result.fileName;
                            this.uploadSuccess(ref, files);
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
            uploadSuccess(ref, files) {
                if ( ref==1 ) {
                    // 获取富文本组件实例
                    let quill_1 = this.$refs.myTextEditor_1.quill;
                    // 获取光标所在位置
                    let index = quill_1.getSelection().index;
                    // 插入图片 files 是数组
                    for(let i=0, j=files.length; i<j; i++) {
                        quill_1.insertEmbed(index, 'image', '/static/editor/lease/' + files[i]); 
                    }
                    // 调整光标到最后
                    quill_1.setSelection(parseInt(index) + parseInt(files.length));
                }
                if ( ref==2 ) {
                    // 获取富文本组件实例
                    let quill_2 = this.$refs.myTextEditor_2.quill;
                    // 获取光标所在位置
                    let index = quill_2.getSelection().index;
                    // 插入图片 files 是数组
                    for(let i=0, j=files.length; i<j; i++) {
                        quill_2.insertEmbed(index, 'image', '/static/editor/lease/' + files[i]); 
                    }
                    // 调整光标到最后
                    quill_2.setSelection(parseInt(index) + parseInt(files.length));
                }
            },
            // 百度地图
            baiduMap() {
                var that = this;
                var map = new BMap.Map("baiduMap");
                    // 添加覆盖物
                    add_overlay();
                    // 平移缩放控件
                    map.addControl( new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT}) );
                    // 地图类型
                    map.addControl( new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT}) );
                    // 比例尺
                    map.addControl( new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT}) );
                    // 监听标注事件
                    map.addEventListener("dragend", function(){
                        var center = map.getCenter();
                        that.center.lng = center.lng;           // 变更经线
                        that.center.lat = center.lat;           // 变更纬线
                        that.zoom = this.getZoom();             // 变更级别
                        // 清除覆盖物
                        remove_overlay();
                        // 添加覆盖物
                        add_overlay();
                    });
                    // 监听级别事件
                    map.addEventListener("zoomend", function(){
                        that.zoom = map.getZoom();              // 变更级别
                    });
                    // 用户搜索
                    var myGeo = new BMap.Geocoder();
                        // 将地址解析结果显示在地图上,并调整地图视野
                        myGeo.getPoint(this.keyword, function(point){
                        if (point) {
                            // 清除覆盖物
                            remove_overlay();
                            // 添加覆盖物
                                map.centerAndZoom(point, 15);
                                // 创建标注 -> 将标注添加到地图中 -> 跳动的动画
                            var marker = new BMap.Marker(point);
                                map.addOverlay(marker);
                                marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                                that.center.lng = point.lng;        // 变更经线
                                that.center.lat = point.lat;        // 变更纬线
                                that.zoom = 15;                     // 变更级别
                        } else {
                            alert("您选择地址没有解析到结果，请输入明确的标识！");
                        }
                    });
                    // 添加覆盖物
                    function add_overlay() {
                        var point = new BMap.Point( that.center.lng, that.center.lat );
                            map.centerAndZoom( point, that.zoom );
                            // 创建标注 -> 将标注添加到地图中 -> 跳动的动画
                        var marker = new BMap.Marker(point);
                            map.addOverlay(marker);
                            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                    }
                    // 清除覆盖物
                    function remove_overlay() {
                        map.clearOverlays();         
                    }
            }
        }
    }
</script>