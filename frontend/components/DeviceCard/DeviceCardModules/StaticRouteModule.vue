<template>
  <div class="static">
    <check-box label="Static Route" @change="toggleSR" />
    <div v-if="showSR" class="static__header">
      Static Route:
      <div class="static__header__button" @click="toggleContent">
        <img
          src="../../../assets/collapse-icon.png"
          width="34"
          height="34"
          alt="collapse-icon"
          class="image"
        />
      </div>
    </div>
    <div v-if="showSR" v-show="showContent" class="static__content">
      <input-field label="Destination Network" @input="setDestination" />
      <input-field label="Subnet Mask" @input="setSRSubnetMask" />
      <input-field label="Next Hop" @input="setNextHop" />
    </div>
  </div>
</template>

<script>
export default {
  name: "StaticRouteModule",
  data() {
    return {
      showSR: false,
      showContent: true,
    };
  },
  methods: {
    toggleContent() {
      this.showContent = !this.showContent;
    },
    toggleSR() {
      this.showSR = !this.showSR;
      this.$emit("change", this.showSR);
    },
    setDestination(value) {
      this.$emit("Destination", value);
    },
    setSRSubnetMask(value) {
      this.$emit("SRSubnet", value);
    },
    setNextHop(value) {
      this.$emit("NextHop", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.static {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: fit-content;
  padding: 20px;
  border: 3px solid #2c3e50;
  border-radius: 6px;
  font-weight: bold;

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 2px solid #2c3e50;
    padding-bottom: 5px;

    &__button {
      width: 34px;
      height: 34px;
      border-radius: 4px;
      cursor: pointer;
      background-color: #2c3e50;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-left: 20px;

    &__modulus {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
