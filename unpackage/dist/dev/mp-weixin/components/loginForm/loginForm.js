"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + uniPopupMessage + uniPopup)();
}
const uniPopup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const uniPopupMessage = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const form = common_vendor.ref();
    const message = common_vendor.ref();
    const messageText = common_vendor.ref("");
    const msgType = common_vendor.ref("success");
    const uniSubmit = common_vendor.ref(false);
    const formData = common_vendor.reactive({
      phone: "12312312321",
      pwd: "12321"
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
      }
    };
    const submit = () => {
      return new Promise((resolve, reject) => {
        form.value.validate().then((res) => {
          if (uniSubmit.value) {
            uniSubmit.value = false;
          }
          resolve(res);
        }).catch((err) => {
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
      submit().then(async (formData2) => {
        var _a;
        const { phone, pwd } = formData2;
        try {
          const { data } = await utils_request.wxRequest({
            url: "/login/cellphone",
            data: {
              phone,
              md5_password: common_vendor.MD5(pwd)
            }
          });
          if (data.code === 200) {
            msgType.value = "success";
            messageText.value = "\u767B\u5F55\u6210\u529F";
          } else {
            msgType.value = "error";
            messageText.value = data.message;
          }
        } catch {
          msgType.value = "warn";
          messageText.value = "\u8BF7\u68C0\u67E5\u60A8\u7684\u7F51\u7EDC\uFF01";
        } finally {
          (_a = message.value) == null ? void 0 : _a.open();
        }
      });
    };
    return (_ctx, _cache) => {
      return {
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
        d: common_vendor.o(submit),
        e: common_vendor.o(($event) => common_vendor.unref(formData).pwd = $event),
        f: common_vendor.p({
          type: "password",
          placeholder: "\u8BF7\u8F93\u5165\u60A8\u7684\u5BC6\u7801",
          ["placeholder-style"]: "color: #ffffff",
          modelValue: common_vendor.unref(formData).pwd
        }),
        g: common_vendor.p({
          name: "pwd"
        }),
        h: common_vendor.sr(form, "2081e806-0", {
          "k": "form"
        }),
        i: common_vendor.p({
          modelValue: common_vendor.unref(formData),
          rules
        }),
        j: common_vendor.n(uniSubmit.value ? "err-submit" : ""),
        k: common_vendor.o(login),
        l: common_vendor.p({
          type: "message",
          message: messageText.value,
          duration: 2e3
        }),
        m: common_vendor.sr(message, "2081e806-5", {
          "k": "message"
        }),
        n: common_vendor.p({
          type: "message"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/components/loginForm/loginForm.vue"]]);
wx.createComponent(Component);
