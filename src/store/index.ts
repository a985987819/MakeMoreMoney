import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/idGenerator';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        markList: [],
        tagList: [],
        createTagError: null,
        currentTag: undefined
    } as RootState,

    mutations: {
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },
        fetchMarks: function (state) {
            state.markList = JSON.parse(window.localStorage.getItem('markList') || '[]') as Mark[];
            const arr: any[] = ['奖励'];
            const earnMark: Mark = {
                tags: arr,
                notes: '奖励好好生活的人',
                type: '+',
                createdAt:'2021-01-01',
                sum: 10000
            };
            const earnMark2: Mark = {
                tags: arr,
                notes: '奖励好好生活的人',
                type: '+',
                createdAt:'2020-01-01',
                sum: 10000
            };
            const spendMark: Mark = {
                tags: arr,
                notes: '黄焖鸡',
                type: '-',
                createdAt:'2021-01-11',
                sum: 18
            };
            if (!state.markList || state.markList.length === 0) {
                store.commit('createMark', earnMark);
                store.commit('createMark', earnMark2);
                store.commit('createMark', spendMark);
            }
        },
        createMark(state, mark: Mark) {
            const mark2: Mark = clone(mark);
            // mark2.createdAt = new Date().toISOString();
            state.markList.push(mark2);
            store.commit('saveMarks');
            // window.alert('添加成功');
        },
        saveMarks(state) {
            window.localStorage.setItem('markList', JSON.stringify(state.markList));
        },
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
            if(!state.tagList||state.tagList.length === 0){
                store.commit('createTag','早餐')
                store.commit('createTag','午餐')
                store.commit('createTag','奶茶')
                store.commit('createTag','买衣服')
                store.commit('createTag','压岁钱')
                store.commit('createTag','发工资啦')
            }
        },
        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签重复');
            }
            const id = createId().toString();
            state.tagList.push({id, name: name});
            store.commit('saveTags');
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
        updateTag(state, payload: { id: string; name: string }) {
            const {id, name} = payload;
            const idList = state.tagList.map(item => item.id);
            console.log('现在要找的id是' + id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                console.log('1111,id存在');
                if (names.indexOf(name) >= 0) {
                    console.log('不能改这个');
                    alert('标签名重复');
                } else {
                    console.log('可以改名');
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTags');
                }
            }
        },
        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                state.tagList.splice(index, 1);
                store.commit('saveTags');
                router.back();
            } else {
                alert('删除失败');
            }
        },
    }
});

export default store;
