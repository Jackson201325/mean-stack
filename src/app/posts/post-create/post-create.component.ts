import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
    templateUrl : './post-create.component.html',
    selector: 'app-post-create',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    inputContent = '';
    inputTitle = '';
    @Output() postCreated = new EventEmitter<Post>();

    constructor(public postService: PostsService) {

    }

    onAddPost(postForm: NgForm) {
        if (!postForm.valid) {
            return;
        }
        const post: Post = {
            title:  postForm.form.value.title,
            content: postForm.form.value.content
        };
        this.postCreated.emit(post);

    }
}
