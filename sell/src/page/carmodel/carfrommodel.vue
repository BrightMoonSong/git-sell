<template>
<el-dialog title="修改车型信息" v-model="myDialogFormVisible">
  <el-form :model="selectTable">
    <el-form-item label="车型ID" label-width="100px">
      <el-input v-model="selectTable.id"></el-input>
    </el-form-item>
    <el-form-item label="车型名称" label-width="100px">
      <el-input v-model="selectTable.total_amount" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="车型图标" label-width="100px">
      <img :src="selectTable.status" class="image" width="100px">
    </el-form-item>
    <el-form-item label="user_id" label-width="100px">
      <el-input v-model="selectTable.user_id"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="myDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateShop">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
export default {
  // 由于vue2.0 props 无法让子组件与父组件实现双向绑定，容易报错，所以要自定义方法去实现双向绑定，步骤分别是1234，其中第四步在父组件
  props: ['selectTable', 'dialogFormVisible'],
  data() {
    return {
      // 1
      myDialogFormVisible: this.dialogFormVisible
    };
  },
  watch: {
    dialogFormVisible: function(val, oldVal) {
      this.myDialogFormVisible = val; // 2新增 dialogFormVisible 的watch，监听变更并同步到 myDialogFormVisible 上
    },
    myDialogFormVisible(val) {
      // 3组件内对 myDialogFormVisible 变更后向外部发送事件通知
      // val 就是子要传的数据 - 这里很重要,refrs (两边一致就行，不固定) 就是父组件$on监测的自定义函数不是父组件的自定义函数。
      this.$emit('refrs', val);
    }
  },
  methods: {
    async updateShop() {
      this.myDialogFormVisible = false;
      try {
        Object.assign(this.selectTable);
        const res = await this.$http.put('/mapi/carmodel/update', this.carmodel).then((response) => {
          response = response.body;
          return response;
        });
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '更新车型信息成功'
          });
          this.initData();
        } else {
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      } catch (err) {
        console.log('更新车型信息失败', err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
}
</style>
