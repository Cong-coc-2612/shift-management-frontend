<template>
  <div v-if="shift" class="edit-form py-3">
    <p class="headline">Edit Shift</p>
    <v-form ref="form" v-model="validForm" fast-fail>
      <v-text-field
        v-model="shift.employeeCode"
        label="Employee Code"
        disabled
      ></v-text-field>

      <v-text-field
        v-model="shift.employeeName"
        label="Employee Name"
        disabled
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
            v-model="shift.dayStart"
            :rules="[(v) => !!v || 'Date is required']"
            label="Date"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="shift.dayStart"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
      <v-select
        v-model="shift.shiftNumber"
        :rules="[(v) => !!v || 'Number of shift is required']"
        :items="itemNumberOfShift"
        label="Number of shift"
      >
      </v-select>
      <v-radio-group v-model="shift.status" label="Status" inline>
        <v-radio label="New" value="New"></v-radio>
        <v-radio label="Finished" value="Finished"></v-radio>
        <v-radio label="Approved" value="Approved"></v-radio>
      </v-radio-group>
      <v-textarea
        v-model="shift.description"
        variant="filled"
        label="Description"
        auto-grow
      ></v-textarea>

      <v-btn color="success" class="mr-2" small @click="updateShift" :disabled="!validForm">
        Update
      </v-btn>
      <v-btn color="error" small class="mr-2" @click="deleteShift">
        Delete
      </v-btn>
      <v-btn small @click="cancel">Back</v-btn>
    </v-form>

    <p color="success" class="mt-3">{{ message }}</p>
  </div>

  <div class="edit-form py-3" v-else>
    <br />
    <p>Please choose a Existed Shift...</p>
    <v-btn small @click="cancel">Back</v-btn>
  </div>
</template>

<script>
import ShiftDataService from '../services/ShiftDataService';
export default {
  name: 'shift',
  data() {
    return {
      validForm: true,
      shift: null,
      message: '',
      user: [],
      submitted: false,
      selected: null,
      value: [],
      options: [],
      itemNumberOfShift: [1, 2],
      numberOfShift: null,
      group: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      statusShift: 'New',
    };
  },
  methods: {
    getShift(id) {
      ShiftDataService.get(id)
        .then((response) => {
          this.shift = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // updatePublished(status) {
    //   var data = {
    //     id: this.shift.id,
    //     title: this.shift.title,
    //     description: this.shift.description,
    //     published: status,
    //   };

    //   ShiftDataService.update(this.currentShift.id, data)
    //     .then((response) => {
    //       this.currentShift.published = status;
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    updateShift() {
      console.log(this.shift);
      ShiftDataService.update(this.shift.id, this.shift)
        .then((response) => {
          console.log(response.data);
          this.message = 'The shift was updated successfully!';
          // setTimeout(10000);
          // this.$router.push({ name: 'shifts' });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteShift() {
      ShiftDataService.delete(this.shift.id)
        .then((response) => {
          console.log(response.data);
          this.message = 'The shift was deleted successfully!';
          // this.$router.push({ name: 'shifts' });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancel() {
      this.$router.push({ name: 'shifts' });
    },
  },
  mounted() {
    this.message = '';
    console.log(this.$route.params.id);
    this.getShift(this.$route.params.id);
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
