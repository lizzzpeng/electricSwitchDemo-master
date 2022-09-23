<template>
 <el-container >
      <el-main>
        <div style="margin-bottom: 30px">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div style="margin: 10px 0">
          <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="username"></el-input>
          <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" class="ml-5" v-model="email"></el-input>

          <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
          <el-button class="ml-5" type="waring" @click="reset">重置</el-button>
        </div>

        <div style="margin: 10px 0">
          <el-button type="primary" @click="handleadd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
            <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定批量删除这些数据吗？"
              @confirm="delBatch"
          >
            <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
          <!-- <el-button type="primary">导入 <i class="el-icon-bottom"></i></el-button>
          <el-button type="primary">导出 <i class="el-icon-top"></i></el-button> -->
        </div>

        <el-table :data="tableData"  stripe :header-cell-class-name="headerBg"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="username" label="用户名" width="140"></el-table-column>
          <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
          <el-table-column label="操作"  width="200" align="center">
            <template slot-scope="scope"> 
              <el-button type="success" size=small @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
              <el-popconfirm 
                  class="ml-5"
                  confirm-button-text='确定'
                  cancel-button-text='我再想想'
                  icon="el-icon-info"
                  icon-color="red"
                  title="您确定删除吗？"
                  @confirm="handleDelete(scope.row.id)"
              >
              <el-button type="danger" size=small slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
            </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding: 10px 0">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[2, 5, 10, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>

         <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%" >
          <el-form label-width="80px" size="small">
            <el-form-item label="用户名">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </div>
        </el-dialog>


      </el-main>

    </el-container>
</template>

<script>
import Net from '../js/request.js'
export default {
  name: 'MainContain2',
    data() {
    return {
      total:0,
      pageSize:2,
      pageNum:1,
      username:"",
      email: "",
      tableData: [],
      form:{},
      msg: "hello liz",
      multipleSelection: [],
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: 'headerBg',
      dialogFormVisible:false,
    }
  },
  methods: {
    collapse() {  // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {  // 收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {   // 展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
      
    },
    load() {
      Net.queryPage(this.pageNum,this.pageSize,this.username,this.email).then((res) => {
        console.log(res)
        this.tableData = res.records
        this.total = res.total

      })
    },
    reset(){
      this.username="",
      this.email=""
      this.load()
    },
    save() {
        console.log(this.form)
        Net.saveUser(this.form).then(res => {
        if (res) {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleadd(){
      this.dialogFormVisible=true
      this.form = {}
    },
    handleSizeChange(pageSize){
      console.log(pageSize)
      this.pageSize=pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      console.log(pageNum)
      this.pageNum=pageNum
      this.load()
    },
    handleEdit(row){
      // 把row的数据传给页签
      this.form = row
      this.dialogFormVisible = true
    },
    handleDelete(id){
      Net.deleteUser(id).then(res => {
        if (res) {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val){
      // console.log(val)
      this.multipleSelection=val
    },
    delBatch(){
      // console.log(this.multipleSelection)
      let ids = this.multipleSelection.map(v => v.id) //[1.2.3] 变为纯id数组
      console.log(ids)
    Net.deleteBatchUser(ids).then(res => {
        if (res) {
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    }
    

  },
  created(){
      this.load()
  }
    

  
}
</script>

<style scoped>
/* .LineInformationContent {
    width: 265x;
    height: 100%;
    background: #F7F8FA;
    border: 1px solid #E5E9EE;
    border-radius: 2px;
    margin-right: 18px;
    margin-bottom: 18px;
    transition: all .5s;
}
 */

 .ml-5{
  margin-left :5px
 }

</style>