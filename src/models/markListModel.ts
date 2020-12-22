import clone from '@/lib/clone';

const localStorageName = 'markList';
const markListModel = {
    data: [] as Mark[],

    create(mark:Mark){
        const mark2: Mark = clone(mark);
        mark2.createdAt = new Date();
        this.data.push(mark2);
        this.save()
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]') as Mark[];
        return this.data
    },
    save() {
        window.localStorage.setItem(localStorageName,
            JSON.stringify(this.data));
    }
};

export {markListModel};