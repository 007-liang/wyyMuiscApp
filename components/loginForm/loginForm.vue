<script setup lang="ts">
import { reactive, ref } from "vue";
import { getValidateCode, sendCaptcha, sendLogin } from "@/api";
import { setLocalStorage } from "@/utils";
import { useUserInfo } from "@/store";
import MD5 from "md5";

type TFromData = typeof formData;

let timer: any;
let count = 0;
const form = ref<IFormValidate<TFromData>>();
const message = ref<IMessage>();
const messageText = ref('');
const msgType = ref('success');
const disabled = ref(false);
const showCode = ref(false);
const sendCode = ref(false);
const interval = ref(0);
const storeUserInfo = useUserInfo();
const formData = reactive({
	phone: "18320658783",
	pwd: "",
	captcha: '',
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
	captcha: {
		rules: [{
			required: true,
			errorMessage: '请输入验证码',
		}]
	},
};

const submit = (
	type: 'validate' | 'validateField', 
	...identifier: string[]
) => {
	return new Promise<TFromData>(async (resolve) => {
		form.value![type](identifier)
		.then(resolve)
		.catch(() => {});
	});
};

const login = async () => {
	const formData = await submit('validate');
	const { phone, pwd } = formData;
	try {
		disabled.value = true;
		if (sendCode.value) {
			await validateCode();
		}
		const { data, } = await sendLogin(phone, MD5(pwd));
		formData.pwd = '';
		formData.phone = '';
		formData.captcha = '';
		if (data.code === 200) {
			msgType.value = 'success';
			messageText.value = '登录成功';
			setLocalStorage('cookie', data.cookie);
			storeUserInfo.setUserInfo(data as IUserInfo);
			setTimeout(() => (
				uni.redirectTo({ url: '/pages/my/my' })
			), 1000);
		} else {
			msgType.value = 'error';
			messageText.value = data.message!;
			disabled.value = false;
			// 计数验证失败，达到一定次数触发验证码
			if (++count > 2 && !showCode.value) {
				showCode.value = true;
			}
		}
	} catch (errorMessage) {
		if (typeof errorMessage !== 'string') {
			errorMessage = '请检查您的网络！';
		}
		msgType.value = 'warn';
		disabled.value = false;
		messageText.value = errorMessage as string;
	} finally {
		message.value!.open();
	}
};

const getCode = async () => {
	await submit('validateField', 'phone');
	const { data } = await sendCaptcha(formData.phone);
	if (data.code === 200 && data.data) {
		interval.value = 60;
		sendCode.value = true;
		timer = setInterval(() => {
			if ((--interval.value) === 0) {
				clearInterval(timer);
				timer = null;
			}
		}, 1000);
	} else {
		msgType.value = 'warn';
		messageText.value = data.message;
		message.value?.open();
	}
};

const validateCode = () => {
	return new Promise(async (resolve, reject) => {
		const { phone, captcha } = formData;
	 	getValidateCode(phone, captcha).then(({data}) => {
			if(data.code === 200 && data.data) {
				resolve('OK');
			} else {
				// ERROR
				reject(data.message);
			}
		}).catch(reject);
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
					placeholder="请输入密码"
					placeholder-style="color: #ffffff"
					@input="submit('validate')"
				/>
			</uni-forms-item>
			<uni-forms-item v-if="showCode" name="captcha">
				<view class="row">
					<uni-easyinput
						type="number"
						v-model="formData.captcha"
						placeholder="请输入验证码"
						placeholder-style="color: #ffffff"
						@input="submit('validate')"
					/>
					<button 
						class="code-btn" 
						:class="{ 'disabled-btn': interval !== 0 }"
						:disabled="interval !== 0"
						@click="getCode"
					>
						{{ interval === 0 ? '获取验证码' : `${interval}秒后获取` }}
					</button>
				</view>
			</uni-forms-item>
		</uni-forms>

		<button
			class="submit-btn"
			:class="{
				'disabled-btn': disabled,
			}"
			@click="login"
			:disabled="disabled"
		>
			<i 
				v-if="disabled" 
				class="iconfont icon-loading"
			>&#xe67b;</i>
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
	<!-- <text class="vistor-login" @click="login(true)">游客登录</text> -->
</template>

<style lang="less">
.login-form {
	margin: 0 auto;
	width: 80%;
}

.submit-btn,
.code-btn {
	color: #ffffff;
	background-color: #f22a25;
	box-shadow: 0px 0px 10rpx #b22727;
	transition-property: box-shadow background-color;
	transition-duration: 0.3s;
}

.submit-btn:active,
.code-btn:active {
	background-color: #d22522;
	box-shadow: inset 0px 0px 10rpx #b22727;
}

.submit-btn {
	margin-top: 30rpx;
}

.vistor-login {
	position: fixed;
	left: 50%;
	bottom: 10%;
	color: #eeeeee;
	transform: translateX(-50%);
}

.disabled-btn {
	background-color: #b92020 !important;
}


.row {
	display: flex;
	justify-content: space-between;
	gap: 40rpx;
}

.code-btn {
	margin: 0;
	width: 300rpx;
	font-size: 30rpx;
}

@keyframes rotateIcon {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.icon-loading {
	transform: translate(100px);
	animation: rotateIcon 2s infinite linear;
}
</style>
