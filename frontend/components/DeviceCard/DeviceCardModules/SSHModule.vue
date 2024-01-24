<template>
  <div class="ssh">
    <check-box label="SSH" @change="toggleSSH" />
    <div v-if="showSSH" class="ssh__header">
      Konfiguracja połączenia SSH:
      <div class="ssh__header__button" @click="toggleContent">
        <img
          src="../../../assets/collapse-icon.png"
          width="34"
          height="34"
          alt="collapse-icon"
          class="image"
        />
      </div>
    </div>
    <div v-if="showSSH" v-show="showContent" class="ssh__content">
      <input-field label="Nazwa domeny" @input="setDomainName" />
      <input-field label="Nazwa użytkownika" @input="setSSHUsername" />
      <input-field label="Hasło" password @input="setSSHPassword" />
      <div class="ssh__content__modulus">
        Modulus :
        <drop-down
          label="RSA Values"
          :options="rsaValues"
          @selected="setModulus"
        />
      </div>
      <check-box label="Version 2" @change="toggleV2" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SSHModule",
  data() {
    return {
      rsaValues: ["1024", "2048", "4096"],
      showSSH: false,
      showContent: true,
      v2: false,
    };
  },
  methods: {
    toggleContent() {
      this.showContent = !this.showContent;
    },
    toggleSSH() {
      this.showSSH = !this.showSSH;
      this.$emit("change", this.showSSH);
    },
    setDomainName(value) {
      this.$emit("domain", value);
    },
    setSSHUsername(value) {
      this.$emit("username", value);
    },
    setSSHPassword(value) {
      this.$emit("password", value);
    },
    toggleV2() {
      this.v2 = !this.v2;
      this.$emit("v2", this.v2);
    },
    setModulus(value) {
      this.$emit("modulus", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.ssh {
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
