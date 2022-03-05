import Item from "@/types/Item";


class ItemDataService {
    private list: Array<Item> =[];
    private counter=1;

    makeCopy(obj:any): any {
        return JSON.parse(JSON.stringify(obj));
    }
    getAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({data:this.makeCopy(this.list)});
        });
    }

    get(id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({data:this.makeCopy(this.list.find(e=>e.item_id===id))});
        })
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            data.item_id=this.counter++;
            this.list.push(data);
            resolve({data:this.makeCopy(data)});
        })
    }

    update(id: any, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const idx=this.list.findIndex(e=>e.item_id===id);
            this.list[idx]=data;
            resolve({data:this.makeCopy(data)});
        })
    }

    delete(id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const idx=this.list.findIndex(e=>e.item_id===id);
            const removed=this.list.splice(idx, 1);
            resolve({data:removed});
        })
    }

}

export default new ItemDataService();