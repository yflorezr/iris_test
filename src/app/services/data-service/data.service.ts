import { Injectable } from '@angular/core';
import { LocalRepository } from 'src/app/core/storage/local.repository';
import { ItemModel } from 'src/app/models/item.model';
import { TaskModel } from 'src/app/models/task.model';
import { EventService } from '../event-service/event.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private readonly localRepository: LocalRepository,
    private readonly eventService: EventService
  ) {}

  public async addItemToList(item: ItemModel, data: Array<TaskModel>) {
    if (data.length > 0) {
      const groupFind: Array<TaskModel> = data.filter(element => (element.group === item.group))
      if (groupFind.length === 1) {
        const itemsFind: Array<ItemModel> = groupFind[0].items.filter(element => (element.name === item.name))
        if (itemsFind.length > 0) {

        } else {
          groupFind[0].items.push(item)
        }
      } else {
        data.push(new TaskModel(item))
      }
    } else {
      data.push(new TaskModel(item))
    }
    await this.localRepository.setUnSecure('data', data)
    this.eventService.emit()
  }

  public async deleteItemToList(item: ItemModel, data: Array<TaskModel>) {
    if (data.length > 0) {
      const groupFind: Array<TaskModel> = data.filter(element => (element.group === item.group))
      if (groupFind.length === 1) {
        if (groupFind[0].items.length > 0) {
          groupFind[0].items = groupFind[0].items.filter(element => (element.name !== item.name))
        } 
        if ( groupFind[0].items.length === 0) {
          data = data.filter(element => (element.group !== item.group))
        }
      }
    }
    await this.localRepository.setUnSecure('data', data)
    this.eventService.emit()
  }

  public async setMarkedItemToList(item: ItemModel, data: Array<TaskModel>) {
    if (data.length > 0) {
      const groupFind: Array<TaskModel> = data.filter(element => (element.group === item.group))
      if (groupFind.length === 1) {
        const itemsFind: Array<ItemModel> = groupFind[0].items.filter(element => (element.name === item.name))
        if (itemsFind.length === 1) {
          itemsFind[0] = item
        }
      }
    }
    await this.localRepository.setUnSecure('data', data)
    this.eventService.emit()
  }

  public async deleteAllGroupToList(group: string, data: Array<TaskModel>) {
    if (data.length > 0) {
      data = data.filter(element => (element.group !== group))
    }
    await this.localRepository.setUnSecure('data', data)
    this.eventService.emit()
  }
}
