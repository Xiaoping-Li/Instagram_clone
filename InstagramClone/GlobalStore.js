
import {observable, decorate, action} from 'mobx';

class GlobalStore {
    // greet = 'hello';
    // changeState = (str) => this.greet = str;
    user = {
        username: '',
        email: '',
        thumbnail: '',
    };
    updateUser = (updated) => this.user = updated;

    friends = [];
    updateFriends = (friend) => this.friends.unshift(friend);

    posts = [];
    updatePosts = (post) => this.posts.unshift(post);
}

decorate(
    GlobalStore,
    {
        // greet: observable,
        // changeState: action,
        user: observable,
        friends: observable,
        posts: observable,
        updateUser: action,
        updateFriends: action,
        updatePosts: action,
    }
);

export default new GlobalStore();