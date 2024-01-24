<template>
  <div class="interfaces">
    <div class="interfaces__header">
      Konfiguracja interfejsów:
      <div class="interfaces__header__button" @click="toggleInterfaces">
        <img
          src="../../../../assets/collapse-icon.png"
          width="34"
          height="34"
          alt="collapse-icon"
          class="image"
        />
      </div>
    </div>
    <div v-show="showContent" class="interfaces__content">
      <div
        v-for="(el, i) in intList"
        :key="el.intListID"
        class="interfaces__content__item"
      >
        <interfaces-module-item :id="id" :i="i" />
      </div>
      <div class="interfaces__content__button" @click="addInterface">
        <img
          src="../../../../assets/plus-icon.png"
          width="17"
          height="17"
          alt="plus-icon"
          class="image"
        />
        <div class="interfaces__content__button__text">Dodaj interfejs</div>
      </div>
    </div>
  </div>
</template>

<script>
import InterfacesModuleItem from "./InterfacesModuleItem.vue";
export default {
  components: { InterfacesModuleItem },
  name: "InterfacesModule",
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
  computed: {
    intList() {
      return this.$store.getters["configuration/getInterfaces"](this.id);
    },
  },
  methods: {
    toggleInterfaces() {
      this.showContent = !this.showContent;
    },
    addInterface() {
      this.$store.dispatch("configuration/addInterface", this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.interfaces {
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
    gap: 10px;
    justify-content: center;
    padding: 10px;

    &__button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      align-items: center;
      font-size: 18px;
      cursor: pointer;
      background-color: #2c3e50;
      border-radius: 4px;
      padding: 4px;
    }
  }
}
</style>
