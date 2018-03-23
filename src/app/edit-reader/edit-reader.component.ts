import { Component, OnInit } from '@angular/core';
import { Reader } from '../models/reader';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../core/data.service';
import { BadgeService } from '../services/badge-service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styleUrls: ['./edit-reader.component.css']
})
export class EditReaderComponent implements OnInit {
  selectedReader: Reader;
  currentBadge: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private badgeService: BadgeService) { }

  ngOnInit() {
  //  const readerID: number = parseInt(this.route.snapshot.params['id']);
    const readerID: number = +this.route.snapshot.params['id'];
    this.selectedReader = this.dataService.getReaderById(readerID);
    this.currentBadge = this.badgeService.getReaderBadge(this.selectedReader.totalMinutesRead);
  }
  saveChanges() {
    console.warn('Save reader not yet implemented.');
    this.router.navigate(['/dashboard']);
  }
}
