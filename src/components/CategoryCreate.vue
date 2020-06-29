<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'category_create_title' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input i
            d="name" 
            type="text" 
            v-model="title"
            :class="{'invalid': $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">{{'category_create_name' | localize}}</label>
          <span 
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
             {{'category_message_EnterName' | localize}}
          </span>
        </div>

        <div class="input-field">
          <input 
            id="limit" 
            type="number" 
            v-model.number="limit" 
            :class="{'invalid': $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit"> {{'category_create_limit' | localize}}</label>
          <span 
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          > {{'category_message_minValue' | localize}} {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'category_create_Button' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {
  required,
  minValue,
} from "../../node_modules/vuelidate/lib/validators";
import localizeFilter from '../filters/localize-filter';

export default {
  data: () => ({
    title: "",
    limit: 100
  }),
  validations: {
    title: {
      required,
    },
    limit: {
      minValue: minValue(100),
    },
  },
  mounted() {
    window.M.updateTextFields();
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = '';
        this.limit = 100;
        
        this.$v.$reset();

        this.$emit('created', category);
        this.$message(`${localizeFilter('category_create')}`);
      } catch (e) {console.log(e);}
    }
  }
};
</script>
