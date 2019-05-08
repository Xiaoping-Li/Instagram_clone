
import {observable, decorate, action} from 'mobx';

class GlobalStore {
    greet = 'hello';
    changeState = (str) => this.greet = str;
}

decorate(
    GlobalStore,
    {
        greet: observable,
        changeState: action,
    }
);

export default new GlobalStore();