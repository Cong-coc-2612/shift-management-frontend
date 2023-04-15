<template>
  <div v-if="order" class="edit-form py-3">
    <p class="headline">Edit getOrder</p>
    <v-form ref="form" v-model="validForm" fast-fail>
      <v-text-field
        v-model="order.orderCode"
        :rules="[(v) => !!v || 'Order Code is required']"
        label="Order Code"
        disabled
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
      <v-text-field
        v-model="order.createdDate"
        label="Created Date"
        disabled
      ></v-text-field>
    </v-form>

    <v-btn
        color="success"
        class="mr-2"
        small
        @click="updateOrder"
        :disabled="!validForm"
      >
        Update
      </v-btn>
      <v-btn
        color="error"
        small
        class="mr-2"
        @click="deleteOrder"
      >
        Delete
      </v-btn>
    <v-btn small @click="cancel">Back</v-btn>
    <p color="success" class="mt-3">{{ message }}</p>
  </div>
  <div class="edit-form py-3" v-else>
    <br />
    <p>Please choose a Existed Order...</p>
    <v-btn small @click="cancel">Back</v-btn>
  </div>
</template>

<script>
import OrderDataService from '../services/OrderDataService';
export default {
  name: 'edit-order',
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
      menu2: false,
      message: '',
    };
  },
  mounted() {
    this.message = '';
    console.log(this.$route.params.id);
    this.getOrder(this.$route.params.id);
  },
  methods: {
    getOrder(id) {
      OrderDataService.get(id)
        .then((response) => {
          this.order = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateOrder() {
      console.log(this.order);
      OrderDataService.update(this.order.id, this.order)
        .then((response) => {
          console.log(response.data);
          this.message = 'The order was updated successfully!';
          // setTimeout(10000);
          // this.$router.push({ name: 'shifts' });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteOrder() {
      OrderDataService.delete(this.order.id)
        .then((response) => {
          console.log(response.data);
          this.message = 'The order was deleted successfully!';
          // this.$router.push({ name: 'shifts' });
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
  },
  components: {},
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
