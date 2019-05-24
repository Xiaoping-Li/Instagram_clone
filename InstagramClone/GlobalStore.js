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
    deleteFriend = id => {
        this.friends = this.friends.filter(friend => friend.id !== id);
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
    addPosts = (post) => this.posts.unshift(post);
    addComment = (id, comment) => {
        const idx = this.posts.findIndex(post => post._id === id);
        this.posts[idx].comments.push(comment);
    };
    deletePost = id => {
        this.posts = this.posts.filter(post => post._id !== id);
    } 

    // ProfileEdit Page Modal visible states
    isVisible = false;
    toggleVisible = () => this.isVisible = !this.isVisible;
}

decorate(
    GlobalStore,
    {
        user: observable,
        friends: observable,
        posts: observable,
        requests: observable,
        isVisible: observable,
        toggleVisible: action,
        updateUser: action,
        initFriends: action, 
        addFriends: action,
        deleteFriend: action,
        initRequests: action,
        deleteRequest: action,
        initPosts: action,
        addPosts: action,
        deletePost: action,
        addComment: action,
    }
);

export default new GlobalStore();