<template>
    <div class="select-person">
        <textarea
            class="el-textarea__inner"
            placeholder="请输入内容"
            ref="input"
            rows="5"
            :value="inputVal"
            @input="onChange"
            @keydown="onKeyDown"
            @keyup="onKeyUp"
            @blur="onBlur"
        />
        <div v-if="showContent" class="el-textarea__inner select-person_content">
            {{inputVal.slice(0, lastIndex)}}<el-popover
                ref="popover"
                :show-after="100"
                width="120px"
                placement="bottom-end"
                trigger="manual"
                :show-arrow="false"
                :visible="showPop"
            >
                <template #reference>
                    <span>@</span>
                </template>
                <template v-slot>
                    <ul v-if="userList.length > 0" class="el-dropdown-menu">
                        <li
                            v-for="item in userList"
                            class="el-dropdown-menu__item"
                            :key="item.id"
                            @click="selectUser(item)"
                        >
                            <el-avatar shape="square" class="avatar" :size="24" :src="item.img"></el-avatar>
                            <span>{{item.name}}</span>
                        </li>  
                    </ul>
                    <div class="empty-data" v-else>
                        无更多数据
                    </div>
                </template>
            </el-popover>{{inputVal.slice(lastIndex + 1)}}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        list: Array
    },
    data() {
        return {
            userList: [],
            showContent: false,
            inputVal: '',
            lastIndex: -1,
            showPop: false
        }
    },
    setup() {
        
    },
    beforeMount () {
        this.userList = this.list;
    },
    updated () {
        this.$nextTick(() => {
            if (this.showPop !== this.showContent) {
                this.showPop = this.showContent;
            }
        })
    },
    methods: {
        selectUser(info) {
            this.inputVal = this.inputVal.slice(0, this.lastIndex + 1) + info.name;
            this.showContent = false;
        },
        onChange(event) {
            const value = event.target.value;
            this.inputVal = value;
        },
        onKeyDown (event) {
            /** TODO: 上下健的处理 */
            const { which } = event;
            const ESC = 27;
            const ENTER = 13;
            if (which === ESC) {
                this.showContent = false;
            } 
            
            if (which === ENTER) {
                this.showContent = false;
            }
        },
        // onBlur () {
        //     setTimeout(() => {
        //         this.showContent = false;
        //     }, 0)
        // },
        onKeyUp (event) {
            const { key } = event;
            const { selectionStart, value } = event.target;
            const newVal = value.slice(0, selectionStart);
            const lastIndex = newVal.lastIndexOf('@');
               
            if (lastIndex !== -1) {
                const lastChar = newVal.slice(lastIndex + 1);
                this.userList = this.list.filter(item => item.name.indexOf(lastChar) > -1);
                if (lastChar.indexOf(' ') === -1) {

                    if (key === '@') {
                        this.lastIndex = lastIndex;
                        this.showContent = true;
                    }
                } else {
                    this.showContent = false;
                }
            }
        }
    }
}
</script>
<style>
.select-person {
    position: relative;
    width: 100%;
    height: auto;
    background-color: #fff;   
    font-family: inherit;
}
textarea {
    font-family: inherit;
}
.select-person_content {
    box-sizing: border-box;
    position: absolute;
    text-align: start;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    color: black;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    letter-spacing: normal;
    word-spacing: normal;
    overflow: hidden;
}
/** 更改 element 组件样式 */
.el-popover {
    overflow: auto;
}

.el-popover.el-popper {
    min-width: 120px;
    padding: 0;
    max-height: 180px;
}

.el-dropdown-menu__item {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.avatar {
    margin-right: 10px;
}

.empty-data {
    padding: 10px;
    text-align: center;
}

</style>