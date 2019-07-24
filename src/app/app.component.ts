import { Component } from '@angular/core';
import { Post } from './posts/post.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  createdPosts: Post[] = [];

  onPostAdded(post: Post) {
    this.createdPosts.push(post);
  }
}
