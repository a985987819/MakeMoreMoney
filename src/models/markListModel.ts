const localStorageName = 'markList';
const markListModel = {
    clone(data:Mark[] | Mark){
        return JSON.parse(JSON.stringify(data))
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageName) || '[]') as Mark[];
    },
    save(data:Mark[]) {
        window.localStorage.setItem(localStorageName, JSON.stringify(data));
    }
};

export {markListModel};