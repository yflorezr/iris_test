import { Component, OnInit } from '@angular/core';
import { LocalRepository } from 'src/app/core/storage/local.repository';
import { groupModel } from 'src/app/models/group.model';
import { ItemModel } from 'src/app/models/item.model';
import { TaskModel } from 'src/app/models/task.model';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  
  public groups: Array<groupModel> = new Array<groupModel>()
  public item: ItemModel = new ItemModel()
  public tasks: Array<TaskModel> = new Array<TaskModel>()

  constructor(
    private readonly localRepository: LocalRepository,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
     //Se inicializan las categorias manualmente (por efecto de realizar la prueba de iris) pero deberían ser recogidas de un servicio
     this.groups.push(new groupModel('All'))
     this.groups.push(new groupModel('Movies'))
     this.groups.push(new groupModel('Music'))
     this.groups.push(new groupModel('Other'))
     //Inicializamos el select con el primer elemento de la lista
     this.item.group = this.groups[0].name
  }

  public async addNewItem() {
    let data = await this.localRepository.getUnSecure('data')
    if (!data) {
      data = new Array<TaskModel>()
    } 
    this.dataService.addItemToList(this.item, data)    
  }
}
