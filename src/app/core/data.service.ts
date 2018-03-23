
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, map, catchError } from 'rxjs/operators';
import {ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { OldBook } from './../models/oldBook';
import { Book } from '../models/book';
import { Reader } from '../models/reader';
import { allBooks, allReaders } from './../data';
import { BookTrackerError } from '../models/bookTrackerError';



@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

mostPopularBook: Book = allBooks[0];
setMostPopularBook(popularBook: Book): void {
  this.mostPopularBook = popularBook;
}

getAllReaders(): Reader[] {
  return allReaders;
}
getReaderById(id: number): Reader {
  return allReaders.find(reader => reader.readerID === id);
}
getAllBooks(): Observable<Book[] | BookTrackerError>  {
  console.log('Getting all books from the server.');
  return this.http.get<Book[]>('/api/books')
    .pipe(
      catchError( err => this.handleHttpError(err))
    );
}
private handleHttpError(error: HttpErrorResponse): Observable<BookTrackerError> {
  let dataError = new BookTrackerError();
  dataError.errorNumber = 100;
  dataError.message = error.statusText;
  dataError.friendlyMessage = 'An error occured retrieving data';
  return ErrorObservable.create(dataError);
}
getBookById(id: number): Observable<Book> {
  const getHeaders: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': 'my-token'
  });
  return this.http.get<Book>(`/api/books/${id}`, {
    headers: getHeaders
  });
}
getOldBookById(id: number): Observable<OldBook> {
  return this.http.get<Book>(`/api/books/${id}`)
    .pipe(
      map(b => <OldBook> {
        bookTitle: b.title,
        year: b.publicationYear
      }),
      tap(classicBook => console.log(classicBook))
    );
}
addBook(newBook: Book): Observable<Book>  {
  const getHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  // newBook will be added to books
  return this.http.post<Book>('/api/books', newBook, {
    headers: getHeaders
  });
}
updateBook(updatedBook: Book): Observable<void> {
  const getHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  // nothing is returned in the body of http response so return type is void. add id at the end of url to be updated
  return this.http.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, {
    headers: getHeaders
  });
}
deleteBook(id: number): Observable<void> {
  // pass id of book to be deleted
  // nothing is returned in the body of http response for delete
  return this.http.delete<void>(`/api/books/${id}`);
}
}
