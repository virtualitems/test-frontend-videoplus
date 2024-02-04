export default class Person {
  constructor(initials) {
    this.id = initials.id;
    this.slug = initials.slug;
    this.name = initials.name;
    this.birthdate = initials.birthdate;
    this.isActive = initials.isActive;
    this.avatar = initials.avatar;
    this.createdAt = initials.createdAt;
    this.updatedAt = initials.updatedAt;
  }
};
