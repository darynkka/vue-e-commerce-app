<template>
  <footer class="bg-primary text-white py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="d-flex align-items-center mb-4">
            <router-link class="navbar-brand" to="/">
              <i class="bi bi-shop me-2"></i>
              E-COMMERCE
            </router-link>
          </div>

          <ul class="list">
            <li v-for="member in teamMembers" :key="member.name">
              <a
                :href="member.githubProfile"
                target="_blank"
                rel="noopener noreferrer"
                class="text-white"
              >
                {{ member.name }} - {{ member.group }}
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-4 ms-5">
          <h4 class="mb-4">About</h4>
          <p>
            This is a sample e-commerce project built with Vue.js and Bootstrap.
            It includes features like a shopping cart, favorites list, and
            product filtering.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const teamMembers = [
  {
    name: 'Litvinuk Dariia',
    group: 'Group 343A',
    githubProfile: 'https://github.com/darynkka',
  },
  {
    name: 'Korchova Vitalina',
    group: 'Group 343A',
    githubProfile: 'https://github.com/Vitalina-Korchova',
  },
  {
    name: 'Panchoshna Anastasiia',
    group: 'Group 343A',
    githubProfile: 'https://github.com/nestea4',
  },
]
</script>

<style scoped>
.bg-primary {
  background-color: #007bff;
}

.text-white {
  color: #fff;
}

.list {
  padding-left: 0;
  list-style: none;
}

.navbar-brand {
  font-weight: 600;
  font-size: 1.4rem;
}
</style>
