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
        this.posts[idx].comments.unshift(comment);
    };
    deletePost = postID => {
        this.posts = this.posts.filter(post => post._id !== postID);
        this.likes = this.likes.filter(post => post._id !== postID);   
    };

    // ProfileEdit Page Modal visible states
    isVisible = false;
    toggleVisible = () => this.isVisible = !this.isVisible;

    // likes
    likes = [];
    initLikes = list => this.likes = list;
    addLike = (like, postID, userID) => {
        this.likes.unshift(like);
        const idx = this.posts.findIndex(post => post._id === postID);
        this.posts[idx].likes.push(userID);
    };
    removeLike = (postID, userID) => {
        this.likes = this.likes.filter(post => post._id !== postID);
        const idx = this.posts.findIndex(post => post._id === postID);
        this.posts[idx].likes = this.posts[idx].likes.filter(id => id !== userID);
    };
}

decorate(
    GlobalStore,
    {
        user: observable,
        friends: observable,
        posts: observable,
        requests: observable,
        isVisible: observable,
        likes: observable,
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
        initLikes: action,
        addLike: action,
        removeLike: action,
    }
);

export default new GlobalStore();