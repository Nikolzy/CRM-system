<template>
  <Loader v-if="loading"/>
  <div v-else-if="record">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">История</router-link>
      <a @click.prevent class="breadcrumb">
        {{record.typeText}}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div 
          :class="[record.typeClass]"
          class="card"
        >
          <div class="card-content white-text">
            <p>Описание: {{record.description}}</p>
            <p>Сумма: {{record.amount | currency}}</p>
            <p>Категория: {{record.categoryName}}</p>

            <small>{{record.date | date('datetime')}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="center" v-else>Запись с id=<strong>"{{$route.params.id}}"</strong> не существует</p>
</template>

<script>
export default {
  name: "DetailRecord",
  data: () => ({
    loading: true,
    record: null,
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch(
      "fetchCategoryBiId",
      record.categoryId
    );

    this.record = {
      ...record,
      categoryName: category.title,
      typeClass: record.type === "income" ? "green" : "red",
      typeText: record.type === "income" ? "Доход" : "Расход",
    };
    console.log(this.record);

    this.loading = false;
  },
};
</script>
