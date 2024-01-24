<template>
  <div class="main">
    <div class="main__header">SKONFIGURUJ URZĄDZENIA SIECIOWE</div>
    <div class="main__content">
      <div class="main__content__header">Urządzenia:</div>
      <div class="main__content__wrapper">
        <div
          v-for="(device, i) in devicesList"
          :key="device.id"
          class="main__content__wrapper__item"
        >
          <device-card :id="i" @remove="removeDevice" />
        </div>
        <button class="main__content__wrapper__button" @click="addDevice">
          <div class="main__content__wrapper__button__plus">+</div>
          <div class="main__content__wrapper__button__text">
            Dodaj urządzenie do konfiguracji
          </div>
        </button>
      </div>
      <div v-show="devicesList.length > 0" class="main__content__footer">
        <div class="main__content__footer__download" @click="exportConfig">
          <img
            class="main__content__footer__download__icon"
            src="../assets/download-icon.png"
            alt="download img"
          />
          <div class="main__content__footer__download__text">
            Pobierz .txt z konfiguracją
          </div>
        </div>
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
  display: flex;
  flex-direction: column;
  border: 5px solid #414040;
  padding: 20px;
  border-radius: 16px;

  &__header {
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #c5c5c5;
    border-bottom: 3px solid rgb(67, 67, 139);
    text-align: center;
    overflow: auto;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 15px;
    font-size: 16px;

    &__header {
      font-size: 24px;
      color: #c5c5c5;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 10px;

      &__item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      &__button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 8px;
        border: 1px solid #3b668f;
        border-radius: 6px;
        background-color: #3b668f;
        color: white;
        text-align: center;
        overflow: auto;
        cursor: pointer;
        &__plus {
          font-size: 36px;
        }
        &__text {
          font-size: 16px;
        }
      }
    }

    &__footer {
      &__download {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 5px;
        border-radius: 6px;
        background-color: rgb(67, 67, 139);
        color: white;
        text-align: center;
        overflow: auto;
        cursor: pointer;
        &__icon {
          width: 30px;
          height: 30px;
        }
        &__text {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
