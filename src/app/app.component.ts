import { Component, OnInit } from '@angular/core';
import { PostService } from './services/post.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  postlist: any[];

  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.postlist = this.postService.postlist;
  }
  
  onAddPost() {
    this.postService.addPost();
  }
}
