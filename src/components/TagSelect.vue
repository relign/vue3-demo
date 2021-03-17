<template>
    <div class="box">
        <label class="left-label">待选人员</label>
        <div class="content">
            <div class="tag-box">
                <el-tag
                    v-for="item in tags"
                    :key="item.id"
                    class="tag"
                >
                    {{item.name}}
                </el-tag>
            </div>
            <div class="edit" @click="openDialog">
                <i class="el-icon-edit"></i>
            </div>
        </div>
        <el-dialog
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            v-model="dialogVisible"
            width="30%"
            center
        >
            <el-input
                prefix-icon="el-icon-search"
                v-model="input"
                placeholder="搜索(这个搜索框是干什么用的?)">
            </el-input>
            <div class="dialog-tag-box">
                <el-tag
                    v-for="item in allTagInfo"
                    :key="item.id"
                    class="tag"
                    @click="selectTag(item)"
                    :effect="item.selected ? 'dark' : 'plain'"
                >
                    {{item.name}}
                </el-tag>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button class="confirm-button" type="primary" @click="confirm">确 定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import {getTags, setTags, resetData, allTagInfo} from '../services/tag-select'

const deepClone = obj => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

export default {
    props: {
        defaultValue: Array
    },
    data() {
        return {
            dialogVisible: false,
            input: '',
            tags: [],
            allTagInfo
        }
    },
    setup() {
    },
    async beforeMount() {
        const { code, data } = await getTags();
        if (code === 0) {
            this.tags = data.list.map(item => {
                item.selected = true;
                return item;
            })
        }
    },
    methods: {
        resetData () {
            resetData()
        },
        openDialog () {
            this.allTagInfo = this.allTagInfo.map(item => {
                const index = this.tags.findIndex(tag => tag.id === item.id);
                if (index > -1) {
                    item.selected = true;
                } else {
                    item.selected = false
                }

                return item;
            });
            this.dialogVisible = true;
        },
        selectTag (info) {
            this.allTagInfo.forEach(tag => {
                if (tag.id === info.id) {
                    tag.selected = !tag.selected;
                }
            })
        },
        confirm () {
            const selectTags = this.allTagInfo.filter(item => !!item.selected);

            if (selectTags && selectTags.length > 0) {
                setTags(selectTags)
                this.tags = selectTags
            }
            console.log('tags', this.tags)
            this.dialogVisible = false;
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
    margin-top: 5px;
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