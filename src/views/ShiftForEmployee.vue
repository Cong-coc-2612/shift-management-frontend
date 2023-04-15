<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="5" sm="2">
      <v-menu
        v-model="menu"
        :close-on-content-click="true"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        class="ma-0 pa-0"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="startDate"
            label="Start Date"
            readonly
            v-bind="attrs"
            v-on="on"
            clearable
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="startDate"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="5" sm="2">
      <v-menu
        v-model="menu2"
        :close-on-content-click="true"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="endDate"
            label="End Date"
            readonly
            v-bind="attrs"
            v-on="on"
            clearable
          ></v-text-field>
        </template>
        <v-date-picker v-model="endDate" @input="menu2 = false"></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="5" sm="4">
      <v-btn
        class="mr-2"
        small
        color="blue"
        @click="
          page = 1;
          retrieveShifts();
        "
      >
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <h4>List Shift for Employee</h4>
        <p>Total Item: {{ totalItems }}</p>
        <v-data-table
          :headers="headers"
          :items="shifts"
          disable-pagination
          :hide-default-footer="true"
          class="custom_table_class"
        >
          <template v-slot:[`item.operation`]="{ item }">
            <v-btn
              small
              color="yellow"
              class="mr-2"
              @click="editShift(item.id)"
            >
              Edit
            </v-btn>
            <v-btn
              v-if="item.status === 'New'"
              small
              color="green"
              @click="editStatusShift(item.id, item.status)"
            >
              Finish
            </v-btn>
          </template>
        </v-data-table>

        <v-card-actions> </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" sm="12">
      <v-row>
        <v-col cols="4" sm="2">
          <v-select
            v-model="pageSize"
            :items="pageSizes"
            label="Items per Page"
            @change="handlePageSizeChange"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="7">
          <v-pagination
            v-model="page"
            :length="totalPages"
            total-visible="5"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            circle
            @input="handlePageChange"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ShiftDataService from '../services/ShiftDataService';
export default {
  name: 'shift-list',
  data() {
    return {
      menu: false,
      menu2: false,
      startDate: null,
      endDate: null,
      team: 'Tổ Sản Xuất',
      shifts: [],
      fullName: '',
      headers: [
        {
          text: 'Employee Code',
          align: 'left',
          sortable: true,
          value: 'employeeCode',
        },
        {
          text: 'Employee Name',
          align: 'left',
          value: 'employeeName',
          sortable: true,
        },
        { text: 'Date', align: 'center', value: 'dayStart', sortable: true },
        {
          text: 'Number of Shift',
          align: 'center',
          value: 'shiftNumber',
          sortable: true,
        },
        {
          text: 'Description',
          align: 'left',
          value: 'description',
          sortable: false,
        },
        { text: 'Status', align: 'center', value: 'status', sortable: true },
        {
          text: 'Operation',
          align: 'left',
          value: 'operation',
          sortable: true,
        },
      ],

      page: 1,
      totalPages: 0,
      totalItems: 0,
      pageSize: 10,

      pageSizes: [5, 10, 15],
      itemGroup: ['Tổ Sản Xuất', 'Tổ Kinh Doanh'],
      message: '',
    };
  },
  methods: {
    getRequestParams(fullName, teamId, userId, startDate, endDate, page, pageSize) {
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

      if (userId) {
        params['userId'] = userId;
      }

      if (startDate) {
        params['startDate'] = startDate;
      }

      if (endDate) {
        params['endDate'] = endDate;
      }

      return params;
    },

    retrieveShifts() {
      var userId = this.$store.state.auth.user.id;
      console.log(userId);
      const params = this.getRequestParams(
        this.fullName,
        null,
        userId,
        this.startDate,
        this.endDate,
        this.page,
        this.pageSize
      );

      ShiftDataService.getAll(params)
        .then((response) => {
          const { shifts, totalItems, totalPages } = response.data;
          this.shifts = shifts.map(this.getDisplayShift);
          this.totalPages = totalPages;
          this.totalItems = totalItems;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveShifts();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveShifts();
    },

    refreshList() {
      this.retrieveShifts();
    },

    removeAllShifts() {
      ShiftDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editShift(id) {
      console.log(id);
      this.$router.push({ name: 'shift-details', params: { id: id } });
    },
    editStatusShift(id, status) {
      status = 'Finished';
      ShiftDataService.updateStatus(id, status)
        .then((response) => {
          console.log(response.data);
          console.log('The status shift was updated successfully!');
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteShift(id) {
      ShiftDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
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
    moveToAddScreen() {
      this.$router.push({ name: 'add' });
    },
  },
  mounted() {
    this.retrieveShifts();
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
