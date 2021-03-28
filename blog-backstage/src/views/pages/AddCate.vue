<template>
    <div>
        <el-button class="add-btn" type="primary" @click="addCate"
            >添加分类</el-button
        >
        <el-table :data="data" stripe border style="width: 100%">
            <el-table-column
                prop="articleClassIfy"
                label="分类名称"
                align="center"
                width="300px"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <!-- <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    > -->
                      <el-popconfirm
                        confirm-button-text='确定'
                        cancel-button-text='取消'
                        cancel-button-type="primary"
                        @confirm="handleDelete(scope.$index, scope.row)"
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定删除吗?"
                      >
                      <el-button slot="reference"  size="mini" type="danger">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加分类" :visible.sync="dialogVisible" width="50%">
            <el-input v-model="cateName" placeholder="请输入分类名称"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAddCate"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import operation from "@/api/operations";
export default {
    data() {
        return {
            data: [],
            cateName:'',
            dialogVisible: false,
        };
    },
    created() {
        this.initList();
    },
    methods: {
        initList() {
            operation.findArticleClassIfy().then((res) => {
                this.data = res.data;
            });
        },
        addCate(){
          this.dialogVisible = true
        },
        // 保存分类名称
        saveAddCate(){
          if(this.cateName.trim() === '') return  this.$message.warning('分类名称不能为空')
          operation.saveArticleClassIfy({title:this.cateName}).then(res=>{
            if(res.code === 200){
              this.$message.success('保存成功')
            }
          })
          this.initList()
          this.cateName = ''
          this.dialogVisible = false
        },
        handleEdit(){

        },
        handleDelete(index,row){
          // console.log(index,row)
          operation.deleteArticleClassIfy({id:row._id}).then((res)=>{
            if(res.code === 200) this.$message.success('删除成功')
          })
          this.initList()
        }
    },
};
</script>

<style lang="scss" scoped>
.add-btn {
    margin-bottom: 20px;
}
/deep/ .has-gutter {
    // color: #333;
    // font-weight: bold;
    div {
        text-align: center;
    }
}

</style>