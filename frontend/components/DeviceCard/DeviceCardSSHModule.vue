<template>
  <div class="ssh">
    <check-box label="SSH" @change="toggleSSH" />
    <div v-if="showSSH" class="ssh__content">
      <input-field label="Nazwa domeny" @input="setDomainName" />
      <input-field label="Nazwa użytkownika" @input="setSSHUsername" />
      <input-field label="Hasło" password @input="setSSHPassword" />
      <div class="ssh__content__modulus">
        Modulus :
        <drop-down label="RSA Values" :options="rsaValues" />
      </div>
      <check-box label="Version 2" @change="toggleV2" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DeviceCardSSHModule",
  data() {
    return {
      rsaValues: ["1024", "2048", "4096"],
      showSSH: false,
      v2: false,
    };
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
.ssh {
  display: flex;
  flex-direction: column;
  gap: 10px;

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
