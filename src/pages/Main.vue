<template>
    <div>
        <select-person
            class="el-textarea"
            :list="list"
        >
        </select-person>
        <tag-select
            :default-value='defaultValue'
            @changeSelectTab='changeSelectTab'
        />
        <el-button size="small" class="reset-button" type="primary" @click="resetData">恢复默认值</el-button>
    </div>
</template>
<script>
import TagSelect from '../components/TagSelect.vue'
import SelectPerson from '../components/select-person/index.vue'

export default {
    data() {
        return {
            defaultValue: [3, 5, 10],
            textarea: '',
            list: [
                {
                    id: 7,
                    name: 'abc',
                    img: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                {
                    id: 1,
                    name: '张三d',
                    img: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                {
                    id: 2,
                    name: '李四a',
                    img: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                {
                    id: 5,
                    name: '赵武c',
                    img: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                {
                    id: 11,
                    name: '噜噜修',
                    img: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                {
                    id: 12,
                    name: '圣罗兰',
                    img: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                {
                    id: 18,
                    name: '12啥',
                    img: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                }
            ]
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