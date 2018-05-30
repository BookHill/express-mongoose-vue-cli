<template>
    <ul class="clearfix popup">
        <li class="popup_prompt" v-show="this.$store.state.popup.prompt" style="display: none;">
            <dl>
				<dt><img src="@/assets/popup/ask.png" alt="img"/></dt>
				<dd class="writing">
					<p>确认执行此操作吗?</p>
				</dd>
				<dd>
					<input id="cancel" class="cancel" type="button" value="取消"/>
					<input id="confirm" class="confirm" type="button" value="确认"/>
				</dd>
			</dl>
        </li>
        <li class="popup_success" v-show="this.$store.state.popup.success" style="display: none;">
            <dl>
				<dt><img src="@/assets/popup/success.png" alt="img"/></dt>
				<dd class="writing">
					<p>操作成功</p>
				</dd>
				<dd>
					<input id="success" class="confirm" type="button" value="确认"/>
				</dd>
			</dl>
        </li>
        <li class="popup_fail" v-show="this.$store.state.popup.fail" style="display: none;">
            <dl>
				<dt><img src="@/assets/popup/fail.png" alt="img"/></dt>
				<dd class="writing">
					<p>操作失败</p>
				</dd>
				<dd>
					<input id="fail" class="confirm" type="button" value="确认"/>
				</dd>
			</dl>
        </li>
    </ul>
</template>

<style>
    /* pop-up */
	.popup_prompt,
	.popup_success,
	.popup_fail {
		position: fixed;
		z-index: 9999;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0,0,0,0.34);
	}
	.popup dl {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -150px;
		margin-left: -250px;
		height: 300px;
		width: 500px;
		text-align: center;
		background: #fff;
		border-radius: 4px;
	}
    .popup dl dt {
		padding-top: 35px;
		padding-bottom: 20px;
	}
	.popup dl .writing {
		height: 75px;
	}
	.popup dl p {
		padding-bottom: 10px;
		font-size: 30px;
		color: #333;
	}
	.popup dl input {
		height: 40px;
		width: 100px;
		font-size: 16px;
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
	.popup dl .cancel {
		background: #E2A030;
	}
    .popup dl .cancel:focus,
	.popup dl .cancel:hover {
		background: #D1932A;
	}
	.popup dl .confirm {
		background: #337AB7;
	}
    .popup dl .confirm:focus,
	.popup dl .confirm:hover {
		background: #296EAA;
	}
</style>