import { ItemModel } from "./item.model";

export class TaskModel {

    public group: string = ''
    public items: Array<ItemModel> = new Array<ItemModel>()

    constructor(item: ItemModel){
        console.log('gg', item)
        this.group = item.group
        this.items.push(item)
    }
}