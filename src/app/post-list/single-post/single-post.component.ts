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

  constructor(private postsService: PostsService,
              private route: ActivatedRoute,
              private router: Router) { }

   ngOnInit() {
    this.post = new Post('', '');
    const id = this.route.snapshot.params['id'];
    this.postsService.getSinglePost(+id).then(
      (post: Post) => {
        this.post = post;
      }
    );
  }

  onBack() {
    this.router.navigate(['/posts']);
  }
}
