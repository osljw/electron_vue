<template>
    <div>
        <h3> 用户列表 </h3>
        <!-- 导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"> 首页 </el-breadcrumb-item>
            <el-breadcrumb-item> 用户管理 </el-breadcrumb-item>
            <el-breadcrumb-item> 用户列表 </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card class="box-card">
            <!-- 搜索 -->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input
                     placeholder="Please input"
                     class="input-with-select"
                    >
                        <template #append>
                            <el-button icon="el-icon-search"></el-button>
                        </template>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" icon="el-icon-user"> 添加用户 </el-button>
                </el-col>
            </el-row>
            <!-- 数据表格 -->
            <el-table :data="userList" style="width: 100%" border stripe>
                <el-table-column type="index" />
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column label="Status">
                    <template v-slot="data">
                        {{ data.row }}
                        <el-switch v-model="data.row.status" />
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
            v-model:currentPage="queryInfo.pagenum"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            queryInfo: {
                query: "",
                pagenum: 1,
                pagesize: 2,
            },
            userList: []
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        async getUserList() {
            const {data: rsp} = await this.$http.get("user", this.queryInfo)
            if (rsp.meta.status != 200) {
                return ElMessage.error(rsp.meta.status)
            }
            this.userList = rsp.data
            console.log(this.userList)
        },
        handleSizeChange(newSize) {
            console.log(newSize)
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        handleCurrentChange(newPage) {
            console.log(newPage)
            this.queryInfo.pagenum = newPage
            this.getUserList()
        }
    }
}
</script>

<style lang="less" scoped>

</style>