<template>
  <div class="options">
    <div class="options__header">Wypełnij elementy konfiguracji:</div>
    <div class="options__content">
      <input-field label="Nazwa urządzenia (hostname)" @input="setHostname" />
      <input-field
        label="Brama domyślna (default-gateway)"
        @input="setDefaultGateway"
      />
      <input-field label="banner" @input="setBanner" />
      <input-field label="enable secret" password @input="setPassword" />
      <input-field label="line con password" password @input="setConsolePass" />
      <check-box label="service password encryption" @change="setEncryption" />
      <div class="options__content__interfaces">
        <div class="options__content__interfaces__label">
          Wybierz interfejsy:
          <button @click="addInterface">Dodaj interfejs</button>
        </div>
        <div
          v-for="(el, i) in intList"
          :key="i"
          class="options__content__interfaces__item"
        >
          <div class="options__content__interfaces__item__label">
            <div class="options__content__interfaces__item__label__text">
              {{ i + 1 }}.
              <drop-down
                :options="interfaces"
                @selected="setInterfaceName($event, i)"
              />
            </div>
            <button @click="removeInterface(i)">x</button>
          </div>

          <input-field label="Adres IP" @input="setIPAddress($event, i)" />
          <input-field
            label="Maska podsieci"
            @input="setSubnetMask($event, i)"
          />
          <input-field label="Opis" @input="setDescription($event, i)" />
        </div>
      </div>

      <check-box
        label="Wyłącz nieużywane interfejsy"
        @change="setDisableUnused"
      />
      <device-card-s-s-h-module
        @change="toggleSSH"
        @domain="setDomainName"
        @username="setSSHUsername"
        @password="setSSHPassword"
        @v2="setSSHVersion"
      />
    </div>
  </div>
</template>

<script>
import InputField from "../InputField.vue";
import DeviceCardSSHModule from "./DeviceCardSSHModule.vue";
export default {
  name: "DeviceCardOptions",
  components: { InputField, DeviceCardSSHModule },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      interfaces: ["GigabitEthernet0/0/0", "GigabitEthernet0/0/1"],
    };
  },
  computed: {
    intList() {
      return this.$store.getters["configuration/getInterfaces"](this.id);
    },
  },
  methods: {
    addInterface() {
      this.$store.dispatch("configuration/addInterface", this.id);
    },
    removeInterface(index) {
      this.$store.dispatch("configuration/removeInterface", {
        index,
        id: this.id,
      });
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
    setDisableUnused(value) {
      const obj = {
        id: this.id,
        disable: value,
      };
      this.$store.dispatch("configuration/setDisableUnused", obj);
    },
    setInterfaceName(item, i) {
      const obj = {
        index: i,
        name: item,
        id: this.id,
      };
      this.$store.dispatch("configuration/setInterfaceName", obj);
    },
    setIPAddress(ip, i) {
      const obj = {
        index: i,
        ip: ip.value,
        id: this.id,
      };
      this.$store.dispatch("configuration/setIPAddress", obj);
    },
    setSubnetMask(mask, i) {
      const obj = {
        index: i,
        mask: mask.value,
        id: this.id,
      };
      this.$store.dispatch("configuration/setSubnetMask", obj);
    },
    setDescription(desc, i) {
      const obj = {
        index: i,
        description: desc.value,
        id: this.id,
      };
      this.$store.dispatch("configuration/setDescription", obj);
    },
    toggleSSH(value) {
      const obj = {
        id: this.id,
        ssh: value,
      };
      this.$store.dispatch("configuration/setSSHModule", obj);
    },
    setDomainName(value) {
      const obj = {
        id: this.id,
        domain: value,
      };
      this.$store.dispatch("configuration/setDomainName", obj);
    },
    setSSHUsername(value) {
      const obj = {
        id: this.id,
        username: value,
      };
      this.$store.dispatch("configuration/setSSHUsername", obj);
    },
    setSSHPassword(value) {
      const obj = {
        id: this.id,
        password: value,
      };
      this.$store.dispatch("configuration/setSSHPassword", obj);
    },
    setSSHVersion(value) {
      const obj = {
        id: this.id,
        version2: value,
      };
      this.$store.dispatch("configuration/setSSHVersion", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.options {
  display: flex;
  flex-direction: column;
  padding: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 20px;

  &__header {
    font-weight: bold;
    font-size: 18px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;

    &__interfaces {
      display: flex;
      flex-direction: column;
      gap: 10px;

      &__item {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 1px solid #333;
        padding: 5px;
        border-radius: 6px;
        &__label {
          display: flex;
          flex-direction: row;
          gap: 10px;
          justify-content: space-between;

          &__text {
            display: flex;
            flex-direction: row;
            gap: 10px;
            align-items: center;
            font-size: 18px;
            font-weight: 700;
          }
        }

        button {
          border: none;
          border-radius: 4px;
          padding: 8px 12px;
          font-size: 14px;
          color: #fff;
          background-color: rgba(158, 37, 0, 0.87);
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }

        .check-box {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
}
</style>
