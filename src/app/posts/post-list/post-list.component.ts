import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
@Component({
    templateUrl: './post-list.component.html',
    selector: 'app-post-list',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    // posts = [
    //     {title: 'First post', content: 'This is the first post'},
    //     {title: 'Second post', content: 'This is the Second post'},
    //     {title: 'Third post', content: 'This is the Third post'},
    // ];

    posts: Post[] = [];
    postsSub = new Subscription();
    constructor(public postService: PostsService) {

    }

    ngOnInit() {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        this.postService.getPost();
        this.postsSub = this.postService.getPostUpdateListener()
          .subscribe((posts: Post[]) => {
            this.posts = posts;
        });
    }

    onDelete(postId: string) {
        this.postService.deletePost(postId);
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}
