<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ "history_table_amount" | localize }}</th>
        <th>{{ "history_table_date" | localize }}</th>
        <th>{{ "history_table_category" | localize }}</th>
        <th>{{ "history_table_type" | localize }}</th>
        <th>{{ "history_table_open" | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount | currency }}</td>
        <td>{{ record.date | date("date") }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span :class="[record.typeClass]" class="white-text badge"
            >{{ record.typeText }}
          </span>
        </td>
        <td>
          <button
            v-tooltip="tooltipText"
            class="btn-small btn"
            @click.prevent="$router.push(`/detail/${record.id}`)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from "../filters/localize-filter";

export default {
  name: "HistoryTable",
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
  computed: {
    tooltipText() {
      return localizeFilter("history_detail_tooltip");
    }
  },
};
</script>
