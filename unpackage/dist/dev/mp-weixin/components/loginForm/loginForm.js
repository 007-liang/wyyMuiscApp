"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_localstorage = require("../../utils/localstorage.js");
var utils_request = require("../../utils/request.js");
require("../../store/store-search.js");
var store_storeUserInfo = require("../../store/store-user-info.js");
require("../../utils/symbols.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup_message + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    let timer;
    let count = 0;
    const form = common_vendor.ref();
    const message = common_vendor.ref();
    const messageText = common_vendor.ref("");
    const msgType = common_vendor.ref("success");
    const disabled = common_vendor.ref(false);
    const showCode = common_vendor.ref(false);
    const sendCode = common_vendor.ref(false);
    const interval = common_vendor.ref(0);
    const storeUserInfo = store_storeUserInfo.useUserInfo();
    const formData = common_vendor.reactive({
      phone: "18320658783",
      pwd: "",
      captcha: ""
    });
    const rules = {
      phone: {
        rules: [
          {
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801"
          },
          {
            pattern: /^1\d{10}$/,
            errorMessage: "\u624B\u673A\u53F7\u7801\u683C\u5F0F\u4E0D\u6B63\u786E"
          }
        ]
      },
      pwd: {
        rules: [
          {
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u5BC6\u7801"
          }
        ]
      },
      captcha: {
        rules: [{
          required: true,
          errorMessage: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801"
        }]
      }
    };
    const submit = (type, ...identifier) => {
      return new Promise(async (resolve) => {
        form.value[type](identifier).then(resolve).catch(() => {
        });
      });
    };
    const login = async () => {
      const formData2 = await submit("validate");
      const { phone, pwd } = formData2;
      try {
        disabled.value = true;
        if (sendCode.value) {
          await validateCode();
        }
        const { data } = await utils_request.wxRequest({
          url: "/login/cellphone",
          data: {
            phone,
            md5_password: common_vendor.MD5(pwd)
          }
        });
        formData2.pwd = "";
        formData2.phone = "";
        if (data.code === 200) {
          msgType.value = "success";
          messageText.value = "\u767B\u5F55\u6210\u529F";
          utils_localstorage.setLocalStorage("cookie", data.cookie);
          storeUserInfo.setUserInof(data);
          setTimeout(() => common_vendor.index.redirectTo({ url: "/pages/my/my" }), 1e3);
        } else {
          msgType.value = "error";
          messageText.value = data.message;
          disabled.value = false;
          if (++count > 2 && !showCode.value) {
            showCode.value = true;
          }
        }
      } catch (errorMessage) {
        if (typeof errorMessage !== "string") {
          errorMessage = "\u8BF7\u68C0\u67E5\u60A8\u7684\u7F51\u7EDC\uFF01";
        }
        msgType.value = "warn";
        disabled.value = false;
        messageText.value = errorMessage;
      } finally {
        message.value.open();
      }
    };
    const getCode = async () => {
      var _a;
      await submit("validateField", "phone");
      let phone = formData.phone;
      const { data } = await utils_request.wxRequest({
        url: "/captcha/sent",
        data: { phone }
      });
      if (data.code === 200 && data.data) {
        interval.value = 60;
        sendCode.value = true;
        timer = setInterval(() => {
          if (--interval.value === 0) {
            clearInterval(timer);
            timer = null;
          }
        }, 1e3);
      } else {
        msgType.value = "warn";
        messageText.value = data.message;
        (_a = message.value) == null ? void 0 : _a.open();
      }
    };
    const validateCode = () => {
      return new Promise(async (resolve, reject) => {
        const { phone, captcha } = formData;
        utils_request.wxRequest({
          url: "/captcha/verify",
          data: {
            phone,
            captcha
          }
        }).then(({ data }) => {
          if (data.code === 200 && data.data) {
            resolve("OK");
          } else {
            reject(data.message);
          }
        }).catch(reject);
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => common_vendor.unref(formData).phone = $event),
        b: common_vendor.p({
          focus: true,
          type: "number",
          placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801",
          ["placeholder-style"]: "color: #ffffff",
          modelValue: common_vendor.unref(formData).phone
        }),
        c: common_vendor.p({
          name: "phone"
        }),
        d: common_vendor.o(($event) => submit("validate")),
        e: common_vendor.o(($event) => common_vendor.unref(formData).pwd = $event),
        f: common_vendor.p({
          type: "password",
          placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
          ["placeholder-style"]: "color: #ffffff",
          modelValue: common_vendor.unref(formData).pwd
        }),
        g: common_vendor.p({
          name: "pwd"
        }),
        h: showCode.value
      }, showCode.value ? {
        i: common_vendor.o(($event) => submit("validate")),
        j: common_vendor.o(($event) => common_vendor.unref(formData).captcha = $event),
        k: common_vendor.p({
          type: "number",
          placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
          ["placeholder-style"]: "color: #ffffff",
          modelValue: common_vendor.unref(formData).captcha
        }),
        l: common_vendor.t(interval.value === 0 ? "\u83B7\u53D6\u9A8C\u8BC1\u7801" : `${interval.value}\u79D2\u540E\u83B7\u53D6`),
        m: interval.value !== 0 ? 1 : "",
        n: interval.value !== 0,
        o: common_vendor.o(getCode),
        p: common_vendor.p({
          name: "captcha"
        })
      } : {}, {
        q: common_vendor.sr(form, "2081e806-0", {
          "k": "form"
        }),
        r: common_vendor.p({
          modelValue: common_vendor.unref(formData),
          rules
        }),
        s: disabled.value
      }, disabled.value ? {} : {}, {
        t: disabled.value ? 1 : "",
        v: common_vendor.o(login),
        w: disabled.value,
        x: common_vendor.p({
          type: "message",
          message: messageText.value,
          duration: 2e3
        }),
        y: common_vendor.sr(message, "2081e806-7", {
          "k": "message"
        }),
        z: common_vendor.p({
          type: "message"
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/components/loginForm/loginForm.vue"]]);
wx.createComponent(Component);
