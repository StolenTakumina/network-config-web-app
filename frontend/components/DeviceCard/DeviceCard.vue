<template>
  <div class="card">
    <div class="card__header">
      <device-card-header :id="id" />
      <button class="card__header__button" @click="remove">x</button>
    </div>
    <div class="card__content">
      <div class="card__content__type">
        Model urządzenia:
        <div v-show="showInfo" class="card__content__type__dropdown__info">
          Wybierz typ urządzenia
        </div>
        <div class="card__content__type__dropdown">
          <drop-down v-show="!showInfo" :options="getModels" />
        </div>
      </div>
      <device-card-options :id="id" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DeviceCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      routerModels: ["ISR4331", "1941"],
      switchModels: ["2960-24TT"],
      showInfo: true,
    };
  },
  computed: {
    deviceType() {
      return this.$store.getters["configuration/getDevice"](this.id);
    },
    getModels() {
      if (this.deviceType === "Router") {
        this.showInfo = false;
        return this.routerModels;
      } else if (this.deviceType === "Switch") {
        this.showInfo = false;
        return this.switchModels;
      }
      this.showInfo = true;
      return [];
    },
  },
  methods: {
    remove() {
      this.$emit("remove", this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid darkgreen;
  padding: 10px;
  gap: 20px;

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &__button {
      border: none;
      border-radius: 4px;
      padding: 8px 12px;
      background-color: darkred;
      color: white;
      font-weight: bold;
      font-size: 18px;
      cursor: pointer;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__type {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 40px;
      margin-left: 20px;

      &__label {
        width: 200px;
      }

      &__dropdown {
        display: flex;
        width: fit-content;
      }
    }
  }
}
</style>
