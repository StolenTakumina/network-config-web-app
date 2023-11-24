<template>
  <div class="checkbox">
    <input
      class="input"
      type="checkbox"
      v-model="isChecked"
      @change="handleChange"
    />
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    handleChange() {
      this.$emit("change", this.isChecked);
    },
  },
};
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
}
</style>
