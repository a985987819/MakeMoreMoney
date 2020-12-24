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
        currentTag: undefined
    } as RootState,
    mutations: {
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },
        fetchMarks(state) {
            state.markList = JSON.parse(window.localStorage.getItem('markList') || '[]') as Mark[];
        },
        createMark(state, mark) {
            const mark2: Mark = clone(mark);
            mark2.createdAt = new Date().toISOString();
            state.markList.push(mark2);
            store.commit('saveMarks');
        },
        saveMarks(state) {
            window.localStorage.setItem('markList',
                JSON.stringify(state.markList));
        },
        fetchTags(state) {
            const tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
            return state.tagList = tagList;
        },
        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签重复');
            }
            const id = createId().toString();
            console.log(id);
            state.tagList.push({id, name: name});
            store.commit('saveTags');
            window.alert('添加成功');
        },
        saveTags(state) {
            console.log('保存了tag');
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
        updateTag(state, payload: { id: string, name: string }) {
            const {id, name} = payload;
            const idList = state.tagList.map(item => item.id);
            console.log('现在要找的id是' + id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                console.log('1111,id存在');
                if (names.indexOf(name) >= 0) {
                    console.log('不能改这个');
                    alert('标签名重复')
                } else {
                    console.log('可以改名');
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTags');
                }
            }
        },
        removeTag(state,id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index>=0){
                state.tagList.splice(index, 1);
                store.commit('saveTags')
                router.back();
            } else {
                alert('删除失败');
            }
        },
    }
});

export default store;
