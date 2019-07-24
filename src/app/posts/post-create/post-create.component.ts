import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from '../post.module';
import { NgForm } from '@angular/forms';

@Component({
    templateUrl : './post-create.component.html',
    selector: 'app-post-create',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    inputContent = '';
    inputTitle = '';
    @Output() postCreated = new EventEmitter<Post>();

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
