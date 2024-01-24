<template>
  <div class="basic">
    <div class="basic__header">
      <div class="basic__header__label">Podstawowa konfiguracja</div>
      <div class="basic__header__button" @click="toggleBasic">
        <img
          src="../../../assets/collapse-icon.png"
          width="34"
          height="34"
          alt="collapse-icon"
          class="image"
        />
      </div>
    </div>
    <div v-show="showContent" class="basic__content">
      <input-field label="Nazwa urządzenia (hostname)" @input="setHostname" />
      <input-field
        label="Brama domyślna (default-gateway)"
        @input="setDefaultGateway"
      />
      <input-field label="banner" @input="setBanner" />
      <input-field label="enable secret" password @input="setPassword" />
      <input-field label="line con password" password @input="setConsolePass" />
      <check-box label="service password encryption" @change="setEncryption" />
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicModule",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showContent: true,
    };
  },

  methods: {
    toggleBasic() {
      this.showContent = !this.showContent;
    },
    setHostname(hostname) {
      const obj = {
        id: this.id,
        hostname: hostname.value,
      };
      this.$store.dispatch("configuration/setHostname", obj);
    },
    setDefaultGateway(gateway) {
      const obj = {
        id: this.id,
        gateway: gateway.value,
      };
      this.$store.dispatch("configuration/setDefaultGateway", obj);
    },
    setBanner(banner) {
      const obj = {
        id: this.id,
        banner: banner.value,
      };
      this.$store.dispatch("configuration/setBanner", obj);
    },
    setPassword(password) {
      const obj = {
        id: this.id,
        secret: password.value,
      };

      this.$store.dispatch("configuration/setSecret", obj);
    },
    setConsolePass(password) {
      const obj = {
        id: this.id,
        console: password.value,
      };
      this.$store.dispatch("configuration/setConsolePass", obj);
    },
    setEncryption(value) {
      const obj = {
        id: this.id,
        encryption: value,
      };
      this.$store.dispatch("configuration/setPasswordEncryption", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.basic {
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
    gap: 40px;
    border-bottom: 2px solid #2c3e50;
    padding-bottom: 5px;

    &__label {
      font-size: 20px;
      font-weight: bold;
    }

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
    gap: 20px;
  }
}
</style>
