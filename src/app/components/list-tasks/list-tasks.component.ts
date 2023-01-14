import { Component, OnInit } from '@angular/core';
import { LocalRepository } from 'src/app/core/storage/local.repository';
import { ItemModel } from 'src/app/models/item.model';
import { TaskModel } from 'src/app/models/task.model';
import { DataService } from 'src/app/services/data-service/data.service';
import { EventService } from 'src/app/services/event-service/event.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {

  public items: Array<TaskModel> = new Array<TaskModel>()

  constructor(
    private readonly localRepository: LocalRepository,
    private readonly eventService: EventService,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.eventService.on().subscribe(async (item: any) => {
      this.items = await this.localRepository.getUnSecure('data')
    })
  }

  public deleteElement(item: ItemModel) {
    this.dataService.deleteItemToList(item, this.items)
  }

  public deleteGroup(group: string) {
    this.dataService.deleteAllGroupToList(group, this.items)
  }

  public checkItem($e: any, item: ItemModel) {
    item.marked = $e.target.checked
    this.dataService.setMarkedItemToList(item, this.items)
  }
}
