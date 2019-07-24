import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

@Injectable({providedIn: 'root'})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdate = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) { }

  getPost() {
    this.httpClient.get<{message: string, posts: Post[]}>('http://localhost:5000/api/posts')
      .subscribe((reqData: { posts: Post[]; }) => {
        this.posts = reqData.posts;
        console.log(this.posts);
        this.postsUpdate.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title, content};
    this.posts.push(post);
    this.postsUpdate.next([...this.posts]);
  }
}
