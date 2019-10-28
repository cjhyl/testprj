<template>
    <el-container v-loading.fullscreen="initLoading">
		<el-aside :width="isCollapse?'64px':'220px'" class="leftMenu">
			<div class="logoBg">
				<span class="logoName" v-show="!isCollapse" v-text="logoName"></span>
			</div>
			<el-scrollbar>
				<data-menu 
				:mycollapse="isCollapse"
				:datas="menuTree"
				:sel="selMenu"
				@myselect="handleSelect">
				</data-menu>
			</el-scrollbar>
		</el-aside>
		<el-container>
			<el-header class="mmHeader" height="60px" >
				<div class="collapseBg">
					<i :class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}" @click="handleCollapse"></i>
				</div>
				<div class="userBox">
					<el-dropdown @command="systemSettings">
						<div>
							<img src="../../static/images/touxiang.svg" alt class="userImg" />

							<span v-text="userName"></span>
						</div>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="修改密码">修改密码</el-dropdown-item>
							<el-dropdown-item command="logout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-header>
			
			<el-main >
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>
 
<script>
import DataMenu from '../components/DataMenu';


export default {
  name: 'mainPage',
  components:{
      'data-menu':DataMenu
  },
  data () {
    return {
		userName:'用户名',
		logoName:'Brand',
    	isCollapse:false,
//				{key:'orderId',keyName:'排序优先级',canEdit:true},
//				{key:'parentId',keyName:'父节点ID',canEdit:true},
//				{key:'title',keyName:'标题',canEdit:true},
//				{key:'permissionId',keyName:'权限id',canEdit:true},
//				{key:'permissionName',keyName:'权限名',canEdit:true},
//				{key:'icon',keyName:'图标',canEdit:true},
//				{key:'createdTime',keyName:'创建时间',canEdit:false},
//				{key:'id',keyName:'ID',canEdit:false}
		menuMap:{
			'1':'brand',
			'2':'menu',
			'3':'permission',
		},
		selLan:'cn',
		roles:[
			{label:'admin',value:'1'},
			{label:'guest',value:'2'}
		],
		selRole:'1',
		
		loading:false,
		
		initMenu:false,
		initPermission:false,
		initRole:false,
		initApiUserStatus:false,
		initAppRoleStatus:false,
		initAppRole:false,
		initAppAction:false,
    }
  },
  computed:{
    languages:function(){
        return this.$store.state.languages;
    },
    lan:function(){
        return this.$store.state.lan;
    },
    copyrightStr:function(){
        return this.$store.state.copyright;
    },
    contentHeight:function(){
        return this.$store.state.contentHeight;
    },
    menuTree:function(){
        return this.$store.getters.menuTree;
    },
    selMenu:function(){
        return this.$store.state.selMenu;
    },
    initLoading:function(){
        // var bEnd=this.initMenu&&this.initPermission&&this.initRole&&this.initApiUserStatus&&this.initAppRoleStatus&&this.initAppRole&&this.initAppAction;
        // return !bEnd;
        return false;
    }
  },
  mounted:function(){
	this.handleSelect(this.selMenu);
	if(typeof this.lan=='string'){
		this.selLan=this.lan;
	}else if(typeof this.lan=='object'){
		this.selLan=this.lan.data;
	}
	console.log('this.selLan',typeof this.selLan,this.selLan,this.$store.state.lan,this.lan);
  },
  beforeDestroy:function(){
  },
  methods:{
	systemSettings(command) {
		let that = this;
		if (command == "logout") {
			//this.logout();
		} else if (command == "systemSettings") {
			//that.$refs.home.isHideSystemSettings = false;
		} else if (command == "修改密码") {
			//that.$refs.home.isHideChangePassword = false;
		}
	},
  	lanChange:function(){
		console.log('lanChange',arguments,this.selLan);
		this.$store.commit({
			type: 'lanChange',
			data: this.selLan
		});
	},
    //   loadMenu:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getMenu',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initMenu=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'menudatachange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
	// 	loadPermission:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getPermission',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initPermission=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'permissiondatachange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
	// 	loadRole:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getRole',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initRole=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'roledatachange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
	// 	loadApiUserStatus:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getApiUserStatus',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initApiUserStatus=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'apiuserstatuschange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
	// 	loadAppRoleStatus:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getApp_RoleStatus',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initAppRoleStatus=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'approlestatuschange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
	// 	loadAppRole:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getApp_Role',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initAppRole=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'approlechange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
	// 	loadAppAction:function(){
	// 		var uToken=this.userToken;
	// 		var that=this;
	// 		this.$root.loadUrl({
	// 			urlName:'getAppAction',
	// 			headerKey:'Authorization',
	// 			headerValue:uToken,
	// 			cb:function(rl){
	// 				that.initAppAction=true;
	// 				if(rl.state=='success'){
	// 					var result=rl.data;
	// 					that.$store.commit({
	// 						type: 'appactionchange',
	// 						data: result.data
	// 					});
	// 				}
	// 			}
	// 		});
	// 	},
		handleCollapse:function(){
			console.log('this',this);
			this.isCollapse=!this.isCollapse;
			
		},
		handleSelect:function(key,keyPath){
			this.$store.commit({
				type: 'selmenuchange',
				data: ''+key
			});
			this.$router.push({
				name: this.menuMap[key]?this.menuMap[key]:'default',
			});
			console.log('handleSelect',key,keyPath);
		},
//		handleOpen(key, keyPath) {
//			console.log(key, keyPath);
//		},
//		handleClose(key, keyPath) {
//			console.log(key, keyPath);
//		}
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>