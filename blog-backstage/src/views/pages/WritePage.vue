<template>
    <div>
        <el-button type="primary" @click="handleClick">点击</el-button>
        <quillEditor 
            v-model="content"
            :options="editorOption"
         />
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import ImageResize from "quill-image-resize-module";
import Quill from 'quill'
import { quillEditor } from "vue-quill-editor";
Quill.register("modules/imageResize", ImageResize);
export default {
    components: {
        quillEditor,
    },
    data() {
        return {
            content: null,
            editorOption: {
                 placeholder: '输入内容........',
                modules: {
                    toolbar: [
                         ['bold', 'italic', 'underline', 'strike', 'image'],
                        ['formula', 'clean'],
                        ['blockquote', 'code-block'],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'script': 'sub'}, {'script': 'super'}],
                        [{'size': ['small', false, 'large', 'huge']}],
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        [{'direction': 'rtl'}]
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
        handleClick() {
            console.log(this.content);
        },
    },
};
</script>

<style>
</style>