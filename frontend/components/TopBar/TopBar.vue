<template>
  <div class="topbar">
    <div class="topbar__title">GENERATOR KONFIGURACJI URZĄDZEŃ SIECIOWYCH</div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
};
</script>

<style lang="scss" scoped>
.topbar {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 38px;
  font-weight: bold;
  background-color: #414040;
  padding: 10px;
  border-radius: 16px;

  &__title {
    text-align: center;
    overflow: auto;
  }
}
</style>
