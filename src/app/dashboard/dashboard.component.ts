import { DataService } from './../core/data.service';
import { Component, OnInit, VERSION } from '@angular/core';
import { Book } from '../models/book';
import { Reader } from '../models/reader';
import { Title } from '@angular/platform-browser';
import { BookTrackerError } from '../models/bookTrackerError';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private title: Title) { }

  ngOnInit() {
    // get books with resolvers
    let resolvedData: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];
    if (resolvedData instanceof BookTrackerError) {
      console.log(`Dashboard component error: ${resolvedData.friendlyMessage}`);
    } else {
      this.allBooks = resolvedData;
    }


   // this.getBooks();
    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker ${VERSION.full}`);
  }
  // getBooks() {
  //   this.dataService.getAllBooks()
  //     .subscribe(
  //       (data) => this.allBooks = data,
  //      (err: BookTrackerError) => console.log(err.friendlyMessage)
  //     );
  // }
  deleteBook(id: number) {
    this.dataService.deleteBook(id)
      .subscribe(
        (data: void) => {
          let index: number = this.allBooks.findIndex(book =>
          book.bookID === id);
          this.allBooks.splice(index);
        },
        (err) => console.log(err)
      );
  }
}
