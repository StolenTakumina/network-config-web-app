<template>
  <div class="header">
    <div class="header__label">{{ id + 1 }}. Typ urządzenia:</div>
    <div class="header__dropdown">
      <drop-down :options="options" @selected="setDevice" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DeviceHeader",
  data() {
    return {
      options: ["Router", "Switch"],
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setDevice(device) {
      const obj = {
        id: this.id,
        device,
      };
      this.$store.dispatch("configuration/setDevice", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  font-size: 24px;
  font-weight: bold;

  &__dropdown {
    display: flex;
    width: fit-content;
  }
}
</style>
