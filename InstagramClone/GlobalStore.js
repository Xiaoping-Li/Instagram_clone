import { action, observable } from 'mobx';


class GlobalStore {
    // User
    @observable user = {
        username: '',
        email: '',
        thumbnail: '',
        userID: '',
    };

    @action updateUser = (updated) => this.user = updated;

    // Posts
    @observable posts = [];

    @action initPosts = list => this.posts = list;
    @action addPosts = post => this.posts.unshift(post);
    @action deletePost = idx => this.posts.splice(idx, 1);

    // Friends
    @observable friends = [];

    @action initFriends = list => this.friends = list;
    @action addFriends = (friend) => this.friends.unshift(friend);
    @action deleteFriend = idx => this.friends.splice(idx, 1);

    // Requests
    @observable requests = [];
    @action initRequests = list => this.requests = list;
    @action deleteRequest = idx => this.requests.splice(idx, 1);            
}

export default new GlobalStore();



// import {observable, decorate, action} from 'mobx';

// class GlobalStore {
//     user = {
//         username: '',
//         email: '',
//         thumbnail: '',
//         userID: '',
//     };
//     updateUser = (updated) => this.user = updated;

//     // Friends
//     friends = [];
//     initFriends = list => this.friends = list;
//     addFriends = (friend) => this.friends.unshift(friend);
//     deleteFriend = friendID => {
//         let idx;
//         for (let i = 0; i < this.friends.length; i++) {
//             if (friendID === this.friends[i]) idx = i;
//             break;
//         }
//         this.friends.splice(idx, 1);
//     };

//     // Requests
//     requests = [];
//     initRequests = list => this.requests = list;
//     deleteRequest = idx => this.requests.splice(idx, 1);
    
//     // Posts
//     posts = [];
//     initPosts = list => this.posts = list;
//     addPosts = (post) => this.posts.unshift(post);
//     deletePost = idx => this.posts.splice(idx, 1);
// }

// decorate(
//     GlobalStore,
//     {
//         user: observable,
//         friends: observable,
//         posts: observable,
//         requests: observable,
//         updateUser: action,
//         addFriends: action,
//         deleteFriend: action,
//         deleteRequest: action,
//         addPosts: action,
//         deletePost: action,
//     }
// );

// export default new GlobalStore();