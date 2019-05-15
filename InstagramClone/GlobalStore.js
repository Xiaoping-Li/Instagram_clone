
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
    updateRequests = (senderID, recipientID) => {
        for (let i = 0; i < this.requests.length; i++) {
            if (this.requests[i].sender === senderID && this.requests[i].recipient === recipientID) {
                this.requests[i].status = 'Friends';
                return;
            }
        }
    };

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