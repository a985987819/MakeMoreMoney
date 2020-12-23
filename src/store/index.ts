import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/idGenerator';

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        markList: [] as Mark[],
        tagList: [] as Tag[]
    },
    mutations: {
        fetchMarks(state) {
            state.markList = JSON.parse(window.localStorage.getItem('markList') || '[]') as Mark[];
        },
        createMark(state, mark) {
            const mark2: Mark = clone(mark);
            mark2.createdAt = new Date();
            state.markList.push(mark2);
            store.commit('saveMarks');
        },
        saveMarks(state) {
            window.localStorage.setItem('markList',
                JSON.stringify(state.markList));
        },
        fetchTags(state) {
            const tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
            return state.tagList=tagList;
        },
        createTag(state,name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签重复');
                return 'duplicated';
            }
            const id = createId().toString();
            console.log(id);
            state.tagList.push({id, name: name});
            store.commit('saveTags')
            window.alert('添加成功');
            return 'success';
        },
        saveTags(state) {
            console.log("保存了tag");
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
    }
});

export default store;
