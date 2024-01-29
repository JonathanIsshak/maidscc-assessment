import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from '../../services/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  searchInput: string = '';

  constructor(private searchService: SearchService) { }

  onInputChange(event: any) {
    this.searchInput = event;
    this.searchService.setKeyword(this.searchInput);
  }

}
