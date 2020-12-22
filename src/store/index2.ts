import markStore from '@/store/markStore';
import tagStore from '@/store/tagStore';


const store = {

    ...markStore,
    ...tagStore

};
console.log(store);
export default store;