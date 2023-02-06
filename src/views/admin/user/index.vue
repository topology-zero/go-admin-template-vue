<template>
    <div class="app-container">
        <p class="page-title">用户列表</p>
        <div class="filter-container">
            <el-button v-permission="`admin:user:add`"
                       type="primary"
                       plain
                       class="filter-item"
                       @click="handleAdd()">
                添加用户
            </el-button>
            <!-- <div style="float: right; display: flex">
                <el-input v-model="params.name" placeholder="姓名|手机号" style="width: 200px; margin: 0 3px"
                    class="filter-item" />
                <el-button type="primary" class="filter-item" @click="search()">搜索
                </el-button>
            </div> -->
        </div>
        <el-table v-loading="table_loading"
                  element-loading-text="加载中..."
                  border
                  :data="list">
            <el-table-column label="ID"
                             prop="id"
                             align="center"
                             width="60px" />
            <el-table-column align="center"
                             label="用户名"
                             prop="username" />
            <el-table-column align="center"
                             label="手机号"
                             prop="phone" />
            <el-table-column align="center"
                             label="真实姓名"
                             prop="realname" />
            <el-table-column align="center"
                             label="所属角色"
                             prop="rolename" />
            <el-table-column align="center"
                             label="状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status == 1"
                            type="success">正常</el-tag>
                    <el-tag v-else
                            type="danger">停封</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center"
                             width="170px"
                             label="操作">
                <template slot-scope="{row}">
                    <el-button v-permission="`admin:user:edit`"
                               size="mini"
                               type="primary"
                               @click="handleEdit(row)">编辑
                    </el-button>
                    <el-button v-if="row.id != 1"
                               v-permission="`admin:user:del`"
                               size="mini"
                               type="danger"
                               @click="handleDel(row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination background
                           :current-page.sync="params.page"
                           :page-sizes="page_sizes"
                           :page-size="params.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script>
import { getList, del } from './api'
import { pageMixin } from '@/utils/mixin'
export default {
    name: 'AdminUser',
    mixins: [pageMixin],
    data() {
        return {
            params: {
                name: ''
            }
        }
    },
    methods: {
        // 跳转到编辑用户
        handleEdit(info) {
            this.$router.push({ path: '/admin/user/edit', query: { id: info.id }})
        },
        // 跳转到添加用户
        handleAdd() {
            this.$router.push('/admin/user/add')
        },
        // 删除用户
        async handleDel(info) {
            await this.$confirm('删除用户不可恢复', '警告')
            const { message } = await del(info.id)
            this.$message.success(message)
            this._getData(this.params)
        },
        // 获取数据
        async _getData() {
            const res = await getList(this.params)
            this.list = res.data.data
            this.total = res.data.total
            this.pageSize = res.data.per_page
            this.page = res.data.current_page
            this.table_loading = false
        }
    }
}
</script>
