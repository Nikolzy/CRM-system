<template>
  <Loader v-if="loading"/>
  <div v-else-if="record">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">{{'detail_history_tab' | localize}}</router-link>
      <a @click.prevent class="breadcrumb">
        {{record.typeText | localize}}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div 
          :class="[record.typeClass]"
          class="card"
        >
          <div class="card-content white-text">
            <p>{{'detail_description' | localize}}: {{record.description}}</p>
            <p>{{'detail_amount' | localize}}: {{record.amount | currency}}</p>
            <p>{{'detail_category' | localize}}: {{record.categoryName}}</p>

            <small>{{record.date | date('datetime')}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p 
    class="center" 
    v-else
  >
    {{'detail_record_notFound' | localize}}
      <strong>"{{$route.params.id}}"</strong> 
    {{'detail_exist_notFound' | localize}}
  </p>
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
      typeText: record.type === "income" ? "detail_income_tab" : "detail_outcome_tab",
    };
    console.log(this.record);

    this.loading = false;
  },
};
</script>
