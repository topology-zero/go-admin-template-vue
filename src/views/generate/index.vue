<template>
    <div class="app-container generate">
        <p class="page-title">代码生成</p>
        <el-table v-loading="table_loading"
                  element-loading-text="加载中..."
                  border
                  :data="list">
            <el-table-column align="center"
                             label="表名"
                             prop="name" />
            <el-table-column align="center"
                             width="170px"
                             label="操作">
                <template slot-scope="{row}">
                    <el-button size="mini"
                               type="primary"
                               @click="handleAdd(row.name)">生成
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogVisible"
                   top="5vh"
                   width="80%">
            <el-tabs type="border-card">
                <el-tab-pane label="js">
                    <el-button type="success"
                               class="copy-btn"
                               size="mini"
                               @click="copyText(jsTpl, $event)">复制 js 内容</el-button>
                    <pre>{{ jsTpl }}</pre>
                </el-tab-pane>
                <el-tab-pane label="vue">
                    <el-button type="success"
                               class="copy-btn"
                               size="mini"
                               @click="copyText(vueTpl, $event)">复制 vue 内容</el-button>
                    <pre>{{ vueTpl }}</pre>
                </el-tab-pane>
                <el-tab-pane label="api">
                    <el-button type="success"
                               class="copy-btn"
                               size="mini"
                               @click="copyText(apiTpl, $event)">复制 api 内容</el-button>
                    <pre>{{ apiTpl }}</pre>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import { getList, add } from './api'
import clip from '@/utils/copy'
export default {
    name: 'Generate',
    data() {
        return {
            dialogVisible: false,
            table_loading: false,
            list: [],
            jsTpl: '',
            vueTpl: '',
            apiTpl: ''
        }
    },
    created() {
        this._getData()
    },
    methods: {
        // 生成代码
        async handleAdd(table) {
            this.dialogVisible = true
            const { data } = await add({ 'table': table })
            this.jsTpl = data.js
            this.vueTpl = data.vue
            this.apiTpl = data.api
        },
        // 获取数据
        async _getData() {
            const { data } = await getList()
            for (const key in data.tables) {
                this.list.push({ name: data.tables[key] })
            }
        },
        copyText(text, e) {
            clip(text, e)
        }
    }
}
</script>

<style lang="scss" scoped>
.generate {
    .copy-btn {
        position: absolute;
        right: 10px;
        top: 10px;
    }

}
</style>
