export class Commenter {
  constructor(initials) {
    this.name = initials.name;
    this.slug = initials.slug;
    this.avatar = initials.avatar;
  }
}

export class Comment {
  constructor(initials) {
    /** @type {Commenter} */
    this.person = initials.person;

    /** @type {string} */
    this.content = initials.content;
  }
}


export class InteractionsCollection {
  constructor(initials) {
    /** @type {number} */
    this.likes = initials.likes;

    /** @type {Comment[]} */
    this.comments = initials.comments.map(comment => new Comment(comment));
  }
}


export default class Video {
  constructor(initials) {
    this.id = initials.id;
    this.slug = initials.slug;
    this.title = initials.title;
    this.file = initials.file;
    this.isPublic = initials.isPublic;
    this.isActive = initials.isActive;
    this.createdAt = initials.createdAt;
    this.updatedAt = initials.updatedAt;
    this.authorId = initials.author_id;
    this.thumbnail = initials.thumbnail;

    /** @type {InteractionsCollection[]} */
    this.interactions = initials.interactions;
  }
}
