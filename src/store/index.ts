import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        markList: [] as Mark[]
    },
    mutations: {
        fetchMarks(state){
            state.markList = JSON.parse(window.localStorage.getItem('markList') || '[]') as Mark[]
        },
        createMark(state, mark) {
            const mark2: Mark = clone(mark);
            mark2.createdAt = new Date();
            state.markList.push(mark2);
            store.commit('saveMarks')
        },
        saveMarks(state) {
            window.localStorage.setItem('markList',
                JSON.stringify(state.markList));
        },
    }
});

export default store;
