<template>
  <div>
    <div class="page-title">
      <h3>{{'record_Title' | localize}}</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">
      {{'empty_categoty' | localize}}
      <router-link to='/categories'>
        {{'empty_category_add' | localize}}
      </router-link>
    </p>

    <form class="form" @submit.prevent="submitHandler" v-else>
      <div class="input-field">
        <select ref="select" v-model="category">
          <option 
              v-for="c of categories" 
              :key="c.id" 
              :value="c.id"
            >{{c.title}}</option>
        </select>
        <label>{{'record_select_label' | localize}}</label>
      </div>

      <p>
        <label>
          <input 
            class="with-gap" 
            name="type" 
            type="radio" 
            value="income" 
            v-model="type"
          />
          <span>{{'record_income' | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input 
            class="with-gap" 
            name="type" 
            type="radio" 
            value="outcome" 
            v-model="type"
          />
          <span>{{'record_outcome' | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input 
          id="amount" 
          type="number" 
          v-model.number="amount"
          :class="{'invalid': ($v.amount.$dirty && !$v.amount.required) || ($v.amount.$dirty && !$v.amount.minValue)}"
        />
        <label for="amount">{{'record_amount' | localize}}</label>
          <span 
            v-if="($v.amount.$dirty && !$v.amount.required) || ($v.amount.$dirty && !$v.amount.minValue)"
            class="helper-text invalid"
          >
            {{'record_message_minValue' | localize}} {{$v.amount.$params.minValue.min}}
          </span>
      </div>

      <div class="input-field">
        <input 
          id="description" 
          type="text" 
          v-model="description"
          :class="{'invalid': $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">{{'record_description' | localize}}</label>
        <span 
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
          >{{'record_message_description' | localize}}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'record_create_Button' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from '../../node_modules/vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  name: 'Record',
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {required, minValue: minValue(1)},
    description: {required}
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }

      return this.info.bill >= this.amount;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            type: this.type,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
            ? this.info.bill + this.amount 
            : this.info.bill - this.amount;

          await this.$store.dispatch('updateInfo', {bill});
          this.$message('Запись успешно создана');
          this.$v.$reset();
          this.amount = 1;
          this.description = '';
        } catch (e) {console.log(e);}
        
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
      }
    }
  },
  async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select, {isMultiple: false});
      window.M.updateTextFields();
    },0);
    
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>
