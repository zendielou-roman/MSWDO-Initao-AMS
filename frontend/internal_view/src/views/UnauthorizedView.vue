<template>
  <div class="unauthorized">
    <h1>🚫 Access Denied</h1>
    <p>You don't have permission to view this page.</p>
    <RouterLink to="/dashboard">← Back to Dashboard</RouterLink>
  </div>
</template>

<style scoped>
.unauthorized {
  text-align: center;
  padding: 4rem 2rem;
}
</style>
