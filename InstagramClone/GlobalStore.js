
import {observable, decorate, action} from 'mobx';

class GlobalStore {
    user = {
        username: '',
        email: '',
        thumbnail: '',
        userID: '',
    };
    updateUser = (updated) => this.user = updated;

    // Friends
    friends = [];
    initFriends = list => this.friends = list;
    addFriends = (friend) => this.friends.unshift(friend);
    deleteFriend = friendID => {
        let idx;
        for (let i = 0; i < this.friends.length; i++) {
            if (friendID === this.friends[i]) idx = i;
            break;
        }
        this.friends.splice(idx, 1);
    };

    // Requests
    requests = [];
    initRequests = list => this.requests = list;
    deleteRequest = idx => this.requests.splice(idx, 1);
    
    // Posts
    posts = [];
    initPosts = list => this.posts = list;
    addPosts = (post) => this.posts.unshift(post);
    deletePost = idx => this.posts.splice(idx, 1);
}

decorate(
    GlobalStore,
    {
        user: observable,
        friends: observable,
        posts: observable,
        requests: observable,
        updateUser: action,
        addFriends: action,
        deleteFriend: action,
        deleteRequest: action,
        addPosts: action,
        deletePost: action,
    }
);

export default new GlobalStore();