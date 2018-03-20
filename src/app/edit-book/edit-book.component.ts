import { OldBook } from './../models/oldBook';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { DataService } from '../core/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  selectedBook: Book;

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // let bookID: number = +this.route.snapshot.params['id'];
    // this.dataService.getBookById(bookID)
    //   .subscribe(
    //     (data: Book) => this.selectedBook = data,
    //     (err: any) => console.log(err),
    //     () => console.log('got book by id')
    //   );
    // const id = +this.route.snapshot.params['bookID'];
    // console.log(id, 'is the id hhh');
    // this.getBook(id);
    const bookID: number = +this.route.snapshot.params['id'];
    console.log(bookID, 'is the id hhh');
     this.getBook(bookID);
     this.getOldBook(bookID);
  }

  getBook(id: number) {
    return this.dataService.getBookById(id)
      .subscribe(
        (data: Book) => this.selectedBook = data,
        (err: any) => console.log(err),
        () => console.log('got book by id')
      );
  }
  getOldBook(id: number) {
    return this.dataService.getOldBookById(id)
      .subscribe(
        (data: OldBook) => console.log( `Old Book Title: ${data.bookTitle}`)
      );
  }
  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }
  saveChanges() {
    return this.dataService.updateBook(this.selectedBook)
      .subscribe(
        (data: void) => console.log(`${this.selectedBook.title} updated successfully`),
        (err: any) => console.log(err)
      );
  }
}
// saveChanges(): void {
//   this.dataService.updateBook(this.selectedBook)
//     .subscribe(
//       (data: void) => console.log(`${this.selectedBook.title} updated successfully.`),
//       (err: any) => console.log(err)
//     );
// }
