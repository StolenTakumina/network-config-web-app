<template>
  <div class="custom-dropdown">
    <div class="dropdown-header" @click="toggleDropdown">
      <span class="selected-option">{{ selected }}</span>
      <div class="dropdown-icon" :class="{ open: isOpen }"></div>
    </div>
    <div class="dropdown-content" v-show="isOpen">
      <div
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
        class="dropdown-option"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: "Wybierz",
      isOpen: false,
    };
  },
  methods: {
    selectOption(option) {
      this.selected = option;
      this.isOpen = false;
      this.$emit("selected", option);
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-dropdown {
  position: relative;
  width: 175px;
  height: fit-content;
  .dropdown-header {
    display: flex;
    align-items: center;
    padding: 5px;
    height: 20px;
    border: 2px solid #2c3e50;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    background-color: #34495e;
    color: #ecf0f1;
    user-select: none;

    .selected-option {
      flex: 1;
    }

    .dropdown-icon {
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top-color: #ecf0f1;
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      transition: transform 0.3s ease;
      &.open {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }

  .dropdown-content {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    overflow: hidden;
    background-color: #536475;
    z-index: 1;
    color: white;

    .dropdown-option {
      padding: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #2c3e50;
        color: #ecf0f1;
      }
    }
  }
}
</style>
