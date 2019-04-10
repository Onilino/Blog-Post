import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../services/post.service'

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  @Input() post: {
    id: number,
    title: String,
    content: String,
    like: number,
    unlike: number,
    created_at: Date
  };
  @Input() index: number;

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  onLike() {
    this.post.like++;
  }
  onUnlike() {
    this.post.unlike++;
  }
  
  onDeletePost() {
    this.postService.deletePost(this.index);
  }
}
