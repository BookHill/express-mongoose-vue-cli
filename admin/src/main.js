// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"             // 转换
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'


//--- 静态资源
    import '@/assets/reset.css'
    import '@/assets/wrapper.css'
    // vue-quill-editor
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'


//--- 插件
    // -> vee-validate
    import VeeValidate from 'vee-validate'                  // 表单验证插件
    import zh_CN from 'vee-validate/dist/locale/zh_CN'      // 引入中文包
    import VueI18n from 'vue-i18n'                          // vue-i18n的国际化插件
    Vue.use(VueI18n)
    const i18n = new VueI18n({
        locale: 'zh_CN',
    })
    Vue.use(VeeValidate, {
        i18n,
        i18nRootKey: 'validation',
        dictionary: {
            zh_CN
        }
    })


//--- vue
    // -> 全局组件
    import vPagination from '@/components/pagination'           // 分页
    import vPopup from '@/components/popup'                     // 提示弹窗
    import vCrumb from '@/components/crumb'                     // 面包屑
    import VueCoreImageUpload from 'vue-core-image-upload'      // 图片上传裁剪
    import { quillEditor } from 'vue-quill-editor'              // 富文本编辑器
    Vue.component('v-pagination', vPagination)
    Vue.component('v-popup', vPopup)
    Vue.component('v-crumb', vCrumb)
    Vue.component('vue-core-image-upload', VueCoreImageUpload)
    Vue.component('vue-quill-editor', quillEditor)

    // -- axios
    import axios from 'axios'
    Vue.prototype.$http= axios

    // -- vuex
    Vue.use(Vuex)
    const store = new Vuex.Store({
        state: {
            // 弹窗
            popup: {
                prompt: 0,          // 提示 0->隐藏 1->显示
                success: 0,         // 成功 0->隐藏 1->显示
                fail: 0             // 失败 0->隐藏 1->显示
            },
            // 用户
            user: {
                id: '',             // 用户id
                name: ''            // 用户名
            }
        },
        mutations: {
            // 弹窗
            popupVuex (state, Obj) {
                let popup_key = Object.keys(Obj)[0];
                switch (popup_key) {
                    case 'prompt':
                        state.popup.prompt = Obj.prompt;
                        break;
                    case 'success':
                        state.popup.success = Obj.success;
                        break;
                    case 'fail':
                        state.popup.fail = Obj.fail;
                        break;
                }
            },
            // 用户
            userVuex (state, Obj) {
                state.user.id = Obj.id
                state.user.name = Obj.name
            }
        }
    })


//--- 方法
    // -> 全局方法 popup
    Vue.prototype.$popup = {
        prompt: function(callback) {
            if ( typeof callback!='function' ) {
                console.log('$popup.prompt：callback不是函数');
                return false;
            }
            // prompt -> 显示  vuex -> popup
            store.commit('popupVuex', {prompt: 1});
            // prompt -> 取消
            document.getElementById('cancel').onclick = function() {
                store.commit('popupVuex', {prompt: 0});
            }
            // prompt -> 确认
            document.getElementById('confirm').onclick = function() {
                store.commit('popupVuex', {prompt: 0});
                callback();
            }
        },
        success: function(callback) {
            if ( typeof callback!='function' ) {
                console.log('$popup.success：callback不是函数');
                return false;
            }
            // success -> 显示  vuex -> popup
            store.commit('popupVuex', {success: 1});
            // success -> 确认
            document.getElementById('success').onclick = function() {
                store.commit('popupVuex', {success: 0});
                callback();
            }
        },
        fail: function(callback) {
            if ( typeof callback!='function' ) {
                console.log('$popup.fail：callback不是函数');
                return false;
            }
            // fail -> 显示  vuex -> popup
            store.commit('popupVuex', {fail: 1});
            // fail -> 确认
            document.getElementById('fail').onclick = function() {
                store.commit('popupVuex', {fail: 0});
                callback();
            }
        }
    }

    // -> 格林威治时间转换  
    Date.prototype.format = function(format){
        let o = {
            "M+" : this.getMonth()+1,                   //month
            "d+" : this.getDate(),                      //day
            "h+" : this.getHours(),                     //hour
            "m+" : this.getMinutes(),                   //minute
            "s+" : this.getSeconds(),                   //second
            "q+" : Math.floor((this.getMonth()+3)/3),   //quarter
            "S" : this.getMilliseconds()                //millisecond
        }
        if (/(y+)/.test(format))
            format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("("+ k +")").test(format))
                format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    }
    Vue.prototype.$chGMT = function(gmtDate) {
        let mydate = new Date(gmtDate);
        mydate.setHours(mydate.getHours());
        return mydate.format("yyyy-MM-dd hh:mm:ss");
    }


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})