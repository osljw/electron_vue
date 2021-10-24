<template>
    <div>
        Home
        <el-button @click="quitLogin"> 退出 </el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        quitLogin() {
            window.sessionStorage.clear()
            this.$router.push('login')
        }
    }
}
</script>

<style scoped>

</style>
