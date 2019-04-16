import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  post: Post;
  id: number;

  constructor(private postsService: PostsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.post = new Post('', '');
    const id = this.route.snapshot.params['id'];
    this.postsService.getSinglePost(+id).then(
      (post: Post) => {
        this.post = post;
        this.id = id;
      }
    );
  }

  onDeletePostFromSingle() {
    if(confirm("Voulez-vous supprimer définitivement ce post?")) {
      this.postsService.removePostFromSingle(this.post, this.id);
      this.router.navigate(['/posts']);
    }
  }

  onLikePostFromSingle() {
    this.post.like++;
    this.postsService.likePostFromSingle(this.post, this.id);
  }

  onDislikePostFromSingle() {
    this.post.dislike++;
    this.postsService.dislikePostFromSingle(this.post, this.id);
  }

  onEditPost(id: number) {
    this.router.navigate(['/posts', 'edit', id]);
  }

  onBack() {
    this.router.navigate(['/posts']);
  }

}
