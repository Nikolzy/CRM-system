<template>
  <div>
    <div class="page-title">
      <h3>{{'planning_Title' | localize}}</h3>
      <h4>{{info.bill | currency('UAH')}}</h4>
    </div>

    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">
      {{'empty_category' | localize}}
      <router-link to='/categories'>
        {{'empty_category_add' | localize}}
      </router-link>
    </p>

    <section v-else>
      <div v-for="el of categories" :key="el.id">
        <p>
          <strong>{{el.title}}:</strong>
          {{ el.spent | currency }} {{'planning_OF_word' | localize}} {{ el.limit | currency }}
        </p>
        <div class="progress" v-tooltip="el.tooltip">
          <div 
            :class="[el.progressColor]"
            class="determinate" 
            :style="{'width': `${el.progressPercent}%`}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import currencyFilter from '@/filters/currency-filter';
import localizeFilter from '../filters/localize-filter';

export default {
  name: 'Planning',
  metaInfo() {
    return ({
      title: this.$title('menu_Planning')
    })
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.categories = categories.map(el => {
      const spent = records
        .filter(r => r.categoryId === el.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount;
        }, 0)

      const percent = 100 * spent / el.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor = percent < 60 
        ? 'green' 
        : percent < 100
          ? 'yellow' 
          : 'red'

      const tooltipValue = el.limit - spent;
      const tooltip = `${localizeFilter(tooltipValue < 0 ? 'planning_excess' : 'planning_left')} ${currencyFilter(Math.abs(tooltipValue))}`;
      
      return {...el, progressPercent, progressColor, spent, tooltip};
    })

    this.loading = false;
  }
}
</script>
