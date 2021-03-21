<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="6"></el-col>
        </el-row>
         <el-table :data="tabData" stripe border style="width: 100%">
            <el-table-column
                prop="articleTitle"
                label="文章名称"
                align="center"
            >
            </el-table-column>
             <el-table-column
                prop="classIfy"
                label="分类"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="pageView"
                label="浏览量"
                align="center"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button slot="reference"  size="mini" type="primary" @click="handleEdit(scope.row)" style="margin-right:10px;"

                    >编辑</el-button>
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
    </div>
</template>

<script>
import operation from "@/api/operations";
export default {
    data() {
        return {
            tabData: [],
        };
    },
    created() {
        this.articleList();
    },
    methods: {
        articleList() {
            operation.findArticle().then((res) => {
                console.log(res);
                if(res.code === 200){
                  this.tabData = res.data
                }
            });
        },
        handleDelete(index,row){
          console.log(index,row);
          let id = row._id
          operation.deleteArticle({id}).then(res=>{
            console.log(res);
            if(res.code === 200){
              this.$message.success('删除成功')
              this.articleList()
            }
          })
        },
        handleEdit(row){
          console.log(row)
          this.$router.push({
            path:'/WritePage',
            query:{
              id:row._id
            }
          })
        }
    },
};
</script>

<style>
</style>