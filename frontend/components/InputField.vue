<template>
  <div class="input">
    <div class="input__label">
      {{ label }}
    </div>
    <div class="input__content">
      <input v-if="!password" type="text" v-model="value" @input="saveValue" />
      <div v-else>
        <input :type="visible" v-model="value" @input="saveValue" />
        <button @click="togglePasswordVisibility">
          {{ passwordVisible ? "Ukryj" : "Pokaż" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    label: {
      type: String,
      default: "",
    },
    password: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: "",
      passwordVisible: false,
    };
  },

  computed: {
    visible() {
      return this.passwordVisible ? "text" : "password";
    },
  },
  methods: {
    saveValue() {
      const object = {
        label: this.label,
        value: this.value,
      };
      this.$emit("input", object);
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
  &__label {
    display: flex;
    flex-wrap: wrap;
    width: 150px;
    font-weight: bold;
  }
}
</style>
