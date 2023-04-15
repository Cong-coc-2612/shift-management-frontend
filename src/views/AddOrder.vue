<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Order</p>

    <div v-if="!submitted">
      <v-form ref="form" v-model="validForm" fast-fail>
        <v-text-field
          v-model="order.orderCode"
          :rules="[(v) => !!v || 'Order Code is required']"
          label="Order Code"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="order.orderName"
          :rules="[(v) => !!v || 'Order Name is required']"
          label="Order Name"
          clearable
        ></v-text-field>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="50px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="order.startDate"
              :rules="[(v) => !!v || 'Start Date is required']"
              label="Start Date"
              readonly
              v-bind="attrs"
              v-on="on"
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="order.startDate"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>

        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="50px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="order.endDate"
              :rules="[(v) => !!v || 'End Date is required']"
              label="End Date"
              readonly
              v-bind="attrs"
              v-on="on"
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="order.endDate"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
        <v-textarea
          v-model="order.description"
          variant="filled"
          label="Description"
          auto-grow
          :max-height="100"
        ></v-textarea>
      </v-form>

      <v-btn
        small
        type="submit"
        color="primary"
        class="mr-2"
        @click="saveOrder"
        :disabled="!validForm"
        >Add New Order</v-btn
      >
      <v-btn small @click="cancel">Back</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Add new order successfully! </v-card-title>

        <v-card-subtitle> Click the button to add new Order. </v-card-subtitle>

        <v-card-actions>
          <v-btn small class="mt-3" color="success" @click="newOrder"
            >Add New Order</v-btn
          >
          <v-btn small class="mt-3" @click="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import OrderDataService from '../services/OrderDataService';
export default {
  name: 'add-order',
  data() {
    return {
      validForm: true,
      order: {
        id: null,
        orderCode: null,
        orderName: '',
        startDate: '',
        endDate: '',
        createdDate: '',
      },
      user: [],
      submitted: false,
      selected: null,
      value: [],
      options: [],
      itemNumberOfOrder: [1, 2],
      numberOfOrder: null,
      group: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false
    };
  },
  mounted() {},
  methods: {
    saveOrder() {
      OrderDataService.create(this.order)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateMultiValue(value) {
      this.multiValue = value;
    },
    cancel() {
      this.$router.push({ name: 'orders' });
    },
    newOrder() {
      this.submitted = false;
      this.order = {};
    },
  },
  components: {
  },
};
</script>

<style>
.submit-form {
  max-width: 360px;
  max-height: 100px;
}
</style>
