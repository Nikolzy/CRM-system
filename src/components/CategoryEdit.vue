<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'category_edit_title' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option 
              v-for="c of categories" 
              :key="c.id" 
              :value="c.id"
            >{{c.title}}</option>
          </select>
          <label>{{'category_edit_select_label' | localize}}</label>
        </div>

        <div class="input-field">
          <input i
            d="name" 
            type="text" 
            v-model="title"
            :class="{'invalid': $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">{{'category_edit_name' | localize}}</label>
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
          <label for="limit">{{'category_edit_limit' | localize}}</label>
          <span 
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            {{'category_message_minValue' | localize}} {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'category_edit_Button' | localize}}
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

export default {
  props: {
    categories: Array
  },
  data: () => ({
    select: null,
    title: "",
    limit: 100,
    current: null
  }),
  validations: {
    title: {
      required,
    },
    limit: {
      minValue: minValue(100),
    },
  },
  watch: {
    current(catId) {
      const { title, limit} = this.categories.find(el => el.id === catId);

      this.current = catId;
      this.title = title;
      this.limit = limit;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Категория успешно обновлена');
        this.$emit('upadated', categoryData);
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select, {isMultiple: false})
    window.M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>