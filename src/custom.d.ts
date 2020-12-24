type RootState = {
    markList: Mark[],
    tagList: Tag[],
    currentTag?: Tag
}
type Mark = {
    tags: string[];
    notes: string;
    type: string;
    sum: number;
    createdAt?: string;
}
type Tag = {
    id: string;
    name: string
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated'    //success表示成功,duplicated表示重复
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    save: () => void
    remove: (id: string) => boolean
}

interface Window {


}