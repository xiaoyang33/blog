<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8" :offset="8">
                <div class="demo-input-suffix">
                    <h3>博客名称：</h3>
                    <el-input
                        placeholder="请输入博客名称"
                        prefix-icon="el-icon-s-order"
                        size="small"
                        v-model="info.userTitle"
                    >
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" :offset="8">
                <div class="demo-input-suffix">
                    <h3>博客简介：</h3>
                    <el-input
                        placeholder="给博客加点简介"
                        prefix-icon="el-icon-moon"
                        size="small"
                        autosize
                        type="textarea"
                        v-model="info.userDesc"
                    >
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row class="upload-img">
            <el-col :span="8" :offset="8">
                <h3>Bolg头像:</h3>
                <el-upload
                    class="avatar-uploader"
                    :action="getUpLoadUrl()"
                    ref="upload"
                    auto-upload
                    :on-success="userUpLoadImg"
                    name="img"
                    :headers="{
                        token: getStorage('token'),
                    }"
                >
                    <img
                        v-if="info.userImg"
                        :src="info.userImg"
                        class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
        </el-row>
        <el-row style="margin-top:30px;">
            <el-col :span="8" :offset="8">
                <el-button type="primary" @click="save">保存</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import operation from "@/api/operations";
import { imgBaseUrl } from '@/api/request'
export default {
    data() {
        return {
            info: {
                userImg: "",
                userTitle:'',
                userDesc:''
            },
        };
    },
    created(){
      this.getUserInfo()
    },
    methods: {
        getUpLoadUrl() {
          return imgBaseUrl + '/operation/upLoadImg'
        },
        userUpLoadImg(res) {
            this.info.userImg = res.data.imgUrl;
        },
        save(){
          operation.saveInfo({...this.info}).then(res=>{
            // console.log(res)
            if(res.code === 200){
              this.$message.success('保存成功')
            }
          })
        },
        getUserInfo(){
           operation.getUserInfo().then(res=>{
            Object.assign(this.info,res.data.user)
          })
        } 
    },
};
</script>

<style lang="scss" scoped>
$upLoadHeight: 90px;
.avatar-uploader {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: $upLoadHeight;
    height: $upLoadHeight;
    &.editor {
        display: none;
    }
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: $upLoadHeight;
    height: $upLoadHeight;
    line-height: $upLoadHeight;
    text-align: center;
}
.avatar {
    width: $upLoadHeight;
    height: $upLoadHeight;
    display: block;
}
</style>