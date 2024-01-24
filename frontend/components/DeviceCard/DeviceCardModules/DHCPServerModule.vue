<template>
  <div class="dhcp">
    <check-box label="DHCP Server" @change="toggleDHCP" />
    <div v-if="showDHCP" class="dhcp__header">
      DHCP Server:
      <div class="dhcp__header__button" @click="toggleContent">
        <img
          src="../../../assets/collapse-icon.png"
          width="34"
          height="34"
          alt="collapse-icon"
          class="image"
        />
      </div>
    </div>
    <div v-if="showDHCP" v-show="showContent" class="dhcp__content">
      <input-field label="Pool Name" @input="setPoolName" />
      <input-field label="DHCP Network" @input="setDHCPNetwork" />
      <input-field label="Default Router" @input="setDefaultRouter" />
      <input-field label="DNS Server" @input="setDNS" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DHCPServerModule",
  data() {
    return {
      showDHCP: false,
      showContent: true,
    };
  },
  methods: {
    toggleContent() {
      this.showContent = !this.showContent;
    },
    toggleDHCP() {
      this.showDHCP = !this.showDHCP;
      this.$emit("change", this.showDHCP);
    },
    setPoolName(value) {
      this.$emit("PoolName", value);
    },
    setDHCPNetwork(value) {
      this.$emit("DHCPNetwork", value);
    },
    setDefaultRouter(value) {
      this.$emit("DefaultRouter", value);
    },
    setDNS(value) {
      this.$emit("DNS", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.dhcp {
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
