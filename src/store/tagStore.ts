import createId from '@/lib/idGenerator';

const localStorageName = 'tagList';
const tagStore = {

    //tag store
    tagList: [] as Tag[],
    fetchTags() {
        this.tagList = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
        return this.tagList;
    },
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },
    createTag(name: string) {
        const names = this.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            window.alert('标签重复');
            return 'duplicated';
        }
        const id = createId().toString();
        console.log(id);
        this.tagList.push({id, name: name});
        this.saveTags();
        window.alert('添加成功');
        return 'success';
    },
    removeTag(id: string) {
        let index = -1;
        for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === id) {
                index = i;
                break;
            }
        }
        this.tagList.splice(index, 1);
        this.saveTags();
        return true;
    },
    updateTag(id: string, name: string) {
        const idList = this.tagList.map(item => item.id);
        console.log("现在要找的id是"+id);
        if (idList.indexOf(id) >= 0) {
            const names = this.tagList.map(item => item.name);
            console.log("1111,id存在");
            if (names.indexOf(name) >= 0) {
                console.log("不能改这个");
                return 'duplicated';
            } else {
                console.log("可以改名");
                const tag = this.tagList.filter(item => item.id === id)[0];
                tag.name = name;
                this.saveTags();
                return 'success';
            }
        } else {
            return 'not found';
        }
    },

    saveTags() {
        console.log("保存了tag");
        window.localStorage.setItem(localStorageName, JSON.stringify(this.tagList));
    },
};
tagStore.fetchTags()
export default tagStore;