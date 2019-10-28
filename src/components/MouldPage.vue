<template>
	<!--:style="{'height':(contentHeight-40)+'px'}"-->
    <el-container>
		<el-header height="60px" >
			<el-row>
				<el-col :span="12">
					<div class="gridOperLeft">
						<el-button icon="el-icon-plus" size="small" type="primary" title="新增" @click="gridAdd">新增</el-button>
						<el-button icon="el-icon-delete" size="small" type="danger" title="删除" @click="gridMultiDelete" >删除</el-button>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="gridOperRight">
						<div class="checkboxBg">
							<el-checkbox-group v-model="checkList" @change="checkListChange">
								<el-checkbox label="无LOGO"></el-checkbox>
								<el-checkbox label="无绑定"></el-checkbox>
								<el-checkbox label="无部门"></el-checkbox>
								<el-checkbox label="未分类"></el-checkbox>
								<el-checkbox label="同名品牌"></el-checkbox>
								<el-checkbox label="同店铺号"></el-checkbox>
							</el-checkbox-group>
						</div>
						<div class="boxBg">
							<el-checkbox-group v-model="letterList" class="typeCheckBox" @change="letterListChange">
								<el-select v-model="selectType" size="mini" multiple collapse-tags placeholder="字母筛选">
									<el-option v-for="(item,index) in allLetter" :key="index" :label="item" :value="item">
										<el-checkbox :label="item">{{item}}</el-checkbox>
									</el-option>
								</el-select>
							</el-checkbox-group>
							<el-input v-model="searchValue" class="searchBox" placeholder="请输入内容"></el-input>
							<div class="searchBtn" @click="searchData">
								<img :src="require('../../static/images/qietu/search.png')" alt />
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<el-table ref="datatable" :data="tableData" @selection-change="tableSelsChange">
				<el-table-column type="selection" width="50" align="center" :resizable="false"></el-table-column>
				<template v-for="(r,idx) in dataMap">
					<el-table-column v-if="idx<dataMap.length-1&&!r.hide&&!r.template" :label="r.keyName" :prop="r.key" :resizable="false" :key="idx">
                    </el-table-column>
					<el-table-column v-if="idx==dataMap.length-1&&!r.hide&&!r.template" :label="r.keyName" :prop="r.key" :resizable="false" :key="idx">
                    </el-table-column>
					<el-table-column v-if="r.template&&r.tempType=='bool'" :label="r.keyName" :key="idx">
						<template slot-scope="scope">
							<span>{{scope.row[r.key]?'是':'否'}}</span>
						</template>
					</el-table-column>
					<el-table-column v-if="r.template&&r.tempType=='comboMap'&&r.mapData=='typesCombo'" :label="r.keyName" :key="idx">
						<template slot-scope="scope">
							<template v-for="(r2,idx2) in typesCombo">
								<span v-if="r2.value==scope.row[r.key]" :key="''+r.key+idx2" v-text="r2.label"></span>
							</template>
						</template>
					</el-table-column>
					<el-table-column v-if="r.template&&r.tempType=='comboMap'&&r.mapData=='paysCombo'" :label="r.keyName" :key="idx">
						<template slot-scope="scope">
							<template v-for="(r2,idx2) in paysCombo">
								<span v-if="r2.value==scope.row[r.key]" :key="''+r.key+idx2" v-text="r2.label"></span>
							</template>
						</template>
					</el-table-column>
					<el-table-column v-if="r.template&&r.tempType=='comboMap'&&r.mapData=='foodTypesCombo'" :label="r.keyName" :key="idx">
						<template slot-scope="scope">
							<template v-for="(r2,idx2) in foodTypesCombo">
								<span v-if="r2.value==scope.row[r.key]" :key="''+r.key+idx2" v-text="r2.label"></span>
							</template>
						</template>
					</el-table-column>

					<el-table-column v-if="r.template&&r.tempType=='image'" :label="r.keyName" :key="idx">
						<template slot-scope="scope">
							<img v-if="scope.row[r.key]" :src="scope.row[r.key]" style="max-height:45px;" />
						</template>
					</el-table-column>
				</template>
				<el-table-column label="操作" :resizable="false">
					<template slot-scope="scope">
						<el-button v-if="tableOpers.edit" title="编辑" size="small" type="text" @click="gridEdit(scope.$index,scope.row)">
							编辑
                        </el-button>
						<el-button v-if="tableOpers.delete" title="删除" size="small" type="text" @click="gridDelete(scope.$index,scope.row)">
							删除
                        </el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer height="42px">
			<el-pagination
				@size-change="pageSizeChange"
				@current-change="pageCurChange"
				:current-page="pageData.curPage"
				:page-sizes="pageData.pageSizes"
				:page-size="pageData.pageSize"
				layout="total, sizes,prev, pager, next, jumper"
				:total="pageData.total">
			</el-pagination>
		</el-footer>
	</el-container>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
export default {
    props: ['gridTitle', 'tableData', 'dataMap', 'pageData', 'tableOpers'],
	data: function () {
		return {
			checkList:[],
			searchValue:'',
			selectType:'',
			letterList: [], //字母复选
			allLetter: [
				"A","B","C","D",
				"E","F","G","H",
				"I","J","K","L",
				"M","N","O","P",
				"Q","R","S","T",
				"U","V","W","X",
				"Y","Z"
			],
		}
	},
	watch:{
		// tableData:function(data){
		// 	setTimeout(()=>{
		// 		this.changeGridHeight();
		// 	});
		// }
	},
    mounted: function () {
		//this.changeGridHeight();
	},
	computed: {
		contentHeight: function () {
			return this.$store.state.contentHeight;
		},
		operWidth: function () {
			return 50 * Object.keys(this.tableOpers).length + 20;
		},
		...mapState([
            'labels',
        ]),
        ...mapGetters([
            'typesCombo',
            'foodTypesCombo',
            'paysCombo',
        ]),
	},
	methods: {
		changeGridHeight(){
			if(!document.querySelector('.childPage .el-table__fixed-header-wrapper')){
				setTimeout(()=>{this.changeGridHeight()},200);
				return;
			}
			var h_head=document.querySelector('.childPage .el-table__fixed-header-wrapper').offsetHeight;
			var h_body=document.querySelector('.childPage .el-table__fixed-body-wrapper').offsetHeight;
			document.querySelector('.childPage .el-table').style.minHeight=h_head+h_body+30+'px';
		},
		letterListChange(){
			console.log('letterListChange',arguments);
		},
		searchData(){
			console.log('searchData',arguments);
		},
		checkListChange(){
			console.log('checkListChange',arguments);
		},
		gridAdd: function () {
			this.$emit('grid-add');
		},
		gridMultiDelete: function () {
			this.$emit('grid-multi-delete');
		},
		gridRoleEdit: function (idx, row) {
			this.$emit('grid-role-edit', idx, row);
		},
		gridPermisEdit: function (idx, row) {
			this.$emit('grid-permis-edit', idx, row);
		},
		gridEdit: function (idx, row) {
			this.$emit('grid-edit', idx, row);
		},
		gridDelete: function (idx, row) {
			this.$emit('grid-delete', idx, row);
		},
		tableSelsChange: function (rows) {
			this.$emit('table-sels-change', rows);
		},
		pageSizeChange: function (val) {
			this.$emit('page-size-change', val);
		},
		pageCurChange: function (val) {
			this.$emit('page-cur-change', val);
		},
	}
}
</script>