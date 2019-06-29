import { Subject } from 'rxjs';
import { Post } from './post.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts() {
    return[...this.posts];
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
