/** 模拟接口请求 */
const state = { "code": 0, "data": { "list": [ { "name": "张三", "id": 1 },{ "name": "李四", "id": 2 } ] } };

export const allTagInfo = [
    { "name": "张三", "id": 1 },{ "name": "李四", "id": 2 },
    { "name": "晴天", "id": 5 },{ "name": "加加", "id": 0 },
    { "name": "白犬", "id": 10 },{ "name": "早早", "id": 12 },
    { "name": "鲤鱼", "id": 14 },{ "name": "豆豆", "id": 20 },
]


function setData(data) {
    window.localStorage.setItem('tags', JSON.stringify(data));
}

function getData () {
    const data = window.localStorage.getItem('tags');
    return JSON.parse(data)
}

const data = getData()

if (!data) {
    setData(state)
}

export function resetData () {
    setData(state)
}

export function getTags () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = getData()
            resolve(data)
        }, 1000)
    })
}

export function setTags (tags) {
    const data = getData()
    data.data.list = data.data.list.map(item => {
        const sameTag = tags.filter(tag => tag.id === item.id);
        if (sameTag && sameTag.length > 0) {
            item = Object.assign(sameTag[0], item);
        }

        return item;
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            setData(data)
            resolve({
                code: 0
            })
        }, 1000)
    })
}

export function deleteTags (id) {
    const data = getData()
    data.data.list = data.data.list.filter(item => item.id !== id);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            setData(data)
            resolve({
                code: 0
            })
        }, 1000)
    })
}