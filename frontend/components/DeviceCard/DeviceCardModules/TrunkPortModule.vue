<template>
  <div class="trunk">
    <check-box label="Trunk Port" @change="toggleTP" />
    <div v-if="showTP" class="trunk__header">
      Trunk Port:
      <div class="trunk__header__button" @click="toggleContent">
        <img
          src="../../../assets/collapse-icon.png"
          width="34"
          height="34"
          alt="collapse-icon"
          class="image"
        />
      </div>
    </div>
    <div v-if="showTP" v-show="showContent" class="trunk__content">
      <input-field label="Interfejs" @input="setTPInt" />
      <input-field label="Opis" @input="setTPDescription" />
      <input-field label="VLAN Range" @input="setVLANRange" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TrunkPortModule",
  data() {
    return {
      showTP: false,
      showContent: true,
    };
  },
  methods: {
    toggleContent() {
      this.showContent = !this.showContent;
    },
    toggleTP() {
      this.showTP = !this.showTP;
      this.$emit("change", this.showTP);
    },
    setTPInt(value) {
      this.$emit("TPInt", value);
    },
    setTPDescription(value) {
      this.$emit("TPDescription", value);
    },
    setVLANRange(value) {
      this.$emit("VLANRange", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.trunk {
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
