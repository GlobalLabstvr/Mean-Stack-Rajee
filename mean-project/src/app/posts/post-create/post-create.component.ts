import { Component, EventEmitter, Output } from '@angular/core';
import { style } from '@angular/animations';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  enteredTitle = '';
  enteredValue = '';
  @Output() postCreated = new EventEmitter();

  onAddPost() {
    const post: Post = {
      title : this.enteredTitle,
      content : this.enteredValue
    };
    this.postCreated.emit(post);
  }
}


