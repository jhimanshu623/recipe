export default class Likes{
    constructor()
    {
        this.likes=[];
    }
    addLike(id,title,author,image)
    {
        const item={
            id,
            title,
            author,
            image
        }
        this.likes.push(item);
        this.persistLikes();
        return item;
    }
    deleteLike(id)
    {
        let index=this.likes.findIndex(e=>e.id===id);
        this.likes.splice(index,1);
        this.persistLikes();
    }
    isLiked(id)
    {
        return (this.likes.findIndex(e=>e.id==id) !== -1);
    }
    getNumLikes()
    {
        return this.likes.length;
    }
    persistLikes()
    {
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }
    getStorage()
    {
        const storedLikes=localStorage.getItem('likes');
        this.likes=JSON.parse(storedLikes);
    }
}