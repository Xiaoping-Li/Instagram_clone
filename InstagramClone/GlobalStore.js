// import { action, observable } from 'mobx';

// class GlobalStore {
//     // User
//     @observable user = {
//         username: '',
//         email: '',
//         thumbnail: '',
//         userID: '',
//     };

//     @action updateUser = (updated) => this.user = updated;

//     // Posts
//     @observable posts = [];

//     @action initPosts = list => this.posts = list;
//     @action addPosts = post => this.posts.unshift(post);
//     @action deletePost = idx => this.posts = this.posts.filter((item, i) => i !== idx);

//     // Friends
//     @observable friends = [];

//     @action initFriends = list => this.friends = list;
//     @action addFriends = (friend) => this.friends.unshift(friend);
//     @action deleteFriend = idx => this.friends.filter((item, i) => i !== idx);

//     // Requests
//     @observable requests = [];
//     @action initRequests = list => this.requests = list;
//     @action deleteRequest = idx => this.requests.filter((item, i) => i !== idx);           
// }

// export default new GlobalStore();



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
    addFriends = (friend) => this.friends.push(friend);
    deleteFriend = idx => {
        this.friends = this.friends.filter((item, i) => i !== idx);
    };

    // Requests
    requests = [];
    initRequests = list => this.requests = list;
    deleteRequest = id => {
        this.requests = this.requests.filter(request => request._id !== id);
    };
    
    // Posts
    posts = [];
    initPosts = list => this.posts = list;
    addPosts = (post) => this.posts.push(post);
    deletePost = id => {
        this.posts = this.posts.filter(post => post._id !== id);
    } 
}

decorate(
    GlobalStore,
    {
        user: observable,
        friends: observable,
        posts: observable,
        requests: observable,
        updateUser: action,
        initFriends: action, 
        addFriends: action,
        deleteFriend: action,
        initRequests: action,
        deleteRequest: action,
        initPosts: action,
        addPosts: action,
        deletePost: action,
    }
);

export default new GlobalStore();