import { CacheService } from './../../services/cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatIconModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  userId: number;
  userData: User | undefined;
  isLoading: boolean = true;

  constructor(private usersService: UsersService, private cacheService: CacheService, private route: ActivatedRoute, private router: Router) {
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.isLoading = true;
    const cachedData = this.cacheService.get(`user${this.userId}`);

    if (cachedData) {
      this.userData = cachedData.data;
      this.isLoading = false;
    }
    else {
      this.usersService.getUserDetails(this.userId).subscribe(
        (data: any) => {
          try {
            this.userData = data.data;
            this.cacheService.set(this.userId.toString(), data, true);
            this.isLoading = false;
          } catch (error) {
            console.log(error);
            this.isLoading = false;
          }
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
