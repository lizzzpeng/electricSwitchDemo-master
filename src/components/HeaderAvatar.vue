<template>
    <div>
        <el-row class="head">

            <el-col :span="24">

                <el-col :span="23">
                    <div class="title">智能断路器管理系统</div>
                    <el-col :span="3" class="avatarCol">
                        <div class="circle">
                            <div class="block">
                                <el-avatar class="avatar" size="large">
                                    {{userName}}
                                </el-avatar>
                                <a href="javascript:void(0);" @click="logout()">注销</a>
                            </div>
                        </div>
                    </el-col>
                </el-col>

            </el-col>
        </el-row>
    </div>


</template>

<script>
import router from '@/router'
export default {
    name: 'HeaderAvatar',
    data() {
        return {
            userName: JSON.parse(window.localStorage.getItem('access-admin')).data.username.substring(0, 1),
            sizeList: ["large", "medium", "small"]
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('access-admin');
            router.push('/LoginBegin');
        }
    }
}

</script>

<style>
.avatar {
    margin-top: 10px;
    background: #409EFF;
    color: rgb(255, 246, 240);

}

.avatarCol {
    position: absolute;
    right: 0px;
    top: 0px;
}

.avatarCol a {
    position: absolute;
    top: 12px;
    line-height: 40px;
    font-size: 16px;
    color: #f6f6f6;
    text-decoration-line: none;
    margin-left: 8px;
}

.block {
    border-radius: 5px;
    vertical-align: middle;

}

.title {
    color: #efe3f6;

}
</style>