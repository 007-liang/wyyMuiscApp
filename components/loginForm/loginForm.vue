<script setup lang="ts">
type TFromData = typeof formData;

const form = ref<IFormValidate<TFromData>>();
const message = ref<IMessage>();
const messageText = ref('');
const msgType = ref('success');
const uniSubmit = ref(false);
const formData = reactive({
	phone: "12312312321",
	pwd: "12321",
});
const rules = {
	// 对name字段进行必填验证
	phone: {
		rules: [
			{
				required: true,
				errorMessage: "请输入手机号码",
			},
			{
				pattern: /^1\d{10}$/,
				errorMessage: "手机号码格式不正确",
			},
		],
	},
	// 对pwd字段进行必填验证
	pwd: {
		rules: [
			{
				required: true,
				errorMessage: "请输入密码",
			},
		],
	},
};
const submit = () => {
	return new Promise<TFromData>((resolve, reject) => {
		form.value!.validate()
		.then((res) => {
			if (uniSubmit.value) {
				uniSubmit.value = false;
			}
			resolve(res);
		})
		.catch((err) => {
			if (Array.isArray(err)) {
				for (let i = 0; i < err.length; i++) {
					let item = err[i];
					if (item.key === "pwd") {
						uniSubmit.value = true;
						break;
					} else {
						uniSubmit.value = false;
					}
				}
			}
		});
	});
};
const login = () => {
	submit().then(async (formData) => {
		const { phone, pwd } = formData;
		try {
			const { data, } = await wxRequest<ILoginStatus>({
				url: "/login/cellphone",
				data: {
					phone,
					md5_password: MD5(pwd),
				},
			});
			if (data.code === 200) {
				msgType.value = 'success';
				messageText.value = '登录成功';
			} else {
				msgType.value = 'error';
				messageText.value = data.message;
			}
		} catch {
			msgType.value = 'warn';
			messageText.value = '请检查您的网络！';
		} finally {
			message.value?.open();
		}
	});
};
</script>

<template>
	<view class="login-form">
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-forms-item name="phone">
				<uni-easyinput
					focus
					type="number"
					v-model="formData.phone"
					placeholder="请输入手机号码"
					placeholder-style="color: #ffffff"
				/>
			</uni-forms-item>
			<uni-forms-item name="pwd">
				<uni-easyinput
					type="password"
					v-model="formData.pwd"
					placeholder="请输入您的密码"
					placeholder-style="color: #ffffff"
					@input="submit"
				/>
			</uni-forms-item>
		</uni-forms>
		<button
			class="submit-btn"
			:class="uniSubmit ? 'err-submit' : ''"
			@click="login"
		>
			登录
		</button>
	</view>
	<uni-popup ref="message" type="message">
		<uni-popup-message
			type="message" 
			:message="messageText" 
			:duration="2000"
		></uni-popup-message>
	</uni-popup>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { wxRequest } from "@/utils";
import MD5 from "md5";
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
import uniPopupMessage from '@/uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.vue'
</script>

<style lang="less">
.login-form {
	margin: 0 auto;
	width: 80%;
}

.submit-btn {
	color: #ffffff;
	background-color: #f22a25;
	box-shadow: 0px 0px 10rpx #b22727;
	transition-property: box-shadow background-color;
	transition-duration: 0.3s;
}

.submit-btn:active {
	background-color: #d22522;
	box-shadow: inset 0px 0px 10rpx #b22727;
}

.err-submit {
	margin-top: 30rpx;
}
</style>
