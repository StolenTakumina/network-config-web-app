<template>
  <div class="page">
    <div class="page__topbar">
      <top-bar />
    </div>
    <div class="page__content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>

<style>
html {
  background-color: #292727;
  font-family: "Roboto", sans-serif;
}

.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
