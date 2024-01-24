<template>
  <div class="card">
    <div class="card__header">
      <device-card-header :id="id" />
      <div class="card__header__buttons">
        <div class="card__header__buttons-collapse" @click="toggleCard">
          <img
            src="../../assets/collapse-icon.png"
            width="34"
            height="34"
            alt="collapse-icon"
            class="image"
          />
        </div>
        <div class="card__header__buttons-remove" @click="remove">
          <img
            src="../../assets/close-icon.png"
            width="34"
            height="34"
            alt="close-icon"
            class="image"
          />
        </div>
      </div>
    </div>
    <div v-show="open" class="card__content">
      <device-card-options :id="id" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DeviceCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      open: true,
    };
  },
  computed: {},
  methods: {
    remove() {
      this.$emit("remove", this.id);
    },
    toggleCard() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss" scoped>
image {
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid #5b89b8;
  padding: 10px;
  width: 100%;
  color: lightgray;

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 10px 20px;
    border-bottom: 2px solid #5b89b8;

    &__buttons {
      display: flex;
      flex-direction: row;
      gap: 10px;

      &-remove {
        width: 34px;
        height: 34px;
        border-radius: 4px;
        cursor: pointer;
        background-color: darkred;
      }

      &-collapse {
        width: 34px;
        height: 34px;
        border-radius: 4px;
        cursor: pointer;
        background-color: #2c3e50;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }
}
</style>
