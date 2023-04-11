<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="5" sm="2">
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <h4>List Orders</h4>
        <v-data-table
          :headers="headers"
          :items="orders"
          disable-pagination
          :hide-default-footer="true"
          :search="search"
          class="custom_table_class"
        >
        </v-data-table>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import OrderDataService from '../services/OrderDataService';
export default {
  name: 'orders-list',
  data() {
    return {
      search: '',
      team: { id: 1, teamName: 'Tổ Sản Xuất' },
      itemGroup: [],
      orders: [],
      fullName: '',
      headers: [
        {
          text: 'Order Code',
          align: 'center',
          sortable: true,
          value: 'orderCode',
        },
        {
          text: 'Order Name',
          align: 'center',
          value: 'orderName',
          sortable: true,
        },
        {
          text: 'Start Date',
          align: 'center',
          value: 'startDate',
          sortable: true,
        },
        {
          text: 'End Date',
          align: 'center',
          value: 'endDate',
          sortable: true,
        },
        {
          text: 'Description',
          align: 'center',
          value: 'description',
          sortable: false,
        },
        {
          text: 'Created Date',
          align: 'center',
          value: 'createdDate',
          sortable: true,
        },
      ],

      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSize: 10,

      pageSizes: [5, 10, 15],
    };
  },
  methods: {
    getRequestParams(fullName, teamId, userId, page, pageSize) {
      let params = {};

      if (fullName) {
        params['fullName'] = fullName;
      }

      if (page) {
        params['page'] = page - 1;
      }

      if (pageSize) {
        params['size'] = pageSize;
      }

      if (teamId) {
        params['teamId'] = teamId;
      }

      return params;
    },

    retrieveOrders() {
      // const params = this.getRequestParams(this.fullName, this.team.id);

      OrderDataService.getAll()
        .then((response) => {
          this.orders = response.data;
          this.totalItems = this.orders.length;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveOrders();
    },
  },
  mounted() {
    this.retrieveOrders();
  },
};
</script>

<style>
.list {
  max-width: 1500px;
}
.v-data-table .v-data-table-header tr th {
  font-size: 15px !important;
}
.custom_table_class thead th {
  background-color: antiquewhite;
}
</style>
