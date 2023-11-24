<template>
  <div class="main">
    <div class="main__header">SKONFIGURUJ URZĄDZENIA SIECIOWE</div>
    <div class="main__content">
      <div class="main__content__header">Dodaj urządzenie do konfiguracji:</div>
      <div class="main__content__wrapper">
        <div
          v-for="(device, i) in devicesList"
          :key="device.id"
          class="maint__content__wrapper__item"
        >
          <device-card :id="i" @remove="removeDevice" />
        </div>
        <button @click="addDevice">Dodaj</button>
      </div>
      <div class="main__content__footer">
        Wyeksportuj konfigurację do pliku:
        <button @click="exportConfig">Pobierz .txt z konfiguracją</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IndexPage",
  computed: {
    devicesList() {
      return this.$store.getters["configuration/getDevices"];
    },
  },
  methods: {
    addDevice() {
      this.$store.dispatch("configuration/addDevice");
    },
    removeDevice(index) {
      this.$store.dispatch("configuration/removeDevice", index);
    },
    async exportConfig() {
      await this.$store.dispatch("configuration/exportConfig");
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  &__header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  &__content {
    font-size: 18px;
  }
}
</style>
