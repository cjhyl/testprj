import Vue from 'vue'
import Vuex from 'vuex'
import mmUtils from '../../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    helloMsg:"Welcome to Your Vue.js App",
    lastPath: '',
		languages: [
      { val: 'cn', label:"中文简体" },
			{ val: 'tc', label:"中文繁体" },
			{ val: 'en', label:"English" },
		],
		lan:"cn",
    copyright: 'Copyright © 2019 Chaunve INC.保留所有权利',
    casenumber: "粤ICP备09008348号", //备案号
		dlgFormLabelWidth: '120px',
		contentHeight: 600,
		apiToken: null,
		userToken: null,
		menuData: [{
        icon:'el-icon-document',
        orderId:0,
        title:'品牌管理',
        parentId:'0',
        permissionId:'1',
        permissionName:'aaabbb',
        createdTime:'19820222',
        id:"1",
    }/*,{
        icon:'el-icon-setting',
        orderId:0,
        title:'菜单管理',
        parentId:'0',
        permissionId:'2',
        permissionName:'aaabbb',
        createdTime:'19820222',
        id:"2",
      },{
        icon:'el-icon-location',
        orderId:0,
        title:'权限管理',
        parentId:'0',
        permissionId:'3',
        permissionName:'bbbccc',
        createdTime:'19820221',
        id:"3",
      },{
        icon:'el-icon-setting',
        orderId:0,
        title:'测试',
        parentId:'0',
        permissionId:'4',
        permissionName:'aaabbb',
        createdTime:'19820222',
        id:"4",
      },{
        icon:'el-icon-setting',
        orderId:0,
        title:'测试1',
        parentId:'4',
        permissionId:'test1',
        permissionName:'aaabbb',
        createdTime:'19820222',
        id:"test1",
      },{
        icon:'el-icon-setting',
        orderId:0,
        title:'测试1',
        parentId:'4',
        permissionId:'test1',
        permissionName:'aaabbb',
        createdTime:'19820222',
        id:"test2",
      },*/
    ],
    types:[
      {id:1,name:'类型1'},
      {id:2,name:'类型2'},
      {id:3,name:'类型3'},
      {id:4,name:'类型4'},
      {id:5,name:'类型5'},
      {id:6,name:'类型6'},
      {id:7,name:'类型7'},
      {id:8,name:'类型8'},
    ],
    foodTypes:[
      {id:'1',name:'菜系1'},
      {id:'2',name:'菜系2'},
      {id:'3',name:'菜系3'},
      {id:'4',name:'菜系4'},
      {id:'5',name:'菜系5'},
      {id:'6',name:'菜系6'},
      {id:'7',name:'菜系7'},
      {id:'8',name:'菜系8'},
    ],
    pays:[
      {id:'1',name:'100'},
      {id:'2',name:'200'},
      {id:'3',name:'500'},
      {id:'4',name:'1000'},
    ],
    labels:[
      {id:'1',name:'甜品'},
      {id:'2',name:'快餐'},
      {id:'3',name:'饮料'},
      {id:'4',name:'咖啡'},
      {id:'5',name:'西点'},
      {id:'6',name:'中餐'},
      {id:'7',name:'标签7'},
      {id:'8',name:'标签8'},
    ],
    selMenu: "1",
		permissionData:[{
      createdTime:'2019-10-08',
      id:'aa1',
      parentId:'0',
      briefDesc:'菜单管理权限菜单管理权限菜单管理权限菜单管理权限菜单管理权限菜单管理权限菜单管理权限',
      title:'菜单管理',
      permissionName:'menu permission'
    },{
      createdTime:'2019-10-08',
      id:'rg3',
      parentId:'0',
      briefDesc:'角色管理权限',
      title:'角色管理',
      permissionName:'role permission'
    }],
		roleData: null,
		roleCombo: null,
		apiUserStatus: null,
		apiUserStatusCombo: null,

		appStatusCombo:null,
		
		appRole:null,
		appRoleCombo:null,
		appRoleStatus:null,
		appRoleStatusCombo:null,
		appAction:null,
    appActionCombo:null,
  },
  getters:{
    otherHelloMsg(state){
      return "Other "+state.helloMsg;
    },
    typesCombo(state){
      return state.types.map(function(item){
        item.label=item.name;
        item.value=item.id;
        return item;
      });
    },
    foodTypesCombo(state){
      return state.foodTypes.map(function(item){
        item.label=item.name;
        item.value=item.id;
        return item;
      });
    },
    paysCombo(state){
      return state.pays.map(function(item){
        item.label=item.name;
        item.value=item.id;
        return item;
      });
    },
    labelsCombo(state){
      return state.labels.map(function(item){
        item.label=item.name;
        item.value=item.name;
        return item;
      });
    },
    menuCombo(state){
      var newAry=[{
        value: '0',
        label: '根节点'
      }];
      var oldAry=state.menuData.map(function(item){
        item.label=item.title;
        item.value=item.id;
        return item;
      });
      if(!oldAry||oldAry.length<1){
        return newAry;
      }else{
        return newAry.concat(oldAry);
      }
    },
    menuTree(state){
      var newAry = state.menuData.map(function (item) {
				item.index = item.id;
				item.label = item.title;
				return item;
			});
      var treeAry = mmUtils.menuToTree(newAry, '0');
      return treeAry;
    },
    permissionCombo(state){
      var newAry=[{
        value: '0',
        label: '根节点'
      }];
      var oldAry=state.permissionData.map(function(item){
        item.label=item.title;
        item.value=item.id;
        return item;
      });
      if(!oldAry||oldAry.length<1){
        return newAry;
      }else{
        return newAry.concat(oldAry);
      }
    },
		permissionTree(state){
      var newAry = state.permissionData.map(function (item) {
				item.index = item.id;
				item.label = item.title;
				return item;
			});
      var treeAry = mmUtils.menuToTree(newAry, '0');
      return treeAry;
    },
  },
  mutations:{
  	languagesChange(state,data){
  		state.languages=data;
  	},
  	lanChange(state,data){
  		state.lan=data;
  	},
    helloMsgChange(state,data){
      state.helloMsg=data
    },
    pathchange(state, data) {
			state.lastPath = data.data;
		},
    cheightchange(state, data) {
			state.contentHeight = data.data;
    },
    selmenuchange(state, data) {
			state.selMenu = data.data;
    },
    menudatachange(state, data) {
			state.menuData = data.data;
    },
    permissiondatachange(state, data) {
			state.permissionData = data.data;
    },
  },
  actions:{

  }
})
