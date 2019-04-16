import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  postForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  post: Post;
  postId: number;

  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
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
    this.postId = id;
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ''
    });
  }

  onSaveEditedPost() {
    const title = this.postForm.get('title').value;
    const author = this.postForm.get('author').value;
    const content = this.postForm.get('content').value;
    const newPost = new Post(title, author);
    newPost.content = content;
    newPost.like = this.post.like;
    newPost.dislike = this.post.dislike;
    newPost.date = new Date().getTime();
    if(this.fileUrl && this.fileUrl !== '') {
      newPost.photo = this.fileUrl;
    }
    this.postsService.editPost(newPost, this.postId);
    this.router.navigate(['/posts']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.postsService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onAborted() {
    this.router.navigate(['/posts']);
  }

}
