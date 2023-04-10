<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Shift</p>

    <div v-if="!submitted">
      <v-form ref="form" v-model="validForm" fast-fail>
        <v-select
          v-model="team"
          :items="itemGroup"
          item-text="teamName"
          item-value="id"
          label="Group"
          persistent-hint
          return-object
          single-line
          @change="changeGroup"
        ></v-select>
        <div>
          <label class="typo__label">Select Employee</label>
          <multiselect
            v-model="user"
            :rules="[(v) => !!v || 'Employee is required']"
            :options="options"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="true"
            :preserve-search="true"
            :searchable="true"
            placeholder="Search by employee name"
            label="fullname"
            track-by="fullname"
            :preselect-first="false"
            required
            :max-height="150"
          >
          </multiselect>
        </div>
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
          :max-height="100"
        >
        </v-select>
        <v-radio-group v-model="shift.status" label="Status" inline :max-height="50">
          <v-radio label="New" value="New"></v-radio>
          <v-radio label="Finished" value="Finished"></v-radio>
          <v-radio label="Approved" value="Approved"></v-radio>
        </v-radio-group>
        <v-textarea
          v-model="shift.description"
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
        @click="saveShift"
        :disabled="!validForm"
        >Add New Shift</v-btn
      >
      <v-btn small @click="cancel">Back</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Add new shift successfully! </v-card-title>

        <v-card-subtitle> Click the button to add new Shift. </v-card-subtitle>

        <v-card-actions>
          <v-btn small class="mt-3" color="success" @click="newShift"
            >Add New Shift</v-btn
          >
          <v-btn small class="mt-3" @click="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import ShiftDataService from '../services/ShiftDataService';
import Multiselect from 'vue-multiselect';
import UserDataService from '../services/UserDataService';
import TeamDataService from '../services/TeamDataService';
export default {
  name: 'add-shift',
  data() {
    return {
      team: { id: 1, teamName: 'Tổ Sản Xuất' },
      itemGroup: [],

      validForm: true,
      shift: {
        id: null,
        shiftNumber: null,
        status: '',
        userId: [],
        teamId: null,
        dayStart: '',
        description: '',
      },
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
      teamId: 1,
    };
  },
  mounted() {
    let params = {};
    TeamDataService.getAll()
      .then((response) => {
        this.itemGroup = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    params['teamId'] = this.team.id;
    UserDataService.getAll(params)
      .then((response) => {
        this.options = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    saveShift() {
      var userId = this.user.map(function (item) {
        return item['id'];
      });
      var data = {
        shiftNumber: this.shift.shiftNumber,
        status: this.shift.status,
        userId: userId,
        teamId: this.team.id,
        dayStart: this.shift.dayStart,
        description: this.shift.description,
      };

      ShiftDataService.create(data)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newShift() {
      this.submitted = false;
      this.shift = {};
      this.user = [];
    },
    updateMultiValue(value) {
      this.multiValue = value;
    },
    cancel() {
      this.$router.push({ name: 'shifts' });
    },
    changeGroup() {
      let params = {};
      this.user = [];
      params['teamId'] = this.team.id;
      UserDataService.getAll(params)
        .then((response) => {
          this.options = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  components: {
    Multiselect,
  },
};
</script>

<style>
.submit-form {
  max-width: 360px;
  max-height: 100px;
}
</style>
