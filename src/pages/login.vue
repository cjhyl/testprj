<template>
    <el-container v-loading.fullscreen="loading" style="height:100%">
		<el-header class="mmHeader loginHeader" height="80px" >
			<div>
				<div class="logoBox">
					<img :src="logo" alt />
				</div>
				<div style="position:absolute;top:30px;left:200px;" v-text="$t('m.chaunveTitle')"></div>
				<div class="language">
					<img src="../../static/images/login/language.png" alt class="languageImg" />
					<el-select v-model="selLan" @change="lanChange" placeholder="请选择">
						<el-option
							v-for="(item,idx) in languages"
							:key="idx"
							:label="item.label"
							:value="item.val"
							>
						</el-option>
					</el-select>
					<img src="../../static/images/login/down.png" alt class="arrow"/>
				</div>
			</div>
		</el-header>
		<el-main>
			<div class="loginBg" style="height:100%">
				<div class="bgBox">
					<img src="../../static/images/bg_login.png" alt class="bgImg" />
				</div>
				<div id="loginBox">
					<div class="titBox">请登录</div>

					<div class="inputBox">
						<img src="../../static/images/login/user.png" alt class="user" />
						<input
						v-model="account"
						placeholder="请输入您的账号"
						@keyup.enter="login"
						/>
					</div>
					<div class="inputBox">
						<img src="../../static/images/login/password.png" alt class="user" />
						<input
						v-model="pwd"
						placeholder="请输入密码"
						@keyup.enter="login"
						/>
					</div>

					<button class="loginBtn" @click="login">登&nbsp;&nbsp;&nbsp;录</button>
				</div>
				<!--<div class="loginLeft">
					<div class="txts">
						<div class="caption" v-text="$t('m.chaunveTitle')"></div>
						<div class="txt">速度 各部门拥有业内最快的执行速度，是我们的第一竞争力</div>
						<div class="txt">成本 精确的成本控制，使客户在竞争中胜出，使我们在竞争中生存</div>
						<div class="txt">品质 拥有行内最顶尖的团队，加上业内最苛刻的测试要求与最不惜成本的设备投入</div>
						<div class="txt">服务 创互以 "为用户提供一站式服务" 作为自己的还在那略目标。全程无忧，负责到底</div>
					</div>
				</div>
				<div class="loginForm">
					<div class="caption">登录</div>
					<el-input placeholder="请输入登录账号" prefix-icon="el-icon-user" v-model="account"></el-input>
					<el-input placeholder="请输入登录密码" prefix-icon="el-icon-lock" v-model="pwd" show-password></el-input>
					<el-button type="danger" @click="login">登录</el-button>
					<div class="links">
						<el-button type="text">免费注册</el-button>
						<el-button type="text">忘记密码</el-button>
					</div>
				</div>-->
			</div>
		</el-main>
		<el-footer class="mmFooter loginFooter" height="60px">
			<div>
				<div class="l-text">
					<div v-text="casenumber"></div>
				</div>
				<div class="r-text">
					<div v-text="copyright"></div>
				</div>
			</div>
			
		</el-footer>
	</el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data:function(){
		return {
			logo: require("../../static/images/logo@2x.png"),
			account:'riho@sina.com',//'cjhyl@sohu.com',//"riho@sina.com",
			pwd:'abc_1234',//'123456',//"abc_1234",
			selLan:'',
			loading:false,
			
		}
	},
	computed:{
		...mapState([
			'languages',
			'lan',
			'copyright',
			'casenumber',
			'contentHeight',
		])
	},
	watch:{
	},
	mounted:function(){
		if(typeof this.lan=='string'){
			this.selLan=this.lan;
		}else if(typeof this.lan=='object'){
			this.selLan=this.lan.data;
		}
		this.$root.resizeWindow();
		console.log('this',this);
	},
	beforeDestroy:function(){
		
	},
	methods:{
		lanChange:function(){
			console.log('lanChange',arguments,this.selLan);
			this.$store.commit({
				type: 'lanChange',
				data: this.selLan
			});
		},
		reset:function(){
			this.account="";
			this.pwd="";
		},
		login:function(){
			console.log(this.account,this.pwd);
			if(!this.account||!this.pwd){
				this.$message.error('请输入账号密码');
				return;
			}
			var that=this;
			
			this.loading=true;
			setTimeout(() => {
				this.$message('登录成功');
				this.$router.push({
					name: 'default',
				});
			}, 1500);
			// that.$root.login({
			// 	userName:that.account,
			// 	password:that.pwd,
			// 	cb:function(rl){
			// 		that.loading=false;
			// 		if(rl&&rl.state=='logined'){
			// 			that.$message('登录成功');
			// 			that.$router.push({
			// 				name: 'default',
			// 			});
			// 		}
			// 	}
			// });
		},
		
	}
}
</script>
