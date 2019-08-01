import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  post: Post;
  private posts: Post[] = [];
  private postsUpdate = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) { }

  getPost() {
    this.httpClient
      .get<{ message: string, posts: any }>('http://localhost:5000/api/posts')
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

  showPost(postId: string) {
    // console.log(this.posts);
    // return this.httpClient.get<{ message: string, post: Post }>(`http://localhost:5000/api/posts/${postId}`)
    // this.httpClient
    //   .get<{ message: string, post: {_id: string, title: string, content: string} }>('http://localhost:5000/api/posts/' + postId)
    //   .subscribe((document) => {
    //     console.log(document)
    //     this.post.id = document.post._id;
    //     this.post.title = document.post.title;
    //     this.post.content = document.post.content;
    //   });
    // return {...this.posts.find(post => post.id === postId)};
    this.httpClient.get('http://localhost:5000/api/posts/' + postId)
      .subscribe(response => {
        console.log(response);
      });
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title, content };
    this.httpClient.post<{ message: string, postId: string }>('http://localhost:5000/api/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        this.post.id = id;
        this.posts.push(this.post);
        this.postsUpdate.next([...this.posts]);
      });
  }

  putPost(id: string, title: string, content: string) {
    const post: Post = { id, title, content };
    this.httpClient
      .put('http://localhost:5000/api/posts/' + id, post)
      .subscribe(data => {
        const updatedPost = [...this.posts];
        const oldPostIndex = updatedPost.findIndex(p => p.id === id);
        updatedPost[oldPostIndex] = post;
        this.posts = updatedPost;
        this.postsUpdate.next([...this.posts]);
      }, error => {
        console.log(error);
      });
  }


  deletePost(postId: string) {
    this.httpClient
      .delete<{ message: string }>('http://localhost:5000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Hello');
        const updatedPost = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPost;
        this.postsUpdate.next([...this.posts]);
      });
  }
}
