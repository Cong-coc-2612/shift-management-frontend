<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.username }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Employee Code:</strong>
      {{ user.employeeCode }}
    </p>
    <p>
      <strong>Employee Name:</strong>
      {{ user.fullname }}
    </p>
    <p>
      <strong>Gender:</strong>
      {{ user.gender }}
    </p>
    <p>
      <strong>Dob:</strong>
      {{ user.dob }}
    </p>
    <p>
      <strong>Phone:</strong>
      {{ user.phone }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ user.email }}
    </p>
    <p>
      <strong>Workplace Name:</strong>
      {{ user.workplaceName }}
    </p>
    <p>
      <strong>Team Name:</strong>
      {{ user.teamName }}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role, index) in currentUser.roles" :key="index">
        {{ role }}
      </li>
    </ul>
  </div>
</template>

<script>
import UserDataService from '../services/UserDataService';
export default {
  name: 'Profile',
  data() {
    return {
      user: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    UserDataService.get(this.currentUser.id)
      .then((response) => {
        this.user = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>