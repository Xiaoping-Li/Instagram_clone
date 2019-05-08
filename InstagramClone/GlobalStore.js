
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
    initFriends = list => this.friends = list;
    updateFriends = (friend) => this.friends.unshift(friend);

    posts = [];
    initPosts = list => this.posts = list;
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