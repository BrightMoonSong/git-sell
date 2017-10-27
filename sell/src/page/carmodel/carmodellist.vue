<template>
<div class="fillcontain">
  <!-- <head-top></head-top> -->
  <div class="table_container">
    <el-table :data="tableData" @expand='expand' :expand-row-keys='expendRow' :row-key="row => row.index" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
	        <el-form label-position="left" inline class="demo-table-expand">
	          <el-form-item label="用户名" >
	            <span>{{ props.row.user_name }}</span>
	          </el-form-item>
	          <el-form-item label="店铺名称">
	            <span>{{ props.row.restaurant_name }}</span>
	          </el-form-item>
	          <el-form-item label="收货地址">
	            <span>{{ props.row.address }}</span>
	          </el-form-item>
	          <el-form-item label="店铺 ID">
	            <span>{{ props.row.restaurant_id }}</span>
	          </el-form-item>
	          <el-form-item label="店铺地址">
	            <span>{{ props.row.restaurant_address }}</span>
	          </el-form-item>
	        </el-form>
	      </template>
      </el-table-column>
      <el-table-column label="ID" prop="id">
      </el-table-column>
      <el-table-column label="车型名称" prop="total_amount">
      </el-table-column>
      <el-table-column label="车型规格" prop="status">
      </el-table-column>
      <el-table-column label="载重量" prop="status">
      </el-table-column>
      <el-table-column label="车型选中图标">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.status" width="100">
        </template>
      </el-table-column>
      <el-table-column label="车型未选中图标" prop="status">
      </el-table-column>
      <el-table-column label="起步价" prop="status">
      </el-table-column>
      <el-table-column label="状态" prop="status">
      </el-table-column>
      <el-table-column label="操作" prop="status">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="Success" @click="addFood(scope.$index, scope.row)">添加</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: left;margin-top: 10px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>
    <carfrommodel :dialogFormVisible="dialogFormVisible" :selectTable="selectTable" v-on:refreshbizlines="onResultChange"></carfrommodel>
  </div>
</div>
</template>

<script>
import {
  setStore
} from '@/config/mUtils';
import carfrommodel from './carfrommodel';
// import headTop from '../components/headTop';
//  import {getOrderList, getOrderCount, getResturantDetail, getUserInfo, getAddressById} from '@/api/getData'
export default {
  data() {
    return {
      Orders: [],
      selectTable: [],
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      carmodel: {},
      city: {},
      formtoken: '',
      currentPage: 1,
      restaurant_id: null,
      dialogFormVisible: false,
      expendRow: []
    };
  },
  components: {
    carfrommodel
  },
  watch: {
    dialogFormVisible: function(val, oldVal) {
      if (oldVal) {
        this.initData();
      }
    }
  },
  created() {
    //  this.restaurant_id = this.$route.query.restaurant_id;
    this.initData();
    setStore('funcId', this.$route.params.funcId);
  },
  mounted() {

  },
  methods: {
    // async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
    async initData() {
      try {
        const countData = await this.$http.get('/mapi/carmodel/carmodels?pageNo=1&pageSize=10').then((response) => {
          response = response.body;
          return response;
        });
        this.city = {
          'name': '北京',
          'id': '1'
        };
        if (countData.code === 0) {
          this.Orders = countData.data;
          this.count = countData.totalSize;
        } else {
          throw new Error('获取数据失败');
        }
        this.getOrders();
      } catch (err) {
        console.log('获取数据失败', err);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getOrders();
    },
    async handleEdit(index, row) {
      this.selectTable = row;
      this.dialogFormVisible = true;
      const res2 = await this.$http.get('/api/seller').then((response) => {
        response = response.body;
        return response;
      });
      this.carmodel = res2.data.carmodel;
    },
    async getOrders() {
      this.tableData = [];
      this.Orders.forEach((item, index) => {
        const tableData = {};
        tableData.id = item.modelId;
        tableData.total_amount = item.modelName;
        tableData.status = item.modelImgUrlSelected;
        tableData.user_id = item.userId;
        tableData.index = index;
        this.tableData.push(tableData);
      });
    },
    async expand(row, status) {
      if (status) {
        this.tableData.splice(row.index, 1, { ...row,
          ...{
            restaurant_name: row.total_amount,
            restaurant_address: row.status,
            address: row.id,
            user_name: row.user_id,
            restaurant_id: row.id
          }
        });
        this.$nextTick(() => {
          this.expendRow.push(row.index);
        });
      } else {
        const index = this.expendRow.indexOf(row.index);
        this.expendRow.splice(index, 1);
      }
    },
    onResultChange(val) {
      this.dialogFormVisible = val; // 4外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    }
  }
};
</script>

<style lang="less">
@import '../style/mixin';
.table_container {
    padding: 20px;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
