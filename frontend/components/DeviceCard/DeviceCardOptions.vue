<template>
  <div class="options">
    <div class="options__content">
      <basic-module :id="id" />
      <interfaces-module :id="id" />
      <access-port-module
        v-if="isSwitch"
        @change="toggleAP"
        @APInt="setAPInterface"
        @APDescription="setAPDescription"
        @VLANID="setVLANID"
      />
      <trunk-port-module
        v-if="isSwitch"
        @change="toggleTP"
        @TPInt="setTPInterface"
        @TPDescription="setTPDescription"
        @VLANRange="setVLANRange"
      />
      <static-route-module
        v-if="isRouter"
        @change="toggleSR"
        @Destination="setDestination"
        @SRSubnet="setSRSubnetMask"
        @NextHop="setNextHop"
      />
      <d-h-c-p-server-module
        @change="toggleDHCP"
        @PoolName="setPoolName"
        @DHCPNetwork="setDHCPNetwork"
        @DefaultRouter="setDefaultRouter"
        @DNS="setDNS"
      />
      <s-s-h-module
        @change="toggleSSH"
        @domain="setDomainName"
        @username="setSSHUsername"
        @password="setSSHPassword"
        @modulus="setSSHModulus"
        @v2="setSSHVersion"
      />
    </div>
  </div>
</template>

<script>
import InputField from "../InputField.vue";
import BasicModule from "./DeviceCardModules/BasicModule.vue";
import SSHModule from "./DeviceCardModules/SSHModule.vue";
import InterfacesModule from "./DeviceCardModules/InterfacesModule/InterfacesModule.vue";
import AccessPortModule from "./DeviceCardModules/AccessPortModule.vue";
import TrunkPortModule from "./DeviceCardModules/TrunkPortModule.vue";
import StaticRouteModule from "./DeviceCardModules/StaticRouteModule.vue";
import DHCPServerModule from "./DeviceCardModules/DHCPServerModule.vue";
export default {
  name: "DeviceCardOptions",
  components: {
    InputField,
    SSHModule,
    BasicModule,
    InterfacesModule,
    AccessPortModule,
    TrunkPortModule,
    StaticRouteModule,
    DHCPServerModule,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    isRouter() {
      return (
        this.$store.getters["configuration/getDeviceType"](this.id) === "Router"
      );
    },
    isSwitch() {
      return (
        this.$store.getters["configuration/getDeviceType"](this.id) === "Switch"
      );
    },
  },
  methods: {
    toggleSSH(value) {
      const obj = {
        id: this.id,
        ssh: value,
      };
      this.$store.dispatch("configuration/setSSHModule", obj);
    },
    toggleAP(value) {
      const obj = {
        id: this.id,
        accessPort: value,
      };
      this.$store.dispatch("configuration/setAccessPortModule", obj);
    },
    setAPInterface(value) {
      const obj = {
        id: this.id,
        apInterface: value,
      };
      this.$store.dispatch("configuration/setAPInterface", obj);
    },
    setAPDescription(value) {
      const obj = {
        id: this.id,
        description: value,
      };
      this.$store.dispatch("configuration/setAPDescription", obj);
    },
    setVLANID(value) {
      const obj = {
        id: this.id,
        vlanID: value,
      };
      this.$store.dispatch("configuration/setVLANID", obj);
    },
    toggleSR(value) {
      const obj = {
        id: this.id,
        sr: value,
      };
      this.$store.dispatch("configuration/setStaticRouteModule", obj);
    },
    setDestination(value) {
      const obj = {
        id: this.id,
        destination: value,
      };
      this.$store.dispatch("configuration/setDestination", obj);
    },
    setSRSubnetMask(value) {
      const obj = {
        id: this.id,
        subnetMask: value,
      };
      this.$store.dispatch("configuration/setSRSubnetMask", obj);
    },
    setNextHop(value) {
      const obj = {
        id: this.id,
        nextHop: value,
      };
      this.$store.dispatch("configuration/setNextHop", obj);
    },
    toggleDHCP(value) {
      const obj = {
        id: this.id,
        dhcp: value,
      };
      this.$store.dispatch("configuration/setDHCPServerModule", obj);
    },
    setPoolName(value) {
      const obj = {
        id: this.id,
        poolName: value,
      };
      this.$store.dispatch("configuration/setPoolName", obj);
    },
    setDHCPNetwork(value) {
      const obj = {
        id: this.id,
        dhcpNetwork: value,
      };
      this.$store.dispatch("configuration/setDHCPNetwork", obj);
    },
    setDefaultRouter(value) {
      const obj = {
        id: this.id,
        defaultRouter: value,
      };
      this.$store.dispatch("configuration/setDefaultRouter", obj);
    },
    setDNS(value) {
      const obj = {
        id: this.id,
        dns: value,
      };
      this.$store.dispatch("configuration/setDNS", obj);
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
    setSSHModulus(value) {
      const obj = {
        id: this.id,
        modulus: value,
      };
      this.$store.dispatch("configuration/setSSHModulus", obj);
    },
    setSSHVersion(value) {
      const obj = {
        id: this.id,
        version2: value,
      };
      this.$store.dispatch("configuration/setSSHVersion", obj);
    },
    toggleTP(value) {
      const obj = {
        id: this.id,
        trunkPort: value,
      };
      this.$store.dispatch("configuration/setTrunkPortModule", obj);
    },
    setTPInterface(value) {
      const obj = {
        id: this.id,
        tpInterface: value,
      };
      this.$store.dispatch("configuration/setTPInterface", obj);
    },
    setTPDescription(value) {
      const obj = {
        id: this.id,
        description: value,
      };
      this.$store.dispatch("configuration/setTPDescription", obj);
    },
    setVLANRange(value) {
      const obj = {
        id: this.id,
        vlanRange: value,
      };
      this.$store.dispatch("configuration/setVLANRange", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 10px;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    gap: 10px;
  }
}
</style>
