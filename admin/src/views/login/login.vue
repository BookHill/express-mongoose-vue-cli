<template>
    <div class="loginVue">
        <!-- header -->
        <header class="head min-layout">
            <div class="headBox">
                <div class="layout">
                    <strong class="title">网站管理系统</strong>
                </div>
            </div>
        </header>
        <!-- middle -->
        <div class="middle min-layout">
            <div class="middleBox">
                <ul class="layout">
                    <li class="left">
                        <img src="@/assets/login/login.jpg" width="537" height="360" alt="login"/>
                    </li>
                    <li class="right">
                        <form id="login" enctype="multipart/form-data" @submit.prevent="validateBeforeSubmit">
                            <dl>
                                <dt>后台登陆</dt>
                                <dd>
                                    <input :class="{'is-danger': errors.has('name')}" 
                                        v-validate="'required|alpha_dash'" 
                                        type="text" 
                                        name="name" 
                                        placeholder="admin"/>
                                    <label class="is-danger" v-show="errors.has('name')">{{ errors.first('name') }}</label>
                                </dd>
                                <dd>
                                    <input :class="{'is-danger': errors.has('password')}" 
                                        v-validate="'required|alpha_dash'" 
                                        type="password" 
                                        name="password" 
                                        placeholder="admin" 
                                        @keyup.enter="validateBeforeSubmit"/>
                                    <label class="is-danger" v-show="errors.has('password')">{{ errors.first('password') }}</label>
                                </dd>
                            </dl>
                            <div class="loginBtn">
                                <input type="submit" name="login" value="登 陆"/>
                            </div>
                            <label class="label">{{ label }}</label>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
        <!-- footer -->
        <footer class="foot min-layout">
            <div class="layout">
                <ul class="copyright">
                    <li><p>Copyright©2018备案号：***备***号</p></li>
                </ul>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                label: ''
            }
        },
        methods: {
            onceTime() {
                setTimeout(() => {
                    this.label = '';
                },3000);
            },
            login() {
                // FormData
                let formData = new FormData(document.getElementById('login'));
                this.$http({
                    method: 'post',
                    url: '/api/users/login',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( (response) => {
                    let res = response.data;
                    if ( res.session==true && res.status==1 ) {
                        // router -> index
                        this.$router.push({ path: `/home` });
                    } else {
                        this.label = res.info;
                        this.onceTime();
                    }
                }).catch( (error) => {
                    console.log(error);
                });
            },
            // vee-validate
            validateBeforeSubmit() {
                this.$validator.validateAll().then( (result) => {
                    if (result) {
                        this.login();
                        return;
                    }
                });
            }
        }
    }
</script>

<style>
    /*header*/
	.head {
		position: absolute;
		top: 0;
		height: 15%;
        width: 100%;
		background-color: #F9F9F9;
	}
    .head .headBox {
		position: absolute;
        left: 0;
		right: 0;
		bottom: 22%;
	}
    .head .title {
		font-size: 25px;
		font-family: "微软雅黑";
		color: #016198;
	}
    /*middle*/
    .middle {
		position: absolute;
		top: 15%;
		bottom: 15%;
		width: 100%;
		min-height: 400px;
		background-color: #d3e6fd;
	}
    .middle .middleBox {
        position: absolute;
        top: 50%;
        left: 0;
		right: 0;
        margin-top: -180px;
        height: 360px;
    }
    .middle li.left {
        height: 360px;
        width: 540px;
        overflow: hidden;
    }
    .middle li.right {
        height: 360px;
		width: 300px;
		background-color: #fff;
    }
    .middle dl dt {
        margin-bottom: 20px;
        padding-left: 25px;
        font-size: 15px;
        line-height: 45px;
        color: #666;
        background: #fafafa;
        border-bottom: 1px solid #eee;
    }
    .middle dl dd {
        position: relative;
        padding-left: 25px;
        padding-bottom: 25px;
        width: 250px;
    }
    .middle dl input {
		height: 35px;
		width: 100%;
		border: 1px solid #dcdcdc;
		text-indent: 10px;
		-webkit-box-sizing: border-box;
		   -moz-box-sizing: border-box;
			-ms-box-sizing: border-box;
			 -o-box-sizing: border-box;
				box-sizing: border-box;
	}
    .middle .loginBtn input {
        height: 35px;
        width: 250px;
        margin-left: 25px;
        font-size: 16px;
        color: #454545;
        background: #8BB3EF;
        border-color: transparent;
        border-radius: 4px;
        letter-spacing: 10px;
        cursor: pointer;
    }
    .middle dl input:focus {
        border: 1px solid #00D1B2;
    }
    .middle dl input.is-danger {
        border: 1px solid #ff3860;
    }
    .middle label.label {
        padding-left: 27px;
		font-size: 12px;
		line-height: 30px;
		color: #ff3860;
    }
    .middle label.is-danger {
        position: absolute;
        top: 40px;
        left: 25px;
        z-index: 9;
		font-size: 12px;
        line-height: 15px;
		color: #ff3860;
        white-space: nowrap;		/* 强制不换行 */
	}
    /*footer*/
    .foot {
        position: fixed;
        bottom: 0;
        height: 15%;
        width: 100%;
        background-color: #F9F9F9;
    }
    .foot .copyright {
        padding-top: 20px;
    }
    .foot .copyright li {
        float: left;
        margin-right: 30px;
    }
    .foot .copyright li p,
    .foot .copyright li span {
        font-size: 12px;
        color: #888;
    }
</style>