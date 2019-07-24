import { Component, Input } from '@angular/core';
import { Post } from '../post.module';
@Component({
    templateUrl: './post-list.component.html',
    selector: 'app-post-list',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
    // posts = [
    //     {title: 'First post', content: 'This is the first post'},
    //     {title: 'Second post', content: 'This is the Second post'},
    //     {title: 'Third post', content: 'This is the Third post'},
    // ];
    @Input() posts: Post[] = [];
}
