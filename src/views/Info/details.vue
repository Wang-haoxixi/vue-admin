<template>
    <div id="infoDetail">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="信息分类：">
                <el-select v-model="form.category_id" placeholder="请选择">
                    <el-option v-for="(item,index) in cateList.data" :key="index" :label="item.category_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新闻标题：">
                <el-input v-model="form.title" placeholder="请输入" style="width:370px"></el-input>
            </el-form-item>
            <el-form-item label="缩略图：">
                <el-upload
                    class="avatar-uploader"
                    action="http://up-z2.qiniup.com"
                    :data="uploadKey"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="发布日期：">
                <el-date-picker
                    disabled
                    v-model="form.create_date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="详细内容：">
                <quillEditor v-model="form.content" ref="myQuillEditor" :options="editorOption" />
            </el-form-item>
            <el-form-item>
                <el-button type="danger" :loading="loading" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { reactive, ref, onMounted} from "@vue/composition-api";
import { GetList, EditInfo } from "@/api/news.js";
import { formatterTime } from "@/utils/common"
import { QiniuToken } from "@/api/common.js";

// 局部引入富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
    name: "Details",
    components: {
        quillEditor
    },
    setup(props, { root }){
        onMounted(() => {
            id.value = root.$store.getters["infoDetails/infoId"];
            title.value = root.$store.getters["infoDetails/infoTitle"];
            getCategory();
            getNewInfo();
            getQiniuToken();
        });
        const id = ref("");
        const title = ref("");
        const loading = ref(false);
        // 详情内容
        const cateList = reactive({
            data: [],
        });
        // 富文本配置项
        const editorOption = reactive({
            placeholder: "请输入文章内容",
        });
        // 七牛云token （七牛云上传图片到服务器时需要携带token，否则会报错token not specified令牌未指定）
        const uploadKey = reactive({
            token: "",
            key: "",
        });
        // 表单内容
        const form = reactive({
            title: "",
            category_id: "",
            create_date: "",
            content: "",
            imgUrl: "",
        })
        // --------------------------------------------------------------------------------------------------------------------
        const handleAvatarSuccess = (res, file) => {
            form.imgUrl = `http://r9a2h1unb.hn-bkt.clouddn.com/${res.key}`;
        };
        const beforeAvatarUpload = (file) => {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            // 文件名转码后再上传到七牛云
            let suffix = file.name; //文件地址后缀
            uploadKey.key = encodeURI(`${suffix}`);
            // if (!isJPG) {
            //     root.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            // if (!isLt2M) {
            //     root.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isJPG && isLt2M;
        };
        // 保存
        const onSubmit = () => {
            loading.value = true;
            let requestData = {
                id: id.value,
                categoryId: form.category_id,
                title: form.title,
                content: form.content,
                imgUrl: form.imgUrl,
                // status: 0,
            }
            EditInfo(requestData).then(response => {
                if(response.data.resCode == 0){
                    root.$message.success(response.data.message);
                    loading.value = false;
                    root.$router.back(-1);
                }
            }).catch(() => { 
                loading.value = false;
            })
        }
        // 获取七牛云token
        const getQiniuToken = () => {
            QiniuToken({
                "ak":"GHnOuYtiHUliqHtmZRR9AUnTXd005wu-wsBHwHdQ",
                "sk":"ymd_-LMTCdl7wnHwvEMqQ70IE7mnNUvSk632TJ01",
                "buckety":"vue3-admin",
            }).then((response) => {
                uploadKey.token = response.data.data.token;
            })
        };
        // 获取信息详情
        const getNewInfo = () => {
            let reqData = {
                pageNumber: 1,
                pageSize: 1,
                id: id.value,
            }
            GetList(reqData).then((res) => {
                let data = res.data.data.data[0];
                form.title = data.title;
                form.category_id = data.categoryId;
                form.create_date = formatterTime(data.createDate);
                form.content = data.content;
                form.imgUrl = data.imgUrl;
            })
        };
        // 获取信息分类（有子级分类）
        const getCategory = () => {
            // 调用vuex中的获取分类数据方法
            root.$store.dispatch("common/getInfoCate").then(response => {
                cateList.data = response;
            })
        };
        return {
            id,
            title,
            cateList,
            form,
            editorOption,
            loading,
            uploadKey,
            // --------------------------------------------------------------------------------------------------------------------
            onSubmit,
            getCategory,
            handleAvatarSuccess,
            beforeAvatarUpload,
        }
    }
}
</script>

<style lang="scss" scoped>
#infoDetail{
    ::v-deep .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    ::v-deep .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    ::v-deep .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    ::v-deep .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}

</style>