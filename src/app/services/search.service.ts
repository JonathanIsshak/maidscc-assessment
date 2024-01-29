import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private keywordSubject = new BehaviorSubject<string>('');
  keyword$ = this.keywordSubject.asObservable();

  setKeyword(keyword: string) {
    this.keywordSubject.next(keyword);
  }

  getKeyword() {
    return this.keyword$;
  }
}
