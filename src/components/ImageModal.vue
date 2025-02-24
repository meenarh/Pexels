<template>
  <transition name="fade">
    <div class="modal" v-if="visible" @click="closeModal">
      <transition name="zoom">
        <div class="modal-content" @click.stop>
          <span class="close" @click="closeModal">&times;</span>

          <button class="arrow left" @click.stop="prevImage" v-if="hasPrev">
            &lsaquo;
          </button>

          <img :src="imageSrc" alt="Modal Image" />

          <button class="arrow right" @click.stop="nextImage" v-if="hasNext">
            &rsaquo;
          </button>

          <div class="photo-details">
            <h3>{{ user }}</h3>
            <p>{{ location }}</p>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    hasPrev: {
      type: Boolean,
      default: false,
    },
    hasNext: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    prevImage() {
      console.log("Prev Clicked, Index:", this.selectedIndex);
      this.$emit("prev");
    },
    nextImage() {
      console.log("Next Clicked, Index:", this.selectedIndex);
      this.$emit("next");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 20px;

  .modal-content {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    max-height: 90vh;
    width: fit-content;
    height: fit-content;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
    max-width: 100%;
    max-height: 80vh;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #aaa;
    font-size: 24px;
    cursor: pointer;
  }

  .close:hover {
    color: #000;
  }
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
  border: none;
  padding: 12px 18px;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
}

.arrow.left {
  left: 50px;
  background-color: white;
}

.arrow.right {
  right: 50px;
  background-color: white;
}

.arrow:hover {
  background: rgba(0, 0, 0, 0.9);
  color: white;
}

.photo-details {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 0 10px 30px;
  background: white;
  color: black;
  text-align: left;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.photo-details p {
  font-size: 16px;
  font-weight: 400;
  margin: 5px 0;
}

.photo-details h3 {
  font-size: 25px;
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}

.zoom-enter-active,
.zoom-leave-active {
  transition: transform 0.5s ease;

  .zoom-enter,
  .zoom-leave-to {
    transform: scale(0.9);
  }
}
</style>
