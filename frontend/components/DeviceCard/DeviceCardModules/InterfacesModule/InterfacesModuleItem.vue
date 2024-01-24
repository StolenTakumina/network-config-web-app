<template>
  <div class="interfaces-item">
    <div class="interfaces-item__label">
      <div class="interfaces-item__label__name">
        {{ i + 1 }}.
        <drop-down
          :options="interfaces"
          @selected="setInterfaceName($event, i)"
        />
        <input-field :placeholder="hint" @input="setInterfaceID($event, i)" />
      </div>
      <div class="interfaces-item__label__button" @click="removeInterface(i)">
        <img
          src="../../../../assets/close-icon.png"
          width="24"
          height="24"
          alt="remove-icon"
        />
      </div>
    </div>
    <input-field label="Adres IP" @input="setIPAddress($event, i)" />
    <input-field label="Maska podsieci" @input="setSubnetMask($event, i)" />
    <input-field label="Opis" @input="setDescription($event, i)" />
  </div>
</template>

<script>
export default {
  name: "InterfacesModuleItem",
  data() {
    return {
      interfaces: [
        "FastEthernet",
        "GigabitEthernet",
        "Vlan",
        "Serial",
        "Loopback",
      ],
      pickedInterface: "",
    };
  },
  props: {
    i: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    hint() {
      switch (this.pickedInterface) {
        case "":
          return "Wybierz interfejs";
        case "FastEthernet":
          return "identyfikator np. 0/0/1";
        case "GigabitEthernet":
          return "identyfikator np. 0/0/1";
        case "Serial":
          return "identyfikator np. 0/0/1";
        case "Loopback":
          return "identyfikator np. 1";
        case "Vlan":
          return "VLAN ID np. 1";
      }
    },
  },
  methods: {
    setInterfaceName(item, i) {
      this.pickedInterface = item;
      const obj = {
        index: i,
        name: item,
        id: this.id,
      };
      this.$store.dispatch("configuration/setInterfaceName", obj);
    },
    setInterfaceID(id, i) {
      const obj = {
        index: i,
        intID: id.value,
        id: this.id,
      };
      this.$store.dispatch("configuration/setInterfaceID", obj);
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
    removeInterface(index) {
      this.$store.dispatch("configuration/removeInterface", {
        index,
        id: this.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.interfaces-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 2px solid #131329;
  padding: 8px;
  border-radius: 6px;

  &__label {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;

    &__name {
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;
      font-size: 18px;
      font-weight: 700;
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 4px;
      cursor: pointer;
      background-color: #947f06;
    }
  }
}
</style>
