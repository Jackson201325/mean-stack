import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {

  private posts: Post[] = [];
  private message = '';
  private postsUpdate = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) { }

  getPost() {
    this.httpClient.get<{message: string, posts: Post[]}>('http://localhost:5000/api/posts')
      .subscribe((reqData: { message: string, posts: Post[]; }) => {
        this.posts = reqData.posts;
        this.message = reqData.message;
        console.log(this.posts);
        console.log(this.message);
        this.postsUpdate.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title, content};
    this.httpClient.post('http://localhost:5000/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData);
      this.posts.push(post);
      this.postsUpdate.next([...this.posts]);
    });
  }
}
