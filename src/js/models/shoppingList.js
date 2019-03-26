import uniqid from 'uniqid';

export default  class List{
    constructor()
    {
        this.list=[];
    }
    addListItem(count,unit,ingredient)
    {
        const item={
            id:uniqid(),
            count,
            unit,
            ingredient
        }
        this.list.push(item);
        return item;
    }
    deleteListItem(id)
    {
        let index=this.list.findIndex(e=>e.id===id);
        this.list.splice(index,1);
    }
    updateCount(id,newCount)
    {
        this.list.find(e=>e.id===id).count=newCount;
    }
}