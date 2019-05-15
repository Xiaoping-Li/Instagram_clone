
import {observable, decorate, action} from 'mobx';

class GlobalStore {
    user = {
        username: '',
        email: '',
        thumbnail: '',
        userID: '',
    };
    updateUser = (updated) => this.user = updated;

    friends = [];
    initFriends = list => this.friends = list;
    updateFriends = (friend) => this.friends.unshift(friend);

    requests = [];
    initRequests = list => this.requests = list;
    addRequests = request => this.requests.push(request);

    posts = [];
    initPosts = list => this.posts = list;
    updatePosts = (post) => this.posts.unshift(post);
}

decorate(
    GlobalStore,
    {
        user: observable,
        friends: observable,
        posts: observable,
        requests: observable,
        updateUser: action,
        updateFriends: action,
        updatePosts: action,
        addRequests: action,
    }
);

export default new GlobalStore();