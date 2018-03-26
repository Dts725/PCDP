webpackJsonp([5],{

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_QueryExpress_vue__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_QueryExpress_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_QueryExpress_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_QueryExpress_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_QueryExpress_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_49b4a916_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_QueryExpress_vue__ = __webpack_require__(488);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(487)
}
var normalizeComponent = __webpack_require__(71)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-49b4a916"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_QueryExpress_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_49b4a916_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_QueryExpress_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\comment\\QueryExpress.vue"

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(47)
  hotAPI.install(__webpack_require__(33), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-49b4a916", Component.options)
  } else {
    hotAPI.reload("data-v-49b4a916", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatDate = formatDate;
function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            var str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

/***/ }),

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(30)(false);
// imports


// module
exports.push([module.i, "\n.top-query[data-v-49b4a916]{\r\n\tcolor: #444;\r\n\toverflow: hidden;\n}\n.input-search[data-v-49b4a916]{\r\n\tposition: fixed;\r\n\tleft: 0;\r\n\ttop: 40px;\r\n\twidth: 100%;\r\n\tz-index: 999;\n}\n.input-search span[data-v-49b4a916]:nth-of-type(1){\r\n\tcolor: #a9a9a9;\r\n\tposition: absolute;\r\n\ttop\t:15px;\r\n\tleft: 15px;\r\n\tfont-size: 30px;\n}\n.input-search input[data-v-49b4a916]{\r\n\toutline: none;\r\n\tbox-sizing: border-box;\r\n\theight: 50px;\r\n\tborder-radius: 0;\r\n\tfont-size: 14px;\r\n\ttext-align: cente;\r\n\ttext-indent: 60px;\r\n\tpadding: 0;\r\n\tborder: 8px;\r\n\tborder-style: solid;\r\n\tborder-color: #d9d9d9;\n}\n.header[data-v-49b4a916] {\r\n\tposition: fixed;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tz-index: 999;\n}\n.query-express[data-v-49b4a916]{\r\n\tposition: fixed;\r\n\ttop: 120px;\r\n\tleft: 5%;\r\n\twidth: 90%;\r\n\tz-index: 999;\n}\n.query-express .query-button[data-v-49b4a916] {\r\n\ttext-align: center;\n}\nul[data-v-49b4a916] {\r\n  list-style: none;\r\n  padding: 5px 0px;\n}\n.details-list-query li > ul[data-v-49b4a916] {\r\nwidth: 95%;\r\npadding: 5px 15px;\r\nmargin: 0 auto;\r\nfont-size: 14px;\r\nletter-spacing: 1px;\r\nmargin-top: 5px;\r\nborder: 1px solid #ccc;\r\n/* box-shadow: 0px 0px 5px -3px #5e5e5e; */\r\nborder-radius: 6px;\n}\n.details-list-query[data-v-49b4a916]{\r\n\toverflow: hidden;\r\n\tmargin-top: 190px;\n}\n.color[data-v-49b4a916]{\r\n\tcolor: #26a2ff;\n}\n.fill[data-v-49b4a916] {\r\n\tposition: fixed;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tbackground-color: #fff;\r\n\theight: 190px;\r\n\twidth: 100%;\r\n\tborder-bottom: 1px solid #ccc;\n}\n.exit[data-v-49b4a916]{\r\n\tdisplay: block;\r\n\twidth: 100%;\r\n\theight: 40px;\r\n\r\n\tline-height: 40px;\n}\n.mint-msgbox[data-v-49b4a916] {\r\n width: 75%;\r\n font-size: 14px;\n}\r\n", ""]);

// exports


/***/ }),

/***/ 468:
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

var _date = __webpack_require__(443);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import  '../../../store.js';
exports.default = {
  data: function data() {
    return {
      value: "",
      dataList: [],
      dataValueListQuery: [],
      accessToken: _config2.default.getCache("accessToken"),
      cooperateCode: _config2.default.getCache("cooperateCode"),
      mobileUserName: _config2.default.getCache("mobileUserName"),
      roleAuth: _config2.default.getCache("roleAuth")
    };
  },


  filters: {
    formatDate: function formatDate(time) {
      var date = new Date(time);
      return (0, _date.formatDate)(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    exit: function exit() {
      var _this = this;

      _mintUi.MessageBox.confirm('确定执行此操作?').then(function (action) {
        _this.$router.push("./");
      });
    },

    //扫描查询
    scanQuery: function scanQuery() {
      var that = this;
      window.NativeConn.NativeScanBar(function (datas) {
        scanWaybillNumberFn(datas);
      });
      var scanWaybillNumberFn = function scanWaybillNumberFn(datas) {
        //  console.log(datas);
        var valueTmp = that.dataValueListQuery.indexOf(datas);
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
          accessToken: that.accessToken,
          mobileUserName: that.mobileUserName,
          roleAuth: that.roleAuth,
          searchWayBillNo: parseInt(datas)
        };
        data = JSON.stringify(data);
        _config2.default.sign(data, _config2.default.LoginUrl + "pcpmobile/queryWayBillStatusInfo.action").then(function (res) {
          if (res.status == 200) {
            if (res.data.success == true) {
              that.dataList.unshift(res.data.wayBillInfo);
              //缓存去重的数组
              that.dataValueListQuery.unshift(res.data.searchWayBillNo);
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
      var valueTmp = this.dataValueListQuery.indexOf(this.value);
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

      var data = {
        accessToken: this.accessToken,
        mobileUserName: this.mobileUserName,
        roleAuth: this.roleAuth,
        searchWayBillNo: this.value
      };
      data = JSON.stringify(data);
      _config2.default.sign(data, _config2.default.LoginUrl + "pcpmobile/queryWayBillStatusInfo.action").then(function (res) {
        if (res.status == 200) {
          if (res.data.success == true) {
            // console.log(res.data);
            _this2.dataList.unshift(res.data.wayBillInfo);
            //缓存去重的数组
            _this2.dataValueListQuery.unshift(res.data.searchWayBillNo);
            _this2.value = null;
          } else {
            _this2.value = null;
            (0, _mintUi.Toast)({
              message: res.data.message,
              position: "middle",
              duration: 1000
            });
          }
        }
      }).catch(function (err) {
        (0, _mintUi.Toast)({
          message: "查询运单信息失败请重试 !",
          position: "middle",
          duration: 1200
        });
        _this2.value = null;
        console.log(err);
      });
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

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(456);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(70)("2f7ac9ce", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(456, function() {
     var newContent = __webpack_require__(456);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "top-query" }, [
    _c("div", { staticClass: "fill" }),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "header" },
      [
        _c("mt-header", { attrs: { title: "德邦快递代收-状态查询" } }, [
          _c(
            "span",
            {
              staticClass: "exit",
              attrs: { slot: "left" },
              on: { click: _vm.exit },
              slot: "left"
            },
            [
              _c(
                "svg",
                {
                  staticClass: "icon",
                  staticStyle: {
                    width: "20px",
                    height: "20px",
                    "margin-top": "0px",
                    "vertical-align": "middle",
                    fill: "currentColor",
                    overflow: "hidden"
                  },
                  attrs: {
                    viewBox: "0 0 1024 1024",
                    version: "1.1",
                    xmlns: "http://www.w3.org/2000/svg",
                    "p-id": "3588"
                  }
                },
                [
                  _c("path", {
                    attrs: {
                      d:
                        "M704.3 129.9v78.7c78 64.5 127.7 161.8 127.7 270.7 0 193.6-157.5 351.2-351.2 351.2S129.7 672.9 129.7 479.3c0-108.8 49.8-206.2 127.7-270.7v-78.7C142.3 203.7 65.9 332.4 65.9 479.3c0 229.2 185.8 415 415 415s415-185.8 415-415c0-146.9-76.5-275.6-191.6-349.4zM448.9 64.3h63.8v446.9h-63.8z",
                      "p-id": "3589"
                    }
                  })
                ]
              ),
              _vm._v("\n\t\t退出\n\t\t")
            ]
          )
        ])
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "input-search" }, [
      _c("span", { staticClass: "iconfont", on: { click: _vm.scanQuery } }, [
        _vm._v("")
      ]),
      _vm._v(" "),
      _c("span", [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model.trim",
              value: _vm.value,
              expression: "value",
              modifiers: { trim: true }
            }
          ],
          attrs: { placeholder: "请输入运单号", type: "text" },
          domProps: { value: _vm.value },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.value = $event.target.value.trim()
            },
            blur: function($event) {
              _vm.$forceUpdate()
            }
          }
        })
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "query-express" },
      [
        _c(
          "mt-button",
          {
            staticClass: "query-button",
            attrs: { size: "large" },
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
    ),
    _vm._v(" "),
    _c("div", { staticClass: "details-list-query" }, [
      _c(
        "ul",
        { staticClass: "data-list-query" },
        _vm._l(_vm.dataList, function(item) {
          return _c("li", { key: item.index }, [
            _c("ul", [
              _c("li", {}, [
                _vm._v("运单号   \t  : " + _vm._s(item.wayBillNo))
              ]),
              _vm._v(" "),
              item.status === "3"
                ? _c("li", {}, [_vm._v("运单状态\t : 到件")])
                : item.status === "7"
                  ? _c("li", {}, [_vm._v("运单状态\t : 签收")])
                  : item.status === "9"
                    ? _c("li", {}, [_vm._v("运单状态\t : 滞留")])
                    : item.status === "0"
                      ? _c("li", {}, [_vm._v("运单状态\t : 待到件")])
                      : item.status === "11"
                        ? _c("li", {}, [_vm._v("运单状态\t : 退件")])
                        : _c("li", {}, [_vm._v("运单状态\t : 滞留签收")]),
              _vm._v(" "),
              item.arriveTime
                ? _c("li", {}, [
                    _vm._v("到件时间 \t : "),
                    _c("span", { class: { color: item.status === "3" } }, [
                      _vm._v(
                        _vm._s(_vm._f("formatDate")(item.arriveTime)) + " "
                      )
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              item.signforTime
                ? _c("li", {}, [
                    _vm._v("签收时间 \t : "),
                    _c("span", { class: { color: item.status === "7" } }, [
                      _vm._v(
                        _vm._s(_vm._f("formatDate")(item.signforTime)) + " "
                      )
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              item.retentionTime
                ? _c("li", {}, [
                    _vm._v("滞留时间 \t : "),
                    _c("span", { class: { color: item.status === "9" } }, [
                      _vm._v(
                        _vm._s(_vm._f("formatDate")(item.retentionTime)) + " "
                      )
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              item.retentionSignTime
                ? _c("li", {}, [
                    _vm._v("滞留签收 \t : "),
                    _c("span", { class: { color: item.status === "10" } }, [
                      _vm._v(
                        _vm._s(_vm._f("formatDate")(item.retentionSignTime)) +
                          " "
                      )
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              item.fetchBackTime
                ? _c("li", {}, [
                    _vm._v("退件操作 \t : "),
                    _c("span", { class: { color: item.status === "11" } }, [
                      _vm._v(
                        _vm._s(_vm._f("formatDate")(item.fetchBackTime)) + " "
                      )
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("li", {}, [
                _vm._v("收件人    \t  : " + _vm._s(item.recipients))
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _vm._v("联系方式 \t : "),
                _c("a", { attrs: { href: "tel:" + item.recipientsPhone } }, [
                  _vm._v(" " + _vm._s(item.recipientsPhone) + " ")
                ])
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _vm._v("合作点    \t  : " + _vm._s(item.cooperateAddress))
              ])
            ])
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
    __webpack_require__(47)      .rerender("data-v-49b4a916", esExports)
  }
}

/***/ })

});