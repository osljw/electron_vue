<template>
    <div class="login_container">
        <div class="login_box"> 
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="@/assets/logo.png" alt="">
            </div>
            <!-- 表单 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login_form" >
                <!-- 账号 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" show-password prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <!-- 二次确认密码 -->
                <el-form-item prop="second_password">
                    <el-input v-model="loginForm.second_password" show-password prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="login_btns">
                    <el-button type="primary" @click="register"> 注册 </el-button>
                    <el-button type="info" @click="resetLoginForm"> 重置 </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { Register } from '@/api/index.js'

export default {

    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                second_password: ''
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: 'Please input user name',
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 20,
                        message: 'Length should be 1 to 20',
                        trigger: 'blur',
                    },
                ],
                password: [
                    {
                        required: true,
                        message: 'Please input password',
                        trigger: 'blur',
                    },
                    {
                        min: 3,
                        max: 16,
                        message: 'Length should be 3 to 16',
                        trigger: 'blur',
                    },
                ],
                second_password: [
                    {
                        required: true,
                        message: 'Please confirm password',
                        trigger: 'blur',
                    },
                    {
                        min: 3,
                        max: 16,
                        message: 'Length should be 3 to 16',
                        trigger: 'blur',
                    },
                ],
            }
        }
    },
    methods: {
        resetLoginForm() {
            //console.log(this)
            this.$refs.loginFormRef.resetFields()
        },
        register() {
            this.$refs.loginFormRef.validate(async (valid) => {
                if (!valid) return;
                if (this.loginForm.password != this.loginForm.second_password) return ElMessage.error("请确认密码一致");

                //const {data: rsp} = await this.$http.post("login", this.loginForm)
                const rsp = await Register(this.loginForm)
                console.log("rsp:", rsp)

                if (!rsp.status) {
                     return ElMessage.error("注册失败: " + rsp.data)
                }

                ElMessage.success("注册成功");
                window.sessionStorage.setItem("token", rsp.token)
                this.$router.push('/login')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        // box-shadow: 0 0 10px #eee;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.login_btns {
    margin-right: 0;
    // display: flex;
    // align-items: center;
    // justify-content: center;
}

</style>