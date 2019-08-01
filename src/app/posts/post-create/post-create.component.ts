import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
    templateUrl: './post-create.component.html',
    selector: 'app-post-create',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    inputContent = '';
    inputTitle = '';
    post: Post;
    private mode = 'create';
    private postId: string;
    updatedPost: Post;

    constructor(public postService: PostsService, public route: ActivatedRoute) { }

    // ngOnInit() {
    //     this.route.paramMap.subscribe(async (paramsMap: ParamMap) => {
    //         if (paramsMap.has('id')) {
    //             this.mode = 'edit';
    //             this.postId = paramsMap.get('id');
    //             // this.post = this.postService.showPost(this.postId);
    //             try {
    //                 const postTemp = await this.postService.showPost(this.postId);
    //                 this.post = postTemp.post;
    //             } catch (e) {
    //                 console.log(e);
    //             }
    //         } else {
    //             this.mode = 'create';
    //             this.postId = null;
    //         }
    //     });
    // }
    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.mode = 'edit';
                this.postId = paramMap.get('id');
                this.post = this.postService.showPost(this.postId);
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        })
    }
    onSavePost(postForm: NgForm) {
        if (!postForm.valid) {
            return;
        }
        if (this.mode === 'create') {
            this.postService.addPost(postForm.form.value.title, postForm.form.value.content);
            postForm.resetForm();
        } else {
            this.postService.putPost(this.postId, postForm.form.value.title, postForm.form.value.content);
        }
    }
}
