import { Component, EventEmitter, Output } from '@angular/core';
import { style } from '@angular/animations';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  enteredTitle = '';
  enteredValue = '';
  @Output() postCreated = new EventEmitter();

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      title : form.value.title,
      content : form.value.content
    };
    this.postCreated.emit(post);
  }
}


