import { Component } from '@angular/core';
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

    constructor(public postService: PostsService) {

    }

    onAddPost(postForm: NgForm) {
        if (!postForm.valid) {
            return;
        }
        this.postService.addPost(postForm.form.value.title, postForm.form.value.content);
        postForm.resetForm();
    }
}
