import { Component, OnInit } from '@angular/core';
import { buttons } from 'src/app/shared/interfaces/buttons-guard-interface';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
@Component({
  selector: 'app-access-rules',
  templateUrl: './access-rules.component.html',
  styleUrls: ['./access-rules.component.scss']
})
export class AccessRulesComponent implements OnInit {
  
  constructor(public share:SharedDataService) { }

  ngOnInit(): void {
  }

  
 
}
