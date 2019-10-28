<template>
    <el-container :style="{display:(shown?'flex':'none')}" class="pageForm">
        <el-header height="60px" >
            <span class="pageFormTitle" v-text="title"></span>
            <i class="el-icon-close goBack" @click="cancel"></i>
        </el-header>
        <el-main>
            <div>
                <el-form style="width:920px;" ref="form" :model="formData" :rules="rules" v-if="formData">
                    <template v-for="(r,idx) in datamap">
                        <!--<el-row :key="idx" v-if="r.canEdit&&(!r.row||(r.row&&r.row.split('_')[2]!='0'))">-->
                            <el-form-item v-if="r.canEdit&&(r.editType=='text'||!r.editType)&&!r.hide" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx" :class="{w2:(r.split==2),w3:(r.split==3)}">
                                <el-input v-model="formData[r.key]" :disabled="r.editType?false:true" :placeholder="r.placeholder" @change="textChange(r)"></el-input>
                            </el-form-item>

                            <el-form-item v-if="r.canEdit&&r.editType=='checkBox'" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx" :class="{w2:(r.split==2),w3:(r.split==3)}">
                                <el-checkbox v-model="formData[r.key]"></el-checkbox>
                            </el-form-item>

                            <el-form-item v-if="r.canEdit&&r.editType=='textarea'" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx" :class="{w2:(r.split==2),w3:(r.split==3)}">
                                <el-input type="textarea" :rows="r.areaHeight?r.areaHeight:6" v-model="formData[r.key]" :disabled="r.editType?false:true" :placeholder="r.placeholder"></el-input>
                            </el-form-item>

                            <el-form-item v-if="r.canEdit&&r.editType=='select'" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx" :class="{w2:(r.split==2),w3:(r.split==3)}">
                                <el-select v-model="formData[r.key]" :placeholder="r.placeholder" @change="selectChange(r)">
                                    <template v-if="r.selectData=='permissionCombo'">
                                        <el-option v-for="(r2,idx2) in permissionCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                                        </el-option>
                                    </template>
                                    
                                    <template v-if="r.selectData=='permisCombo'">
                                        <el-option v-for="(r2,idx2) in permisCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                                        </el-option>
                                    </template>
                                    
                                    <template v-if="r.selectData=='menuCombo'">
                                        <el-option v-for="(r2,idx2) in menuCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                                        </el-option>
                                    </template>
                                    
                                    <template v-if="r.selectData=='roleCombo'">
                                        <el-option v-for="(r2,idx2) in roleCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                                        </el-option>
                                    </template>
                                    
                                    <template v-if="r.selectData=='apiUserStatusCombo'">
                                        <el-option v-for="(r2,idx2) in apiUserStatusCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                                        </el-option>
                                    </template>
                                    <template v-if="r.selectData=='appRoleStatusCombo'">
                                        <el-option v-for="(r2,idx2) in appRoleStatusCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                                        </el-option>
                                    </template>
                                    
                                    <template v-if="r.selectData=='appStatusCombo'">
                                        <el-option v-for="(r2,idx2) in appStatusCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                                        </el-option>
                                    </template>


                                    <template v-if="r.selectData=='typesCombo'">
                                        <el-option v-for="(r2,idx2) in typesCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                                        </el-option>
                                    </template>
                                    <template v-if="r.selectData=='foodTypesCombo'">
                                        <el-option v-for="(r2,idx2) in foodTypesCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                                        </el-option>
                                    </template>
                                    <template v-if="r.selectData=='paysCombo'">
                                        <el-option v-for="(r2,idx2) in paysCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                                        </el-option>
                                    </template>
                                </el-select>
                            </el-form-item>

                            <el-form-item v-if="r.canEdit&&r.editType=='mselect'" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx" :class="{w2:(r.split==2),w3:(r.split==3)}">
                                <el-select v-model="formData[r.key]" :placeholder="r.placeholder" multiple style="width:100%;" >
                                    <template v-if="r.selectData=='appRoleCombo'">
                                        <el-option v-for="(r2,idx2) in appRoleCombo" :key="''+r2.value+idx2" :label="r2.label" :value="r2.value">
                                        </el-option>
                                    </template>
                                </el-select>
                            </el-form-item>
                            
                            <el-form-item v-if="r.canEdit&&r.editType=='date'" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx" :class="{w2:(r.split==2),w3:(r.split==3)}">
                                <el-date-picker v-model="formData[r.key]" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item v-if="r.canEdit&&r.editType=='tag'" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx" :class="{w2:(r.split==2),w3:(r.split==3)}">
                                <el-select multiple collapse-tags v-model="formData[r.aryKey]" :placeholder="r.placeholder" @change="selectChange(r)">
                                    <template v-if="r.selectData=='labelsCombo'">
                                        <el-option v-for="(r2,idx2) in labelsCombo" :key="''+r2.value+idx2+idx+'select'" :label="r2.label" :value="r2.value">
                                        </el-option>
                                    </template>
                                </el-select>
                                <div style="height:16px;"></div>
                                <div class="tagBox">
                                    <el-tag size="small" v-for="(item,index) in formData[r.aryKey]" :key="''+index+idx+'tag'" closable @close="tagRemove(item,index,r)">
                                        {{item}}
                                    </el-tag>
                                </div>
                            </el-form-item>
                            <el-form-item v-if="r.canEdit&&r.editType=='uploadImage'" :label="r.keyName" :prop="r.key" :label-width="dlgFormLabelWidth" :key="idx" :class="{w2:(r.split==2),w3:(r.split==3)}">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="imageUploadURL"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    :on-change="(file,fileList)=>{imageChange(file,fileList,r)}"
                                    :on-remove="imageRemove"
                                    accept="image/png, image/gif, image/jpeg, image/jpg"
                                    :auto-upload="false"
                                    :ref="r.refName"
                                >
                                    <img v-if="formData[r.key]" :src="formData[r.key]" class="avatar" :onerror="errorImg" />
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <i class="delBtn el-icon-delete"></i>
                            </el-form-item>
                            <!--<el-upload
                                class="avatar-uploader"
                                :action="imageUploadURL"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :on-change="handlePictureCardPreview"
                                accept="image/png, image/gif, image/jpeg, image/jpg"
                                :auto-upload="false"
                                ref="upload"
                                :data="addBrand"
                            >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar" :onerror="errorImg" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>-->
                        <!--</el-row>-->
                    </template>
                </el-form>
            </div>
        </el-main>
		<el-footer>
            <div class="pageForm-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </div>
        </el-footer>
    </el-container>
</template>

<script>
import mmUtils from '../utils'
import { mapState,mapGetters } from 'vuex'

export default {
    props: ['title', 'datamap'],
    data: function () {
		return {
			shown: false,
			formData: null,
            value1: '',
            imageUploadURL:'',
            errorImg:'',
			// 日期时间控件配置
			pickerOptions: {
				shortcuts: [{
					text: '今天',
					onClick(picker) {
						picker.$emit('pick', new Date());
					}
				}, {
					text: '明天',
					onClick(picker) {
						const date = new Date();
						date.setTime(date.getTime() + 3600 * 1000 * 24);
						picker.$emit('pick', date);
					}
				}, {
					text: '一周后',
					onClick(picker) {
						const date = new Date();
						date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
						picker.$emit('pick', date);
					}
				}]
			},
		}
    },
    mounted: function () {
		//this.sel=this.sel;
	},
	computed: {
        ...mapState([
            'labels',
        ]),
        ...mapGetters([
            'typesCombo',
            'foodTypesCombo',
            'paysCombo',
            'labelsCombo',
        ]),
		dlgFormLabelWidth: function () {
			return this.$store.state.dlgFormLabelWidth;
		},
		permissionCombo: function () {
			return this.$store.getters.permissionCombo;
		},
		permisCombo: function () {
			var newData = mmUtils.deepClone(this.permissionCombo);
			// if (!newData) {
			// 	newData = [{
			// 		value: '0',
			// 		label: '根节点'
			// 	}];
			// } else {
			// 	newData.unshift({
			// 		value: '0',
			// 		label: '根节点'
			// 	});
			// }
			return newData;
		},
		menuCombo: function () {
			return this.$store.getters.menuCombo;
		},
		roleCombo: function () {
			return this.$store.state.roleCombo;
		},
		apiUserStatusCombo: function () {
			return this.$store.state.apiUserStatusCombo;
		},
		appRoleStatusCombo: function () {
			return this.$store.state.appRoleStatusCombo;
		},
		appStatusCombo: function () {
			return this.$store.state.appStatusCombo;
		},
		appRoleCombo: function () {
			return this.$store.state.appRoleCombo;
		},
		rules: function () {
			var dm = this.datamap;
			var rObj = {};
			for (let i = 0; i < dm.length; i++) {
				rObj[dm[i].key] = [];
				if (dm[i].canEdit && dm[i].editType && dm[i].notEmpty) {//非空验证
					if (dm[i].editType !== 'date') {
						rObj[dm[i].key].push({ required: true, message: dm[i].keyName + '不能为空' });
					}
				}
				if (dm[i].reg && dm[i].reg == 'number') {//数值验证
					rObj[dm[i].key].push({
						validator: (rule, value, callback) => {
							if (mmUtils.checkNum(value)) {
								callback();
							} else {
								callback(new Error(dm[i].keyName + '必须为数值'));
							}
						}
					});
				}
				if (dm[i].reg && dm[i].reg == 'phone') {//手机号验证
					rObj[dm[i].key].push({
						validator: (rule, value, callback) => {
							if (mmUtils.checkPhone(value)) {
								callback();
							} else {
								callback(new Error(dm[i].keyName + '须为正确的手机号格式'));
							}
						}
					});
				}
				if (dm[i].reg && dm[i].reg == 'idcard') {//身份证验证
					rObj[dm[i].key].push({
						validator: (rule, value, callback) => {
							if (mmUtils.checkIdcard(value)) {
								callback();
							} else {
								callback(new Error(dm[i].keyName + '须为正确的身份证格式'));
							}
						}
					});
				}
				if (dm[i].reg && dm[i].reg == 'email') {//邮箱验证
					rObj[dm[i].key].push({
						validator: (rule, value, callback) => {
							if (mmUtils.checkEmail(value)) {
								callback();
							} else {
								callback(new Error(dm[i].keyName + '须为正确的邮箱格式'));
							}
						}
					});
				}
			}
			return rObj;
		},
	},
	methods: {
        handleAvatarSuccess(file, fileList){
            console.log('handleAvatarSuccess',arguments);
            console.log(arguments[0].name);
            //this.formData['img1'] = window.URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(){
            console.log('beforeAvatarUpload',arguments);
            console.log(arguments[0].name);
        },
        imageChange(file,fileList,r){
            console.log('imageChange',arguments);
            console.log(r.refName,this.$refs[r.refName]);
        },
        imageRemove(){

        },
		show: function (data) {
            this.$emit('show',true);
			this.formData = data;
			console.log('this.formData',this.formData)
            this.shown = true;
		},
		cancel: function () {
            this.$emit('show',false);
            this.$refs.form.resetFields()
			this.shown = false;
		},
		ok: function () {
			var data = this.formData;
			console.log(data)
			this.$refs.form.validate((valid) => {
				if (valid) {
					console.log('数据验证通过');
					this.$emit('ok', data);
                    this.shown = false;
                    this.$emit('show',false);
				} else {
					this.$message.error('数据验证未通过');
					return false;
				}
			});

        },
        textChange(r){
//cnChar:'pyName',cnSChar:'pySName',
            if(r.cnChar){
                this.formData[r.cnChar]=this.formData[r.key].spell("array","poly").join(" ");
            }
            if(r.cnSChar){
                this.formData[r.cnSChar]=this.formData[r.key].spell("first","array").join(" ");
            }
        },
		selectChange: function (r) {
			if (r.toLabel && r.selectData) {
				var comboData = this[r.selectData];
				for (var i = 0; i < comboData.length; i++) {
					if (this.formData[r.key] == comboData[i].value) {
						this.formData[r.toLabel] = comboData[i].label;
						break;
					}
				}
            }
            if(r.aryKey){
                this.formData[r.key]=this.formData[r.aryKey].join(',');
            }
        },
        tagRemove(item,index,r){
            this.formData[r.aryKey].splice(index,1);
            console.log('tagRemove',arguments);
        }
	}
}
</script>