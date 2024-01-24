<template>
  <div class="access">
    <check-box label="Access Port" @change="toggleAP" />
    <div v-if="showAP" class="access__header">
      Access Port:
      <div class="access__header__button" @click="toggleContent">
        <img
          src="../../../assets/collapse-icon.png"
          width="34"
          height="34"
          alt="collapse-icon"
          class="image"
        />
      </div>
    </div>
    <div v-if="showAP" v-show="showContent" class="access__content">
      <input-field label="Interfejs" @input="setAPInt" />
      <input-field label="Opis" @input="setAPDescription" />
      <input-field label="VLAN ID" @input="setVLANID" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AccessPortModule",
  data() {
    return {
      showAP: false,
      showContent: true,
    };
  },
  methods: {
    toggleContent() {
      this.showContent = !this.showContent;
    },
    toggleAP() {
      this.showAP = !this.showAP;
      this.$emit("change", this.showAP);
    },
    setAPInt(value) {
      this.$emit("APInt", value);
    },
    setAPDescription(value) {
      this.$emit("APDescription", value);
    },
    setVLANID(value) {
      this.$emit("VLANID", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.access {
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
