import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ''
    });
  }
  
  onSavePost() {
    const title = this.postForm.get('title').value;
    const author = this.postForm.get('author').value;
    const content = this.postForm.get('content').value;
    const newPost = new Post(title, author);
    newPost.content = content;
    newPost.like = 0;
    newPost.dislike = 0;
    if(this.fileUrl && this.fileUrl !== '') {
      newPost.photo = this.fileUrl;
    }
    this.postsService.createNewPost(newPost);
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
  
}
