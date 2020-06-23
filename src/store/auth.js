import firebase from "../../../node_modules/firebase/app";

export default {
    actions: {
        async login({ dispatch, commit }, { email, password }) {
            try {
                console.log(dispatch, commit);
                await firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
                console.log(e);
                throw e;
            }
        }
    }
};