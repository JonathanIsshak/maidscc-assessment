import { Injectable } from '@angular/core';
import { UsersData } from '../models/users-data.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();
  public cache$ = new BehaviorSubject<any>({} as UsersData);



  constructor() { }

  set(key: string, value: any, isUserDetails: boolean = false) {
    console.log('setting cache', key, value);
    if (isUserDetails) key = `user${key}`;
    if (this.cache.has(key)) {
      throw new Error(`Key ${key} already exists in cache.`);
    }
    this.cache.set(key, value);
    this.cache$.next(this.cache.get(key));
  }

  get(key: string): any {
    const data = this.cache.get(key) ?? this.cache.get(`user${key}`);
    this.cache$.next(data);
    console.log("data", data)
    return data!;
  }

  delete(key: string) {
    this.cache.delete(key);
    this.cache$.next(undefined);
  }
}
