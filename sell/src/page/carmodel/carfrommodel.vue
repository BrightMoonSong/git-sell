<template>
  <el-dialog title="修改车型信息" v-model="dialogFormVisible">
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
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateShop">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    selectTable: {
      type: Object
    },
    dialogFormVisible: {
      type: Boolean
    }
  },
  methods: {
    async updateShop() {
      this.dialogFormVisible = false;
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

</style>
