<template>
    <div>
        <el-button type="primary" @click="handleClick">点击</el-button>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="demo-input-suffix">
                    <h3>文章标题：</h3>
                    <el-input
                        placeholder="请输入文章名称"
                        prefix-icon="el-icon-s-order"
                        size="small"
                        v-model="content.articleTitle"
                    >
                    </el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="demo-input-suffix">
                    <h3>文章标签：</h3>
                    <el-input
                        placeholder="给文章加点标签"
                        prefix-icon="el-icon-moon"
                        size="small"
                        v-model="content.articleTitle"
                    >
                    </el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="demo-input-suffix">
                    <h3>分类:</h3>
                     <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in pageCategoryEnum"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <div class="upload-img">
            <h3>文章缩略图:</h3>
            <el-upload
                class="avatar-uploader"
                action="/api/operation/upLoadImg"
                ref="upload"
                auto-upload
                :before-upload="before"
                :on-success="upSuccess"
                name="img"
            >
                <img v-if="content.thumbnail" :src="content.thumbnail" class="avatar" />
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <quillEditor v-model="content.articleContent" :options="editorOption" />
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import ImageResize from "quill-image-resize-module";
import Quill from "quill";
import { quillEditor } from "vue-quill-editor";
Quill.register("modules/imageResize", ImageResize);
import operation from "@/api/operations";
import pageCategoryEnum from '@/enums/pageCategoryEnum'
export default {
    components: {
        quillEditor,
    },
    data() {
        return {
            content: {
                articleTitle: "",
                articleContent: "",
                tag: "",
                thumbnail:'',
                classIfy:''
            },
            editorOption: {
                placeholder: "文章内容........",
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike", "image"],
                        ["formula", "clean"],
                        ["blockquote", "code-block"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ script: "sub" }, { script: "super" }],
                        [{ size: ["small", false, "large", "huge"] }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ color: [] }, { background: [] }],
                        [{ align: [] }],
                        [{ direction: "rtl" }],
                    ],
                    imageResize: {
                        displayStyles: {
                            backgroundColor: "black",
                            border: "none",
                            color: "white",
                        },
                        modules: ["Resize", "DisplaySize", "Toolbar"],
                    },
                },
            },
        };
    },
    methods: {
        // 上传多图片
        handleClick() {
             // 获取到 上传的所有文件，它是一个数组
            const fileArray = this.$refs.upload.uploadFiles;
            // 实例化FormData对象
            const fd = new FormData();
            // 遍历文件数组，将所有文件存入fd中
            for(let i = 0; i < fileArray.length; i++) {
                // 在这里数组每一项的.raw才是你需要的文件，有疑惑的可以打印到控制台看一下就清楚了
                fd.append('img', fileArray[i].raw);
                console.log(fileArray,fd);
            }
            operation.upLoadImg(fd).then(res=>{
                console.log(res)
                this.thumImg = res.data.imgUrl
            })
        },
        upSuccess(res){
            console.log(res)
             this.content.thumbnail = res.data.imgUrl
        },
        before(file){
            console.log(file)
        }
    },
};
</script>

<style lang="scss" scoped>
$upLoadHeight:90px;
h3 {
    flex-shrink: 0;
    color: var(--color5);
    font-size: 15px;
}
.demo-input-suffix {
    display: flex;
    align-items: center;
}
.el-row {
    margin-bottom: 10px;
}
//文章内容区域高度
 /deep/ .ql-container{
    height: 300px;
}
.upload-img{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    h3{
        margin-right: 20px;
    }
}
.avatar-uploader {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: $upLoadHeight;
    height: $upLoadHeight;
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