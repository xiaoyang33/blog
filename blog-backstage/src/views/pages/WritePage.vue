<template>
    <div>
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
                        v-model="content.tag"
                    >
                    </el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="demo-input-suffix">
                    <h3>分类:</h3>
                    <el-select
                        v-model="content.classIfy"
                        placeholder="请选择分类"
                        size="small"
                        clearable
                    >
                        <el-option
                            v-for="item in pageCategoryEnum"
                            :key="item.articleClassIfy"
                            :label="item.articleClassIfy"
                            :value="item.articleClassIfy"
                        >
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <div class="upload-img">
            <h3>文章缩略图:</h3>
            <el-upload
                class="avatar-uploader"
                :action="getUpLoadUrl()"
                ref="upload"
                auto-upload
                :on-success="thumUpLoadImg"
                name="img"
                :headers="{
                    token:getStorage('token')
                }"
            >
                <img
                    v-if="content.thumbnail"
                    :src="content.thumbnail"
                    class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <el-row v-loading="isUpLoadImg">
            <el-upload
                class="avatar-uploader editor"
                :action="getUpLoadUrl()"
                id="editor-upload"
                auto-upload
                :before-upload="beforeUpLoad"
                :on-success="enitorUpLoadImg"
                :on-error="editorUploadErr"
                name="img"
                :headers="{
                    token:getStorage('token')
                }"
            >
            </el-upload>
            <quillEditor
                ref="myQuillEditor"
                v-model="content.articleContent"
                :options="editorOption"
            />
        </el-row>
        <el-row :gutter="10">
            <el-button type="primary" @click="saveArticle">保存文章</el-button>
        </el-row>
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 图片大小调整
import ImageResize from "quill-image-resize-module";
// 粘贴图片上传 拖拽上传
import { ImageExtend } from "quill-image-paste-module";
import Quill from "quill";
import { quillEditor } from "vue-quill-editor";
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/ImageExtend", ImageExtend);

import operation from "@/api/operations";
import { imgBaseUrl } from '@/api/request'
// 富文本按钮配置
import editorOptions from "@/enums/editorOptions";
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
                thumbnail: "",
                classIfy: "",
            },
            pageCategoryEnum:[],
            isUpLoadImg: false,
            editorOption: {
                placeholder: "文章内容........",
                them: "snow",
                modules: {
                    // imageDrop: true,
                    toolbar: {
                        container: editorOptions,
                        // 处理上传图片到服务器
                        handlers: {
                            image: (value) => {
                                // return
                                if (value) {
                                    document
                                        .querySelector("#editor-upload input")
                                        .click();
                                } else {
                                    // console.log(11111)
                                    this.quill.format("image", false);
                                }
                            },
                        },
                    },
                    clipboard:{
                        matchers:[
                            ['img',this.handleCustomMatcher]
                        ]
                    },
                    imageResize: {
                        displayStyles: {
                            backgroundColor: "black",
                            border: "none",
                            color: "white",
                        },
                        modules: ["Resize", "DisplaySize", "Toolbar"],
                    },
                    ImageExtend: {
                        // loading: true,
                        name: "img",
                        headers:(xhr)=>{
                            xhr.setRequestHeader ('token11',this.getStorage('token'))
                        },
                        action: this.getUpLoadUrl(),
                        response: (res) => {
                            // console.log(res, "response");
                            return res.data.imgUrl;
                        },
                    },
                },
            },
        };
    },
    created(){
        let _id = this.$route.query.id
        if(_id){
            operation.findArticle({_id}).then((res) => {
                if(res.code === 200){
                    Object.assign(this.content,res.data[0])
                }
            });
        }
    },
    mounted(){
        operation.findArticleClassIfy().then(res=>{
            this.pageCategoryEnum = res.data
        })
    },
    methods: {
        // 保存文章
        saveArticle(){
            operation.saveArticle({
                ...this.content
            }).then(res=>{
                console.log(res)
                if(res.code === 200)  this.$message.success("保存成功");
            })
        },
        thumUpLoadImg(res) {
            this.content.thumbnail = res.data.imgUrl;
        },
        // 富文本图片上传处理
        beforeUpLoad(file) {
            // console.log(file);
            this.isUpLoadImg = true;
        },
        enitorUpLoadImg(file) {
            // console.log(file);
            let quill = this.$refs.myQuillEditor.quill;
            if (file.code === 200 && file.data !== null) {
                // 获取光标所在位置
                let length = quill.getSelection().index;
                // 插入图片  file.data为服务器返回的图片地址
                quill.insertEmbed(length, "image", file.data.imgUrl);
                // 调整光标到最后
                quill.setSelection(length + 1);
            } else {
                this.$message.error("图片插入失败");
            }
            this.isUpLoadImg = false;
        },
        editorUploadErr() {
            this.isUpLoadImg = false;
            this.$message.error("图片插入失败");
        },
        // 原生粘贴事件与 quill-image-paste-module 粘贴事件冲突 默认去掉
        handleCustomMatcher(node,delta){
            // console.log(node,delta)
            // delta 是插入的元素对象  ops属性时存储的插入属性数组
            if(delta.ops[0].insert.image){
                delta.ops[0].insert.image = ''
            }
            return delta
        },
        getUpLoadUrl(){
            // console.log(imgBaseUrl)
            return imgBaseUrl + '/operation/upLoadImg'
        }
    },
};
</script>

<style lang="scss" scoped>
$upLoadHeight: 90px;
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
/deep/ .ql-container {
    height: 300px;
}
.upload-img {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    h3 {
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