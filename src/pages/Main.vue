<template>
    <div>
        <div class="el-textarea">
            <textarea
                class="el-textarea__inner"
                placeholder="请输入内容"
                @input="inputChange"
            />
        </div>

        <select-person />
        <tag-select
            :default-value='defaultValue'
            @changeSelectTab='changeSelectTab'
        />
        <el-button size="small" class="reset-button" type="primary" @click="resetData">恢复默认值</el-button>
    </div>
</template>
<script>
import TagSelect from '../components/TagSelect.vue'
import SelectPerson from '../components/SelectPerson.vue'

export default {
    data() {
        return {
            defaultValue: [3, 5, 10],
            textarea: ''
        }
    },
    components: {
        TagSelect,
        SelectPerson
    },
    setup() {
    },
    methods: {
        changeSelectTab(selectTabs) {
            console.log('[select] tabs', selectTabs)
        },
        inputChange(event) {
            const { value } = event.target
            console.log('event', event)
        }
    }
}
</script>
<style>
.box {
    display: flex;
    flex-direction: row;
}
.left-label {
    padding-right: 12px;
    text-align: right;
    font-size: 14px;
    line-height: 40px;
    vertical-align: middle;
}
.content {
    display: flex;
    align-items: center;
}
.tag {
    margin-right: 12px;
}
.edit {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #409EFF;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

/* el-dialog 样式自定义 */
.el-dialog__header {
    padding: 0;
}

.dialog-tag-box {
    padding-top: 10px;
    padding-bottom: 50px;
}

.dialog-tag-box .tag {
    cursor: pointer;
}

.dialog-footer {
    width: 100%;
}

.confirm-button {
    width: 100%;
}

.reset-button {
    margin-top: 20px;
    float: left;
}

</style>