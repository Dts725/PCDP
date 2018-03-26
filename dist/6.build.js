webpackJsonp([6],{

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_ToPieces_vue__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_ToPieces_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_ToPieces_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_ToPieces_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_ToPieces_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_6b1c82a0_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_ToPieces_vue__ = __webpack_require__(478);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(477)
}
var normalizeComponent = __webpack_require__(71)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_ToPieces_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_6b1c82a0_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_ToPieces_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\tabbarcontainers\\topieces\\ToPieces.vue"

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(47)
  hotAPI.install(__webpack_require__(33), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b1c82a0", Component.options)
  } else {
    hotAPI.reload("data-v-6b1c82a0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(30)(false);
// imports


// module
exports.push([module.i, "\ninput[type=\"search\"] {\r\n  margin-bottom: 0;\r\n  font-size: 16px;\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n  height: 34px;\r\n  text-align: center;\r\n  border: 0;\r\n  border-radius: 6px;\r\n  background-color: rgba(130, 201, 0, 0);\n}\n.mint-search {\r\n  height: 100%;\r\n  height: 100%;\r\n  overflow: hidden;\n}\n.query {\r\n  margin: 0 auto;\r\n  margin-top: 15px;\r\n  width: 80%;\n}\n.mint-searchbar-inner {\r\n  height: 36px;\r\n  /* background-color: red; */\n}\n.query-button.mint-button--default {\r\n  font-weight: 700;\r\n  margin: 0 auto;\r\n  margin-top: 1em;\r\n  background-color: #d9d9d912;\r\n  width: 80%;\r\n  font-size: 95%;\r\n  height: 2.2em;\r\n  border-radius: 3px;\r\n  text-align: center;\r\n  color: #8c7d76;\r\n  box-shadow: 0px 0px 2px 1px #898d9242;\n}\n.mint-button::after {\r\n  background-color: #f6f0f0;\r\n  content: \" \";\r\n  opacity: 0;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  position: absolute;\n}\nbutton:enabled:active {\r\n  color: #4a4747;\r\n  background-color: #bfbfbf21;\n}\nul {\r\n  list-style: none;\n}\n.warp-topieces {\r\n\t position: fixed;\r\n\ttop: 40px;\r\n\tleft: 0;\r\n\twidth: 100%; \r\n\tz-index: 555;\r\n\t/* margin-top: 140px; */\r\n\theight: 140px;\r\n\tbackground-color: #fff;\n}\n.data-list {\r\n\t/* overflow: auto; */\r\n-webkit-overflow-scrolling: touch;\r\n  margin-top: 10px;\n}\n.data-list li {\r\n\tletter-spacing: 0;\r\n\t/* border-radius: 5px; */\r\n\tfont-size: 14px;\r\n\theight: 51px;\r\n\tbox-sizing: border-box;\r\n\tpadding: 10px 5px;\r\n\tborder: 1px solid #ccc;\r\n\tdisplay: flex;\r\n\tjustify-content: space-between;\r\n\talign-items: center;\r\n\tmargin-bottom: 5px;\n}\n.data-list li >span:nth-of-type(2) {\r\n\tpadding: 1px 10px;\r\n\tfont-size: 12px;\r\n\tborder: 1px solid #26a2ff;\r\n\ttext-align: center;\r\n\tflex: none;\n}\n.data-list li > span:nth-of-type(1) {\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\n}\n.mint-search-list {\r\n  overflow: auto;\r\n  padding-top: 0;\n}\n.mint-msgbox {\r\n  width: 75%;\r\n  font-size: 90%;\n}\n#scan-topieces {\r\n  /* background: red; */\r\n  width: 36px;\r\n  height: 36px;\r\n  position: absolute;\r\n  margin: -44px 0px 0px 13px;\r\n  /* transform: translate(13px,-44px); */\r\n  z-index: 2;\n}\n.top-pieces {\r\n\toverflow: hidden;\r\n\tmargin-top: 40px;\n}\n.mintui-search:before{\r\n\tline-height: 31px;\n}\n.data-list-warp {\r\n\tmargin-top: 140px;\r\n\tmargin-bottom: 50px;\r\n\toverflow: hidden;\n}\r\n", ""]);

// exports


/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mintUi = __webpack_require__(113);

var _config = __webpack_require__(72);

var _config2 = _interopRequireDefault(_config);

var _axios = __webpack_require__(73);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import  '../../../store.js';
exports.default = {
  data: function data() {
    return {
      isDisabled: false, // 默认是可以点击的
      flagTopieces: 1,
      value: "",
      dataList: [],
      dataPiecesValueList: [],
      accessToken: _config2.default.getCache("accessToken"),
      cooperateCode: _config2.default.getCache("cooperateCode"),
      mobileUserName: _config2.default.getCache("mobileUserName"),
      roleAuth: _config2.default.getCache("roleAuth")
    };
  },
  mounted: function mounted() {
    this.createdToPieces();
  },
  beforeDestroy: function beforeDestroy() {
    this.beforeDestroyTopieces();
  },


  methods: {
    //调用原生扫描valueTmp
    scanTopeieces: function scanTopeieces() {
      var that = this;
      window.NativeConn.NativeScanBar(function (datas) {

        scanWaybillNumberFn(datas);
      });
      var scanWaybillNumberFn = function scanWaybillNumberFn(datas) {
        console.log(datas);
        //  console.log(datas);
        var valueTmp = that.dataPiecesValueList.indexOf(datas);
        //禁止重复查询订单-----------------------------------------------------------------------------------------------------
        if (valueTmp != -1) {
          (0, _mintUi.Toast)({
            message: "请勿重复输入该订单!",
            position: "middle",
            duration: 1000
          });
          that.value = null;
          return;
        }
        var data = {
          searchWayBillNo: parseInt(datas),
          accessToken: that.accessToken,
          cooperateCode: that.cooperateCode,
          mobileUserName: that.mobileUserName,
          roleAuth: that.roleAuth
        };
        data = JSON.stringify(data);
        _config2.default.sign(data, _config2.default.LoginUrl + "pcpmobile/searchWayBill.action").then(function (res) {
          if (res.status == 200) {
            if (res.data.success == true) {
              var tmp = res.data.wayBillInfo;
              console.log(tmp);

              that.dataList.push(tmp);
              //缓存去重的数组
              console.log(that.dataList);

              that.dataPiecesValueList.unshift(res.data.searchWayBillNo);
              console.log(that.dataPiecesValueList);

              that.value = null;
            } else {
              (0, _mintUi.Toast)({
                message: res.data.message,
                position: "middle",
                duration: 1000
              });
              that.value = null;
            }
          }
        }).catch(function (err) {
          (0, _mintUi.Toast)({
            message: "查询运单信息失败请重试 !",
            position: "middle",
            duration: 1200
          });
          that.value = null;
          console.log(err);
        });
      };
      //跳转空白页
      //   this.$router.push('/Opacity')
    },

    toPieces: function toPieces(itemId, wayBillNo, $index) {
      var _this = this;

      _mintUi.MessageBox.confirm("确定执行到件操作?").then(function (action) {
        //到件请求函数
        var data = {
          accessToken: _this.accessToken,
          cooperateCode: _this.cooperateCode,
          mobileUserName: _this.mobileUserName,
          roleAuth: _this.roleAuth,
          operationRequest: {
            operationId: itemId,
            operationStatus: "300",
            operationWayBillNo: wayBillNo
          }
        };
        data = JSON.stringify(data);
        _config2.default.sign(data, _config2.default.LoginUrl + "pcpmobile/arriveWayBill.action").then(function (res) {
          if (res.status == 200 && res.data.success == true) {
            _this.dataList.splice($index, 1);
            //删除对应的缓存数组元素
            _this.dataPiecesValueList.splice($index, 1);
            _this.flagTopieces = 0;
            _this.$store.commit("signNumberCommit", _this.$store.state.tips.signNumber + 1);
            (0, _mintUi.Toast)({
              message: "操作成功",
              iconClass: "icon icon-success",
              position: "middle",
              duration: 500
            });
          }
        }).catch(function (err) {
          (0, _mintUi.Toast)({
            message: "到件操作失败,请重试 !",
            position: "middle",
            duration: 1200
          });
          _this.value = null;
          console.log(err);
        });
      });
      //   this.$router.push('/Opacity')
    },
    openToast: function openToast() {
      var _this2 = this;

      if (this.value == "") {
        (0, _mintUi.Toast)({
          message: "请输入运单号查询!",
          position: "middle",
          duration: 1000
        });
        return;
      }
      var valueTmp = this.dataPiecesValueList.indexOf(this.value);
      //禁止重复查询订单
      if (valueTmp != -1) {
        (0, _mintUi.Toast)({
          message: "请勿重复输入该订单!",
          position: "middle",
          duration: 1000
        });
        this.value = null;
        return;
      }

      //发送查询请求
      this.isDisabled = true;
      var data = {
        searchWayBillNo: parseInt(this.value),
        accessToken: this.accessToken,
        cooperateCode: this.cooperateCode,
        mobileUserName: this.mobileUserName,
        roleAuth: this.roleAuth
      };
      data = JSON.stringify(data);
      _config2.default.sign(data, _config2.default.LoginUrl + "pcpmobile/searchWayBill.action").then(function (res) {
        if (res.status == 200) {
          if (res.data.success == true) {
            // console.log(res.data);
            _this2.dataList.unshift(res.data.wayBillInfo);
            //缓存去重的数组
            _this2.dataPiecesValueList.unshift(res.data.searchWayBillNo);
            _this2.value = null;
            _this2.isDisabled = false;
          } else {
            _this2.value = null;
            (0, _mintUi.Toast)({
              message: res.data.message,
              position: "middle",
              duration: 1000
            });
            _this2.isDisabled = false;
          }
        }
      }).catch(function (err) {
        _this2.isDisabled = false;

        (0, _mintUi.Toast)({
          message: "查询运单信息失败请重试 !",
          position: "middle",
          duration: 1200
        });
        _this2.value = null;
        console.log(err);
      });
    },

    //creatd 中的函数
    createdToPieces: function createdToPieces() {
      var that = this;
      //待处理件数
      var data = {
        accessToken: this.accessToken,
        mobileUserName: this.mobileUserName,
        cooperateCode: this.cooperateCode
      };
      JSON.stringify(data);
      _config2.default.tipNumber(data, _config2.default.LoginUrl + 'pcpmobile/queryTotalCount.action', that);

      //页面是否走缓存
      if (this.$store.state.toPieces.dataListToPieces) {
        this.dataList = this.$store.state.toPieces.dataListToPieces;
      }
      if (this.$store.state.toPieces.dataPiecesValueList) {
        this.dataPiecesValueList = this.$store.state.toPieces.dataPiecesValueList;
      }
      this.$store.dispatch("flagTopiecesActions", 1);
    },
    beforeDestroyTopieces: function beforeDestroyTopieces() {
      try {
        this.$store.dispatch("dataListToPiecesActions", this.dataList); //页面展示数据
        this.$store.dispatch("dataPiecesValueListActions", this.dataPiecesValueList); //运单信息
        this.$store.dispatch("flagTopiecesActions", this.flagTopieces); //页面刷新
      } catch (error) {
        console.log(error);
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(447);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(70)("74c76aa2", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(447, function() {
     var newContent = __webpack_require__(447);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "top-pieces" }, [
    _c("div", { staticClass: "warp-topieces" }, [
      _c(
        "div",
        [
          _c("mt-search", {
            attrs: { "cancel-text": "取消", placeholder: "请输入运单号" },
            model: {
              value: _vm.value,
              callback: function($$v) {
                _vm.value = typeof $$v === "string" ? $$v.trim() : $$v
              },
              expression: "value"
            }
          }),
          _vm._v(" "),
          _c("div", {
            attrs: { id: "scan-topieces" },
            on: { click: _vm.scanTopeieces }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "query" },
        [
          _c(
            "mt-button",
            {
              staticClass: "query-button",
              attrs: { disabled: _vm.isDisabled, size: "large" },
              on: {
                click: function($event) {
                  _vm.openToast()
                }
              }
            },
            [_vm._v("查询运单")]
          )
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "data-list-warp" }, [
      _c(
        "ul",
        { staticClass: "data-list" },
        _vm._l(_vm.dataList, function(item, index) {
          return _c("li", { key: item.topiexesId }, [
            _c("span", [
              _vm._v(
                "运单号 : " +
                  _vm._s(item.wayBillNo) +
                  "    签收人 : " +
                  _vm._s(item.recipients)
              )
            ]),
            _vm._v(" "),
            _c(
              "span",
              {
                on: {
                  click: function($event) {
                    _vm.toPieces(item.id, item.wayBillNo, index)
                  }
                }
              },
              [_vm._v("到件")]
            )
          ])
        })
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
    __webpack_require__(47)      .rerender("data-v-6b1c82a0", esExports)
  }
}

/***/ })

});