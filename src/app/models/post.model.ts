export class Post {
    photo: string;
    content: string;
    like: number;
    dislike: number;
    constructor(public title: string, public author: string) {
    }
  }