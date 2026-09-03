import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentComponent } from './equipment.component';


@NgModule({
  declarations: [EquipmentComponent],
  imports: [
    CommonModule,
    SharedModule,
    EquipmentRoutingModule
  ]
})
export class EquipmentModule { }

