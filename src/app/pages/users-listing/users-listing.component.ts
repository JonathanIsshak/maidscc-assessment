import { CacheService } from './../../services/cache.service';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { UsersData } from '../../models/users-data.interface';
import { BehaviorSubject, Observable, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-users-listing',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, RouterModule, FilterPipe],
  templateUrl: './users-listing.component.html',
  styleUrl: './users-listing.component.scss'
})
export class UsersListingComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: any;

  searchKeyword: string = '';
  usersData: UsersData | undefined;
  isLoadingResults: boolean = true;
  displayedColumns: string[] = ['avatar', 'first_name', 'last_name', 'email'];
  page$ = new BehaviorSubject<number>(1);
  usersData$: Observable<UsersData> = new Observable<UsersData>();
  destroyed$ = new Subject<void>();
  private cacheSubscribtion: Subscription = new Subscription();

  constructor(private usersService: UsersService, private cacheService: CacheService, private searchService: SearchService) { }

  ngOnInit() {
    this.page$.pipe(
      takeUntil(this.destroyed$),
      switchMap(async (page) => this.getUsersData(page)));

    this.getUsersData(this.page$.value);

    this.searchService.keyword$.subscribe(data => {
      this.searchKeyword = data;
      console.log(this.searchKeyword);
    });
  }


  getUsersData(page: number) {
    this.isLoadingResults = true;
    const cachedData = this.cacheService.get(page.toString());

    if (cachedData) {
      this.usersData = cachedData;
      this.isLoadingResults = false;
    }
    else {
      this.usersService.getUsers(page).subscribe(
        (data) => {
          try {
            this.cacheService.set(page.toString(), data);
            this.usersData = data;
            this.isLoadingResults = false;
          } catch (error) {
            console.log(error);
            this.isLoadingResults = false;
          }
        }
      );
    }
  }


  ngOnDestroy() {
    this.destroyed$.next();
  }

  onPageChange(page: number) {
    this.getUsersData(page);
    this.page$.next(page);
  }

  print(any: any) {
    console.log(any);
  }
}
