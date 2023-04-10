<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="1" sm="2">
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
        hide-details
      ></v-select>
    </v-col>
    <v-col cols="5" sm="2">
      <v-text-field
        v-model="fullName"
        label="Search by employee name"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="5" sm="4">
      <v-btn
        class="mr-2"
        small
        color="blue"
        @click="
          page = 1;
          retrieveEmployees();
        "
      >
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <h4>List Employee</h4>
        <v-data-table
          :headers="headers"
          :items="employees"
          disable-pagination
          :hide-default-footer="true"
          class="custom_table_class"
        >
        </v-data-table>

        <v-card-actions> </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserDataService from '../services/UserDataService';
import TeamDataService from '../services/TeamDataService';
export default {
  name: 'employees-list',
  data() {
    return {
      team: { id: 1, teamName: 'Tổ Sản Xuất' },
      itemGroup: [],
      employees: [],
      fullName: '',
      headers: [
        {
          text: 'Employee Code',
          align: 'center',
          sortable: true,
          value: 'employeeCode',
        },
        {
          text: 'Employee Name',
          align: 'center',
          value: 'fullname',
          sortable: true,
        },
        { text: 'gender', align: 'center', value: 'gender', sortable: true },
        {
          text: 'DOB',
          align: 'center',
          value: 'dob',
          sortable: true,
        },
        {
          text: 'email',
          align: 'center',
          value: 'email',
          sortable: false,
        },
        { text: 'phone', align: 'center', value: 'phone', sortable: true },
        {
          text: 'workplace',
          align: 'center',
          value: 'workplaceName',
          sortable: true,
        },
        {
          text: 'group',
          align: 'center',
          value: 'teamName',
          sortable: true,
        },
      ],

      page: 1,
      totalPages: 0,
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

    retrieveEmployees() {
      const params = this.getRequestParams(this.fullName, this.team.id);

      UserDataService.getAll(params)
        .then((response) => {
          this.employees = response.data;
          // this.shifts = shifts.map(this.getDisplayShift);

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveEmployees();
    },

    getDisplayShift(shift) {
      return {
        id: shift.id,
        shiftNumber: shift.shiftNumber,
        dayStart: shift.dayStart,
        description: shift.description,
        employeeCode: shift.employeeCode,
        employeeName: shift.employeeName,
        status: shift.status,
      };
    },
    changeGroup() {
      this.retrieveEmployees();
    },
  },
  mounted() {
    TeamDataService.getAll()
      .then((response) => {
        this.itemGroup = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    this.retrieveEmployees();
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
