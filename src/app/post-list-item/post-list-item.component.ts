import { Component, Input, OnInit } from '@angular/core';
import { SafeScript } from '@angular/platform-browser';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  @Input() postName: string;
  @Input() postContent: string;
  @Input() postLike: number;
  @Input() postLove: number;
  @Input() postDLove: number;
  @Input() postDate: Date;
  
  constructor() { }

  ngOnInit() {
  }

  onLike() {
    this.postLove++;
    this.postLike++;
  }
  onDLike() {
    this.postDLove++;
    this.postLike--;
  }
  onIsLoved() {
    if (this.postLike > 0)
      return 'Loved';
    else if (this.postLike === 0)
      return 'Neutral'
    else
      return 'DLoved';
  }
}
