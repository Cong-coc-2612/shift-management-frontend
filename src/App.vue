<template>
  <v-app>
    <v-app-bar app dark>
      <a href class="navbar-brand" @click.prevent="home">Shift Management</a>
      <v-btn v-if="isLeader" to="/employees" text> Employees </v-btn>
      <v-btn v-if="isLeader || isDirector" to="/orders" text> Orders </v-btn>
      <v-btn v-if="isLeader" to="/shifts" text> Shifts </v-btn>
      <v-btn v-if="isLeader" to="/add" text> Add Shift </v-btn>
      <v-btn v-if="isDirector" to="/add-order" text>
        Add Order
      </v-btn>
      <v-btn v-if="isEmployee" to="/shift" text> Shift </v-btn>
      <!-- <v-btn v-if="!currentUser" to="/register" text style="display: right;">
        <font-awesome-icon icon="user-plus" />Sign Up
      </v-btn> -->
      <div class="navbar-nav ml-auto">
        <v-btn v-if="currentUser" to="/profile" text>
          <font-awesome-icon icon="user" />
          {{ currentUser.username }}
        </v-btn>
        <v-btn v-if="!currentUser" to="/Login" text>
          <font-awesome-icon icon="sign-in-alt" />Login
        </v-btn>
        <v-btn v-if="currentUser" href @click.prevent="logOut" text>
          <font-awesome-icon icon="sign-out-alt" />LogOut
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
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
    },
    isDirector() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_DIRECTOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    home() {
      this.$router.push('/home');
    },
  },
};
</script>
