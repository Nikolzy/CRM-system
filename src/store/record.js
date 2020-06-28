import firebase from '../../../node_modules/firebase/app';

export default {
    actions: {
        async createRecord({ commit, dispatch }, record) {
            try {
                const uid = await dispatch('getUid');
                return await firebase.database().ref(`/users/${uid}/records`).push(record);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async fetchRecords({ commit, dispatch }) {
            try {
                const uid = await dispatch('getUid');
                const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};
                return Object.keys(records).map(id => ({...records[id], id }));
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async fetchRecordById({ commit, dispatch }, id) {
            try {
                const uid = await dispatch('getUid');
                const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {};
                return {...record, id }
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    }
}