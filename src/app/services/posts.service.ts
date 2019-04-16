import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

import { Post } from '../models/post.model';

@Injectable()
export class PostsService {
    
  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();
  
  constructor() {
    this.getPosts();
  }

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data: DataSnapshot) => {
          this.posts = data.val() ? data.val() : [];
          this.emitPosts();
        }
      );
  }

  likePost(post: Post) {
    const postIndex = this.posts.findIndex(
      (postEL) => {
        if(postEL === post) {
          return true;
        }
      }
    );
    //const ref = firebase.database().ref('/posts/' + postIndex + '/likes');
    //ref.transaction(function(currentLikes) {
    //  return (currentLikes || 0) + 1;
    //});
    this.posts.splice(postIndex, 1, post);
    this.savePosts();
    this.emitPosts();
  }

  dislikePost(post: Post) {
    const postIndex = this.posts.findIndex(
      (postEL) => {
        if(postEL === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndex, 1, post);
    this.savePosts();
    this.emitPosts();
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post) {
    if(post.photo) {
      const storageRef = firebase.storage().refFromURL(post.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const postIndexToRemove = this.posts.findIndex(
      (postEL) => {
        if(postEL === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  removeAll() {
    this.posts.splice(0, this.posts.length)
    this.savePosts();
    this.emitPosts();
  }

  editPost(newPost: Post, postId: number) {
    this.posts.splice(postId, 1, newPost);
    this.savePosts();
    this.emitPosts();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

}
