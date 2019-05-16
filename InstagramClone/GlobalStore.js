
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
    addRequests = request => this.requests.push(request);
    updateRequests = (senderID, recipientID) => {
        for (let i = 0; i < this.requests.length; i++) {
            if (this.requests[i].sender === senderID && this.requests[i].recipient === recipientID) this.requests[i].status = 'Friends';
            return;
        }
    };
    deleteRequest = (senderID, recipientID) => {
        let idx;
        for (let i = 0; i < this.requests.length; i++) {
            if (this.requests[i].sender === senderID && this.requests[i].recipient === recipientID) idx = i;
            break;   
        }
        this.requests.splice(idx, 1);
    }

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
        addPosts: action,
        addRequests: action,
        updateRequests: action,
        deleteRequest: action,
    }
);

export default new GlobalStore();