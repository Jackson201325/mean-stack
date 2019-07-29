import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {

  private posts: Post[] = [];
  private message = '';
  private postsUpdate = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) { }

  getPost() {
    this.httpClient
    .get<{message: string, posts: any}>('http://localhost:5000/api/posts')
    .pipe(map((reqData) => {
      return reqData.posts.map((post) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe(updatedData => {
      this.posts = updatedData;
      this.postsUpdate.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title, content};
    this.httpClient.post<{message: string, postId: string}>('http://localhost:5000/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData.postId);
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdate.next([...this.posts]);
    });
  }

  deletePost(postId: string) {
    this.httpClient
      .delete<{message: string}>('http://localhost:5000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPost = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPost;
        this.postsUpdate.next([...this.posts]);
      });
  }
}
