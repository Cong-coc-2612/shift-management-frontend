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
            :disabled="isLeader() == false"
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
        :disabled="isLeader() == false"
      >
      </v-select>
      <v-radio-group
        v-model="shift.status"
        label="Status"
        inline
        :disabled="isLeader() == false && shift.status == 'Approved'"
      >
        <v-radio label="New" value="New"></v-radio>
        <v-radio label="Finished" value="Finished"></v-radio>
        <v-radio
          label="Approved"
          value="Approved"
          :disabled="isLeader() == false"
        ></v-radio>
      </v-radio-group>
      <v-textarea
        v-model="shift.description"
        variant="filled"
        label="Description"
        auto-grow
      ></v-textarea>

      <v-btn
        color="success"
        class="mr-2"
        small
        @click="updateShift"
        :disabled="!validForm"
      >
        Update
      </v-btn>
      <v-btn
        color="error"
        small
        class="mr-2"
        @click="deleteShift"
        :disabled="isLeader() == false"
      >
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
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
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
      if (this.isLeader()) {
        this.$router.push({ name: 'shifts' });
      } else if (this.isEmployee()) {
        this.$router.push({ name: 'shift' });
      } else {
        this.$router.push({ name: 'home' });
      }
    },
    isLeader() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_LEADER');
      }

      return false;
    },
    isEmployee() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_EMPLOYEE');
      }

      return false;
    }
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
