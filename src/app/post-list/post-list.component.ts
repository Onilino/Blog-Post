import { Component, OnDestroy, OnInit } from '@angular/core';

import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  postsSubscription: Subscription;
  isActing = false;

  constructor(private postsService: PostsService,
              private router: Router) {}

  ngOnInit() {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.emitPosts();
  }

  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }

  onDeletePost(post: Post) {
    if(confirm("Voulez-vous supprimer définitivement ce post?"))
      this.postsService.removePost(post);
  }

  onViewPost(id: number) {
    this.router.navigate(['/posts', 'view', id]);
  }
  
  onLikePost(post: Post) {
    this.isActing = true;
    post.like++;
    this.postsService.likePost(post);
    this.isActing = false;
  }

  onDislikePost(post: Post) {
    this.isActing = true;
    post.dislike++;
    this.postsService.dislikePost(post);
    this.isActing = false;
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
