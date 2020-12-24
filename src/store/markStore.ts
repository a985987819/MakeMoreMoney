
import clone from '@/lib/clone';


const localStorageName = 'markList';


const markStore ={
    //mark store
    markList: [] as Mark[],
    fetchMarks(){
        this.markList = JSON.parse(window.localStorage.getItem(localStorageName) || '[]') as Mark[];
        return this.markList;
    },
    saveMarks(){
        window.localStorage.setItem(localStorageName,
            JSON.stringify(this.markList));
    },
    createMark(mark: Mark){
        const mark2: Mark = clone(mark);
        mark2.createdAt = new Date().toISOString();
        this.markList&&this.markList.push(mark2);
        markStore.saveMarks();
    },

};

markStore.fetchMarks()

export default markStore