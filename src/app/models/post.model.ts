export class Post {
    photo: string;
    content: string;
    like: number;
    dislike: number;
    date: any;
    constructor(public title: string, public author: string) {
    }
  }