<template>
    <div class="app-container">
        <levelbar></levelbar>
        <div class="form-box">
            <div class="form-title">添加代理商</div>
            <el-form label-width="100px" class="app-content form" :rules="rules" :model="ruleForm" ref="ruleForm">
                <div class="form-item">
                    <div class="form-item-title">
                        <span class="title-level">代理商信息</span>
                    </div>
                    <div class="form-content">
                        <el-row :gutter="21" class='input-hidden'>
                            <el-col :span="10">
                                <el-input name="old-userName" type="text" disabled ></el-input>
                                <el-input name="old-pwd" type="password" disabled ></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="21">               
                            <el-col :span="12">
                                <el-form-item label="用户名" prop="account">
                                    <el-popover placement="top-start" trigger="focus" content="字符长度不大于20个"> 
                                        <el-input v-model="ruleForm.account" placeholder="请输入用户名" :maxlength="20" slot="reference" style="width:95%"></el-input>
                                    </el-popover>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="负责人" prop="userName">
                                    <el-popover placement="top-start" trigger="focus" content="字符长度不大于6个"> 
                                        <el-input v-model="ruleForm.userName" placeholder="请输入负责人姓名" :maxlength="6" slot="reference" style="width:95%"></el-input>
                                    </el-popover>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        
                        <el-row :gutter="21">  
                            <el-col :span="12">
                                <el-form-item label="手机号" prop="phone">
                                    <el-popover placement="top-start" trigger="focus" content="字符长度不大于11个">
                                        <el-input v-model="ruleForm.phone" placeholder="请输入手机号" :maxlength="11" slot="reference" style="width:95%"></el-input>
                                    </el-popover>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="密码" prop="password1">
                                    <el-popover placement="top-start" trigger="focus" content="由6~16位英文、数字所组成">
                                        <el-input v-model="ruleForm.password1" placeholder="请输入登录密码" type="password" auto-complete="off" :maxlength="16" slot="reference" style="width:95%"></el-input>
                                    </el-popover>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="21">        
                            <el-col :span="12">
                                <el-form-item label="确认密码" prop="password2">
                                    <el-popover placement="top-start" trigger="focus" content="由6~16位英文、数字所组成">
                                        <el-input v-model="ruleForm.password2" placeholder="请再次输入密码" type="password" auto-complete="off" :maxlength="16" slot="reference" style="width:95%"></el-input>
                                    </el-popover>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="form-item-title">
                        <span class="title-level">负责区域</span>
                    </div>
                    <div class="form-content">
                        <el-row v-for="(site,index) in ruleForm.dataAgent" class="areaBoxcon" v-bind:class="{ 'area-first': index==0 }" :key="site.key">
                            <el-row :gutter='21'>
                                <el-col :span="7">
                                    <el-form-item label="所选省：" :prop="'dataAgent.' + index + '.fProvinceId'" 
                                    :rules="{required: true, message: '所选省不能为空', trigger: 'change'}">
                                        <province v-model="site.fProvinceId"></province>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1">
                                    <el-form-item label="所选市：">
                                        <city v-model="site.fCityId" :province="site.fProvinceId"></city>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1">
                                    <el-form-item label="所选区县：">
                                        <region v-model="site.fAreaId" :city="site.fCityId"></region>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter='21'>
                                <el-col :span="7">
                                    <el-form-item label="代理金额：" :prop="'dataAgent.' + index + '.sAgentPrice'" :rules="[{required: true, message: '代理金额不能为空', trigger: 'blur'},{ pattern: /^[0-9]\d*$/, message: '代理金额最低为0元，且为整数', trigger: 'blur'}]">
                                        <el-popover placement="top-start" trigger="focus" content="字符长度不大于9个">
                                            <el-input v-model="site.sAgentPrice" placeholder="请输入代理金额（单位：元）" :maxlength="9" slot="reference"></el-input>
                                        </el-popover>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1">
                                    <el-form-item label="开始日期：" :prop="'dataAgent.' + index + '.sAgentStartDate'" :rules="{required: true, type:'date', message: '开始日期不能为空', trigger: 'change'}"> 
                                        <start-date v-model="site.sAgentStartDate" :picker-options="site.pickerOptions1" :end-date-options.sync="site.pickerOptions2"></start-date>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1">
                                    <el-form-item label="结束日期：" :prop="'dataAgent.' + index + '.sAgentEndDate'" :rules="{required: true, type:'date', message: '结束日期不能为空', trigger: 'change'}">
                                        <end-date v-model="site.sAgentEndDate" :picker-options="site.pickerOptions2" :start-date-options.sync="site.pickerOptions1"></end-date>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="1" v-if="index != 0">
                                    <el-button type="text" class="delBtn" @click.prevent="removeDomain(index)"><i class="el-icon-delete"></i></el-button>
                                </el-col>
                            </el-row>
                        </el-row>
                        <el-button type="text" @click="addArea" class="addBtn btn-success"><i class="el-icon-plus"></i> 继续添加</el-button>
                    </div>
                </div>
                <div class="form-item">
                    <el-form-item class="footer">
                        <el-button @click="resetForm">取消</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import Levelbar from '../layout/Levelbar';
import { saveAgent, findAccountIsExist} from 'api/agentMangement';
import startDate from 'components/Datepicker/startDate';
import endDate from 'components/Datepicker/endDate';
import moment from 'moment';
import province from 'components/CascadeRegion/province';
import city from 'components/CascadeRegion/city';
import region from 'components/CascadeRegion/region';
export default{
    components: { Levelbar, startDate, endDate, province, city, region },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('password2');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password1) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        // 登录名判断重复
        var loginUserName = (rule, value, callback) => {
            if (value =='') {
                callback(new Error('请输入用户名'));
            } else if (value.indexOf(' ') == -1) {
                findAccountIsExist(value).then(res => {
                    callback();
                }).catch(e => {
                    callback(new Error('用户名已存在'));
                }) 
            } else {
                callback(new Error('请勿输入空格'));
            }
        };
        return { 
            ruleForm: {
                account: '', // 账户
                userName: '', // 用户名
                phone: '',
                password1: '',
                password2: '',
                findCity: [],
                findArea: [],
                province: [],
                dataAgent: [// 全部数据
                    {
                        fProvinceId: '',
                        fCityId: '',
                        fAreaId: '',
                        sAgentPrice: '',
                        sAgentStartDate: '',
                        sAgentEndDate: '',
                        findCity: [],
                        findArea: [],
                        pickerOptions1: {},
                        pickerOptions2: {}
                    }
                ]
            },
            rules: {
                account: [
                    { required: true, validator: loginUserName, trigger: 'blur' },
                    { pattern: /^[^ ]+$/, message: '请勿输入空格', trigger: 'change'}
                ],
                userName: [
                    { required: true, message: '请输入负责人姓名', trigger: 'blur' },
                    { pattern: /^[^ ]+$/, message: '请勿输入空格', trigger: 'change'}
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/, message: '手机格式不正确', trigger: 'blur'}
                ],
                password1: [
                    { validator: validatePass, trigger: 'blur', required: true },
                    { pattern: /^[a-zA-Z0-9]+$/, message: '密码格式不正确，密码由6~16位英文、数字所组成', trigger: 'blur'},
                    { pattern: /^[^ ]+$/, message: '请勿输入空格', trigger: 'change'}
                ],
                password2: [
                    { validator: validatePass2, trigger: 'blur', required: true },
                    { pattern: /^[a-zA-Z0-9]+$/, message: '密码格式不正确，密码由6~16位英文、数字所组成', trigger: 'blur'},
                    { pattern: /^[^ ]+$/, message: '请勿输入空格', trigger: 'change'}
                ]
            }

        }
    },
    methods: {
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let areaList = this.ruleForm.dataAgent.map(item => {
                        return item.fProvinceId+item.fCityId+item.fAreaId;
                    })
                    for (let i = 0;i<areaList.length;i++) {
                        let arrList = areaList;
                        arrList = arrList.splice(i, 1)
                        if (arrList.indexOf(areaList[i])>-1) {
                            this.$message({
                                type: 'error',
                                message: '代理区域重复'
                            });
                            return;
                        }
                    }
                    this.$confirm('确定要提交吗?', ' ', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        var dataAgentList = []// 所需参数
                        for (let i = 0;i< this.ruleForm.dataAgent.length;i++) {
                            let obj = {
                                fProvinceId: this.ruleForm.dataAgent[i].fProvinceId,
                                fCityId: this.ruleForm.dataAgent[i].fCityId,
                                fAreaId: this.ruleForm.dataAgent[i].fAreaId,
                                sAgentPrice: this.ruleForm.dataAgent[i].sAgentPrice,
                                sAgentStartDate: this.ruleForm.dataAgent[i].sAgentStartDate==''?'':moment(this.ruleForm.dataAgent[i].sAgentStartDate).format('YYYY-MM-DD hh:mm:ss'),
                                sAgentEndDate: this.ruleForm.dataAgent[i].sAgentEndDate==''?'':moment(this.ruleForm.dataAgent[i].sAgentEndDate).format('YYYY-MM-DD hh:mm:ss')
                            }
                            dataAgentList.push(obj)
                        }
                        saveAgent(this.ruleForm.userName, this.ruleForm.account, this.ruleForm.password2, this.ruleForm.phone, dataAgentList).then(response => {
                            if (response.data.status==200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                })
                                this.$router.push('agentManagement');
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: response.data.errorMsg
                                })
                            }
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                } else {
                    return false;
                }
            });
        },
        // 删除代理区域
        deleteArea(index) {
            this.$confirm('确定要删除已添加代理区域吗?', ' ', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.dataForm.splice(index, 1)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 返回
        resetForm() {
            this.$router.push('agentManagement');
        },
       // 添加区域
        addArea() {
            if (this.ruleForm.dataAgent.length>4) {
                this.$message.warning('最多可以添加5个区域');
                return;
            }
            let area = {
                fProvinceId: '',
                fCityId: '',
                fAreaId: '',
                sAgentPrice: '',
                sAgentStartDate: '',
                sAgentEndDate: '',
                findCity: [],
                findArea: [],
                pickerOptions1: {},
                pickerOptions2: {}
            };
            this.ruleForm.dataAgent.push(area)
        },
        removeDomain(index) {
            this.$confirm('确定要删除这个区域吗?', ' ', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.ruleForm.dataAgent.splice(index, 1);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
            
        }
    }
}
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  padding: 20px 20px 10px;
  $bgcolor: #fff;

  @mixin showTitle() {
    background: $bgcolor;
    box-shadow:  0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow:  0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  }
  .form-box {
    padding: 0 50px;
    @include showTitle();
    .form-title {
      padding-top:8px;
      text-align: center;
      font-size: 18px;
      color: #333;
      line-height: 72px;
      font-weight: bold;
      font-family: Microsoft YaHei;
      border-bottom: 1px solid #ddd;
    }
    .form {
      .form-content{
          padding-bottom: 40px;
      }
      .form-item {
        padding-bottom: 40px;
        .form-item-title {
            margin: 40px 0;
            font-size: 14px;
            color: #333;
            line-height: 14px;
            border-left: 4px solid #ff5e2c;
            text-indent: 16px;
           
          .note-css {
            vertical-align: middle;
            display: inline-block;
            width: 4px;
            height: 14px;
            margin-right: 26px;
            border-left: 3px solid #ff5e2c;
          }
          
        }
        .footer {
          text-align: center;
          margin-top: 40px;
        }
        .delBtn {
            font-size: 20px;
            color:#999;
        }
        .areaBoxcon{
            margin-top:40px;
        }
        .area-first{
            margin-top:0 !important;
        }
        .addBtn{
            margin-left:100px;
            font-size:14px;
            color:#ff5e2c;
        }
    }
        .input-hidden {
            visibility: hidden;
            position: absolute;
            z-index: -1;
        }
    }
  }
}

</style>
