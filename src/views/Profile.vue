<template>
  <div>
    <div class="page-title">
      <h3>{{'profile_Title' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input 
          id="description" 
          type="text" 
          v-model.trim="name"
          :class="{'invalid': $v.name.$dirty && !$v.name.required}"
        />
        <label for="description">{{'profile_name' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{'profile_message_EnterName' | localize}}
        </small>
      </div>

      <div class="switch">
        <label>
          {{'profile_language_EN' | localize}}
          <input type="checkbox" v-model="isRuLocale"/>
          <span class="lever"></span>
          {{'profile_language_RU' | localize}}
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'profile_update_Button' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required } from '../../node_modules/vuelidate/lib/validators';

export default {
  name: 'Profile',
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  computed: {
    ...mapGetters(['info'])
  },
  validations: {
    name: { required }
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU';
    setTimeout(() => {
      window.M.updateTextFields();
    })
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }      
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        });
      } catch (e){console.log(e);}
    }
  }
}
</script>

<style lang="scss" scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
