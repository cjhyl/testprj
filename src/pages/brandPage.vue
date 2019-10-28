<template>
	<!--:style="{'height':(contentHeight-40)+'px'}"-->
    <el-container v-loading.fullscreen="loading" class="childPage" >
		<transition name="el-fade-in">
			<form-page
				ref="addDlg"
				title="添加品牌"
				:datamap="dataMap"
				@ok="addDlgOk"
				@show="editShow"
			>
			</form-page>
		</transition>
		<transition name="el-fade-in">
			<form-page
				ref="editDlg"
				title="编辑品牌"
				:datamap="dataMap"
				@ok="editDlgOk"
				@show="editShow"
			>
			</form-page>
		</transition>
		<el-main :style="{display:(gridVisible?'block':'none')}">
			<mould-page
				:gridTitle="gridTitle"
				:tableData="tableData"
				:dataMap="dataMap"
				:pageData="pageData"
				:tableOpers="tableOpers"
				@table-sels-change="tableSelsChange"
				@grid-edit="gridEdit"
				@grid-add="gridAdd"
				@grid-delete="gridDelete"
				@grid-multi-delete="gridMultiDelete"

				@page-size-change="pageSizeChange"
				@page-cur-change="pageCurChange"
			>
			</mould-page>
		</el-main>
	</el-container>
</template>
 
<script>
import MouldPage from '../components/MouldPage';
import FormPage from '../components/pageForm';
import mmUtils from '../utils';


export default {
  name: 'menuPage',
  components:{
      'mould-page':MouldPage,
      'form-page':FormPage,
  },
  data () {
    return {
        loading:false,
        gridVisible:true,
        
        gridTitle:'品牌管理',
        
        pageData:{
            curPage:1,
            pageSizes:[10, 20, 50, 100],
            pageSize:10,
            total:0,
        },
		reloadTimer:null,
		testData:[
			{id:'1',cName:"品牌名1",eName:"ppp",pyName:"PinPaiMing",pySName:"ppm",otherName:"品牌别名",type:"1",foodType:"2",pay:"2",des:"上岛咖啡黑客技术",labels:"甜品,快餐",img1:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',img2:''},
			{id:'2',cName:"品牌名2",eName:"ppp",pyName:"PinPaiMing",pySName:"ppm",otherName:"品牌别名",type:"1",foodType:"2",pay:"2",des:"上岛咖啡黑客技术",labels:"甜品,快餐",img1:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',img2:''},
			{id:'3',cName:"品牌名3",eName:"ppp",pyName:"PinPaiMing",pySName:"ppm",otherName:"品牌别名",type:"1",foodType:"2",pay:"2",des:"上岛咖啡黑客技术",labels:"甜品,快餐",img1:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',img2:''},
			{id:'4',cName:"品牌名4",eName:"ppp",pyName:"PinPaiMing",pySName:"ppm",otherName:"品牌别名",type:"1",foodType:"2",pay:"2",des:"上岛咖啡黑客技术",labels:"甜品,快餐",img1:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',img2:''},
			{id:'5',cName:"品牌名5",eName:"ppp",pyName:"PinPaiMing",pySName:"ppm",otherName:"品牌别名",type:"1",foodType:"2",pay:"2",des:"上岛咖啡黑客技术",labels:"甜品,快餐",img1:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',img2:''},
			{id:'6',cName:"品牌名6",eName:"ppp",pyName:"PinPaiMing",pySName:"ppm",otherName:"品牌别名",type:"1",foodType:"2",pay:"2",des:"上岛咖啡黑客技术",labels:"甜品,快餐",img1:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',img2:''},
			{id:'7',cName:"品牌名7",eName:"ppp",pyName:"PinPaiMing",pySName:"ppm",otherName:"品牌别名",type:"1",foodType:"2",pay:"2",des:"上岛咖啡黑客技术",labels:"甜品,快餐",img1:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',img2:''},
			{id:'8',cName:"品牌名8",eName:"ppp",pyName:"PinPaiMing",pySName:"ppm",otherName:"品牌别名",type:"1",foodType:"2",pay:"2",des:"上岛咖啡黑客技术",labels:"甜品,快餐",img1:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',img2:''},
			{id:'9',cName:"品牌名9",eName:"ppp",pyName:"PinPaiMing",pySName:"ppm",otherName:"品牌别名",type:"1",foodType:"2",pay:"2",des:"上岛咖啡黑客技术",labels:"甜品,快餐",img1:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',img2:''},
			{id:'10',cName:"品牌名10",eName:"ppp",pyName:"PinPaiMing",pySName:"ppm",otherName:"品牌别名",type:"1",foodType:"2",pay:"2",des:"上岛咖啡黑客技术",labels:"甜品,快餐",img1:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',img2:''},
		],
        tableData:[],
        tableSels:[],
        tableOpers:{
            edit:true,
            //delete:true
        },
        
        dataMap:[
			{key:'id',keyName:'ID',canEdit:false,hide:true},
			{key:'cName',keyName:'品牌名',canEdit:true,editType:'text',placeholder:'品牌名',split:'3',cnChar:'pyName',cnSChar:'pySName',notEmpty:'true'},
			{key:'eName',keyName:'英文名',canEdit:true,editType:'text',placeholder:'英文名称',split:'3'},
			{key:'pyName',keyName:'拼音名称',hide:true,canEdit:true,editType:'text',placeholder:'拼音名称',split:'3'},
			{key:'pySName',keyName:'拼音简称',hide:true,canEdit:true,editType:'text',placeholder:'拼音简称',split:'3'},
			{key:'otherName',keyName:'品牌别名',canEdit:true,editType:'text',placeholder:'品牌别名',split:'3'},
			{key:'type',keyName:'类型',canEdit:true,editType:'select',selectData:'typesCombo',placeholder:'请选择',split:'3',template:true,tempType:'comboMap',mapData:'typesCombo'},
			{key:'foodType',keyName:'菜系',canEdit:true,editType:'select',selectData:'foodTypesCombo',placeholder:'请选择',split:'3',template:true,tempType:'comboMap',mapData:'foodTypesCombo'},
			{key:'pay',keyName:'人均消费',canEdit:true,editType:'select',selectData:'paysCombo',placeholder:'请选择',split:'3',template:true,tempType:'comboMap',mapData:'paysCombo'},
			{key:'des',keyName:'介绍',canEdit:true,editType:'textarea',areaHeight:'6',placeholder:'介绍'},
			{key:'labels',keyName:'标签',canEdit:true,editType:'tag',aryKey:"labelsAry",selectData:'labelsCombo',placeholder:'请选择'},
			{key:'labelsAry',keyName:'labelsAry',canEdit:false,hide:true},
			{key:'img1',keyName:'logo(非镂空)',canEdit:true,editType:'uploadImage',refName:'upload1',split:'3',template:true,tempType:'image'},
			{key:'img2',keyName:'logo(镂空)',canEdit:true,editType:'uploadImage',refName:'upload2',split:'3',template:true,tempType:'image'},
            /*{key:'createdTime',keyName:'创建时间',canEdit:false},
            {key:'id',keyName:'ID',canEdit:false,hide:true},
            {key:'orderId',keyName:'排序优先级',canEdit:true,editType:'text',placeholder:'请输入排序优先级--数值',reg:'number',split:'2'},
            {key:'parentId',keyName:'父节点ID',canEdit:true,editType:'select',selectData:'menuCombo',placeholder:'请选择父节点',split:'2'},
            {key:'title',keyName:'标题',canEdit:true,editType:'text',placeholder:'请输入标题',split:'3'},
            {key:'icon',keyName:'图标',canEdit:true,editType:'text',placeholder:'请输入图标编码',split:'3'},
            {key:'permissionId',keyName:'权限id',canEdit:true,editType:'select',selectData:'permissionCombo',toLabel:'permissionName',placeholder:'请选择权限',canEmpty:true,split:'3'},
			{key:'permissionName',keyName:'权限标识',canEdit:true},*/
        ],
    }
  },
  computed:{
        languages:function(){
            return this.$store.state.languages;
        },
        contentHeight:function(){
            return this.$store.state.contentHeight;
        },
        dlgFormLabelWidth:function(){
            return this.$store.state.dlgFormLabelWidth;
		},
  },
  mounted:function(){
	  setTimeout(()=>{
		this.tableData=this.testData.map((item)=>{
			if(!item.labels){
				item.labelsAry=[];
			}else{
				item.labelsAry=item.labels.split(',');
			}
			return item;
		});
        this.pageData.total=this.tableData.length;
	  },1000)
      this.reloadData();
  },
  beforeDestroy:function(){
  },
  methods:{
	  	editShow(eShow){
			  if(eShow){
				  this.gridVisible=false;
			  }else{
				  this.gridVisible=true;
			  }
		},
    	//更新表格数据
		reloadData:function(){
			if(!this.userToken){
				return;
			}
			clearTimeout(this.reloadTimer);
			var that=this;
			this.reloadTimer=setTimeout(function(){
				var uToken=that.userToken;
				that.loading=true;
				// that.$root.loadUrl({
				// 	urlName:'getMenuByPage',
				// 	data:JSON.stringify({
				// 		pageIndex:that.pageData.curPage,
				// 		pageSize:that.pageData.pageSize,
				// 	}),
				// 	headerKey:'Authorization',
				// 	headerValue:uToken,
				// 	cb:function(rl){
				// 		that.loading=false;
				// 		if(rl.state=='success'){
				// 			var result=rl.data;
				// 			that.pageData.total=result.totalRecord;
				// 			that.tableData=result.data;
				// 		}else{
				// 			that.tableData=[];
				// 		}
				// 	}
                // });
			},100);
		},
		//更新全局数据
		reloadStoreData:function(){
			var uToken=this.userToken;
			var that=this;
			that.loading=true;
			// this.$root.loadUrl({
			// 	urlName:'getMenu',
			// 	headerKey:'Authorization',
			// 	headerValue:uToken,
			// 	cb:function(rl){
			// 		that.loading=false;
			// 		if(rl.state=='success'){
			// 			var result=rl.data;
			// 			that.$store.commit({
			// 				type: 'menudatachange',
			// 				data: result.data
			// 			});
			// 		}
			// 	}
			// });
		},
		//分页每页条数change
		pageSizeChange:function(val) {
			this.pageData.pageSize=val;
			this.reloadData();
			console.log(`每页 ${val} 条`,this.pageData);
		},
		//分页当前页数change
		pageCurChange:function(val) {
			this.pageData.curPage=val;
			this.reloadData();
			console.log(`当前页: ${val}`,this.pageData);
		},
		//表格多选change
		tableSelsChange:function(rows){
			this.tableSels = rows;
			console.log('tableSelsChange',rows);
		},
		//点击添加按钮
		gridAdd:function(){
			var data={
				cName:'',
				eName:'',
				pyName:'',
				pySName:'',
				otherName:'',
				type:'',
				foodType:'',
				pay:'',
				des:'',
				labels:'',
				img1:'',
				img2:'',
			};
			this.$refs.addDlg.show(data);
			
		},
		//添加面板确定
		addDlgOk:function(data){
			var that=this;
            var tempData=mmUtils.deepClone(this.$store.state.menuData);
            tempData.push({
                //createdTime:mmUtils.formatTimeSpan(new Date(),'YYYY-MM-DD hh:mm:ss'),
                id:mmUtils.createRandomId(),
                cName:data.cName,
                eName:data.eName,
                pyName:data.pyName,
                pySName:data.pySName,
                otherName:data.otherName,
				type:data.type,
				foodType:data.foodType,
				pay:data.pay,
				des:data.des,
				labels:data.labels,
				img1:data.img1,
				img2:data.img2,
            })
            that.$store.commit({
                type: 'menudatachange',
                data: tempData
            });
            that.reloadData();
			// this.$root.loadUrl({
			// 	urlName:'addMenu',
			// 	data:JSON.stringify({
			// 		orderId:data.orderId,
			// 		parentId:data.parentId,
			// 		title:data.title,
			// 		icon:data.icon,
			// 		permissionId:data.permissionId,
			// 		permissionName:data.permissionName
			// 	}),
			// 	headerKey:'Authorization',
			// 	headerValue:that.userToken,
			// 	cb:function(rl){
			// 		if(rl.state=='success'){
			// 			that.$message('添加成功');
			// 			that.addDlgVisible=false;
			// 			that.reloadData();
			// 			that.reloadStoreData();
			// 		}else{
			// 			that.$message.error('添加失败 '+rl.data.message);
			// 		}
			// 	}
			// });
		},
		//批量删除
		gridMultiDelete:function(){
			// this.$store.commit({
			// 	type: 'usertokenchange',
			// 	data: null
			// })
			var rows=this.tableSels;
			if(!rows||rows.length<1){
				this.$message.error('请选择要删除的数据');
				return;
			}
			console.log('gridMultiDelete',rows);
		},
		//表格删除
		gridDelete:function(idx,data){
			var that=this;
			this.$confirm('确认删除'+data.title+'?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(function(){
                var tempData=mmUtils.deepClone(that.$store.state.menuData);
                for(var i=0;i<tempData.length;i++){
                    if(tempData[i].id==data.id){
                        tempData.splice(i,1);
                    break;
                    }
                }
                that.$store.commit({
                    type: 'menudatachange',
                    data: tempData
                });
                that.reloadData();
				// that.loading=true;
				// that.$root.loadUrl({
				// 	urlName:'deleteMenu',
				// 	urlPr:'/'+data.id,
				// 	headerKey:'Authorization',
				// 	headerValue:that.userToken,
				// 	cb:function(rl){
				// 		that.loading=false;
				// 		if(rl.state=='success'){
				// 			that.$message('删除成功');
				// 			that.reloadData();
				// 			that.reloadStoreData();
				// 		}else{
				// 			that.$message.error('修改失败 '+rl.data.message);
				// 		}
				// 	}
				// });
			}).catch(()=>{});
		},
		//表格编辑
		gridEdit:function(idx,data){
			var editData=mmUtils.deepClone(data);
			this.$refs.editDlg.show(editData);
		},
		//编辑面板确定
		editDlgOk:function(data){
			var that=this;
            
            var that=this;
            
            var tempData=mmUtils.deepClone(this.$store.state.menuData);
            for(var i=0;i<tempData.length;i++){
                if(tempData[i].id==data.id){
                    tempData[i].orderId=data.orderId;
                    tempData[i].parentId=data.parentId;
                    tempData[i].title=data.title;
                    tempData[i].icon=data.icon;
                    tempData[i].permissionId=data.permissionId;
                    tempData[i].permissionName=data.permissionName;
                }
            }
            that.$store.commit({
                type: 'menudatachange',
                data: tempData
            });
            that.reloadData();
            // that.loading=true;
			// this.$root.loadUrl({
			// 	urlName:'updateMenu',
			// 	data:JSON.stringify({
			// 		orderId:data.orderId,
			// 		parentId:data.parentId,
			// 		title:data.title,
			// 		icon:data.icon,
			// 		permissionId:data.permissionId,
			// 		permissionName:data.permissionName
			// 	}),
			// 	urlPr:'/'+data.id,
			// 	headerKey:'Authorization',
			// 	headerValue:that.userToken,
			// 	cb:function(rl){
			// 		that.loading=false;
			// 		if(rl.state=='success'){
			// 			that.$message('修改成功');
			// 			that.editDlgVisible=false;
			// 			that.reloadData();
			// 			that.reloadStoreData();
			// 		}else{
			// 			that.$message.error('修改失败 '+rl.data.message);
			// 		}
			// 	}
			// });
		},
  }
}
</script>