<template>
  <div class="landing-page">
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        placeholder="Search for photo"
      />

      <button
        v-if="showSearchResults"
        @click="resetSearch"
        class="reset-button"
      >
        Reset Search
      </button>

      <div v-if="searching" class="searching-text">
        <h2>
          Searching for <span>"{{ lastSearchQuery }}"</span>
        </h2>
      </div>

      <div v-if="showSearchResults && !searching" class="search-results">
        <h2>
          Search results for <span>"{{ lastSearchQuery }}"</span>
        </h2>
      </div>
    </div>

    <div
      v-if="showSearchResults && !loading && photos.length === 0"
      class="error"
    >
      <h2>
        No results found for <span>"{{ lastSearchQuery }}"</span>
      </h2>
    </div>

    <div class="container">
      <div v-if="loading" class="skeleton-grid">
        <div v-for="n in 9" :key="n" class="photo-skeleton">
          <div class="skeleton-image"></div>
          <div class="skeleton-details">
            <div class="skeleton-text"></div>
            <div class="skeleton-text short"></div>
          </div>
        </div>
      </div>

      <div class="photo-grid" v-else>
        <div
          v-for="photo in photos"
          :key="photo.id"
          class="photo-card"
          @click="openModal(photo)"
        >
          <img :src="photo.urls.small" :alt="photo.alt_description" />
          <div class="photo-details">
            <h4>{{ photo.user.name }}</h4>
            <p>{{ photo.user.location || "Unknown Location" }}</p>
          </div>
        </div>
      </div>
    </div>

    <ImageModal
      :imageSrc="selectedPhoto?.urls.regular"
      :user="selectedPhoto?.user.name"
      :location="selectedPhoto?.user.location || 'Unknown Location'"
      :visible="isModalVisible"
      :hasPrev="selectedIndex > 0"
      :hasNext="selectedIndex < photos.length - 1"
      @close="closeModal"
      @prev="prevImage"
      @next="nextImage"
    />
  </div>
</template>

<script>
import { getPhotos, searchPhotos } from "@/api/pixora";
import ImageModal from "@/components/ImageModal.vue";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  components: {
    ImageModal,
  },
  data() {
    return {
      photos: [],
      searchQuery: "",
      lastSearchQuery: "",
      selectedPhoto: null,
      selectedIndex: 0,
      isModalVisible: false,
      loading: true,
      searching: false,
      showSearchResults: false,
    };
  },
  async created() {
    await this.fetchLatestPhotos();
  },
  methods: {
    async fetchLatestPhotos() {
      try {
        this.loading = true;
        this.searching = false;
        this.showSearchResults = false;
        await delay(2000);
        this.photos = await getPhotos();
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        this.loading = false;
      }
    },

    async handleSearch() {
      if (!this.searchQuery.trim()) {
        await this.fetchLatestPhotos();
        return;
      }

      try {
        this.loading = true;
        this.searching = true;
        this.showSearchResults = false;
        this.lastSearchQuery = this.searchQuery;

        await delay(2000);
        this.photos = await searchPhotos(this.searchQuery);

        this.showSearchResults = true;
      } catch (error) {
        console.error("Error searching photos:", error);
      } finally {
        this.loading = false;
        this.searching = false;
      }
    },

    resetSearch() {
      this.searchQuery = "";
      this.lastSearchQuery = "";
      this.showSearchResults = false;
      this.fetchLatestPhotos();
    },

    openModal(photo, index) {
      this.selectedPhoto = photo;
      this.selectedIndex = index;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedPhoto = null;
    },
    prevImage() {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
        this.selectedPhoto = this.photos[this.selectedIndex];
      }
    },
    nextImage() {
      if (this.selectedIndex < this.photos.length - 1) {
        this.selectedIndex++;
        this.selectedPhoto = this.photos[this.selectedIndex];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  background-color: #e2e8f0;
  padding: 150px 10px 180px 10px;
  z-index: 0;

  input {
    position: absolute;
    padding: 20px;
    width: 80%;
    border: 1px solid #ddd;
    border-radius: 12px;
    margin-right: 10px;
    font-size: 1em;
    outline: none;
  }

  input::placeholder {
    color: #575656;
  }

  .searching-text {
    text-align: center;
    margin-top: -80px;
    margin-bottom: 20px;
  }

  .searching-text h2 {
    color: #02105b;
    font-size: 3em;
    text-align: left;
    font-weight: 500;
  }

  .searching-text h2 > span {
    color: #716f6f;
  }

  .search-results {
    text-align: center;
    margin-top: -80px;
    margin-bottom: 20px;
  }

  .search-results h2 {
    color: #02105b;
    font-size: 3em;
    text-align: left;
    font-weight: 500;
  }

  .search-results h2 > span {
    color: #716f6f;
  }

  .reset-button {
    position: absolute;
    right: 10px;
    margin-top: 10px;
    padding: 8px 15px;
    border: none;
    background-color: #ff5a5f;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;

    .reset-button:hover {
      background-color: #e04950;
    }
  }
}
.error {
  text-align: center;
  margin-top: 50px;

  h2 {
    font-size: 2em;
    color: #ff6347;
    font-weight: 500;
  }
}

.container {
  margin-top: -90px;
  padding: 0 40px 0 150px;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 60px 0 60px;
}
.photo-card {
  position: relative;
  width: 100%;
  height: auto;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 15%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    transition: opacity 0.3s ease;
    opacity: 0.8;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  .photo-details {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    z-index: 2;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  }

  .photo-details h4 {
    font-size: 1.2em;
    font-weight: 500;
  }

  &:hover img {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
}

.photo-card:nth-child(3n + 2) {
  margin-top: 40px;
}

.photo-card img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: -40px;
  z-index: 1;

  .photo-skeleton:nth-child(3n + 2) {
    margin-top: 40px;
  }
}

.photo-skeleton {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;

  .skeleton-image {
    width: 100%;
    height: 400px;
    background-color: #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
    animation: shimmer 1.5s infinite;
  }

  .skeleton-details {
    .skeleton-text {
      height: 15px;
      background-color: #ddd;
      border-radius: 4px;
      margin-bottom: 8px;
      animation: shimmer 2s infinite;

      &.short {
        width: 60%;
      }
    }
  }
}

@keyframes shimmer {
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
}

@media (max-width: 1200px) {
  .search-bar {
    padding: 100px 10px 120px 10px;

    input {
      width: 90%;
    }
  }

  .container {
    padding: 0 20px;
    margin-bottom: 20px;
  }

  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin: 0 30px;
  }
  .photo-card:nth-child(3n + 2) {
    margin-top: 0;
  }

  .skeleton-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin: 0 30px;
  }

  .photo-skeleton:nth-child(3n + 2) {
    margin-top: 0;
  }
}

@media (max-width: 768px) {
  .search-bar {
    padding: 80px 10px 100px 10px;

    input {
      width: 95%;
    }
  }

  .search-results h2 {
    font-size: 2.5em;
  }

  .container {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .photo-grid {
    grid-template-columns: 1fr;
    gap: 8px;
    margin: 0 20px;
  }

  .photo-card:nth-child(3n + 2) {
    margin-top: 0;
  }

  .skeleton-grid {
    grid-template-columns: 1fr;
    gap: 8px;
    margin: 0 30px;
  }

  .photo-skeleton:nth-child(3n + 2) {
    margin-top: 0;
  }
}

@media (max-width: 480px) {
  .search-bar {
    padding: 60px 10px 80px 10px;

    input {
      width: 90%;
      padding: 15px;
      font-size: 0.9em;
    }
  }

  .search-results h2 {
    font-size: 2em;
  }

  .container {
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 0 10px;
  }

  .photo-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .photo-card:nth-child(3n + 2) {
    margin-top: 0;
  }

  .skeleton-grid {
    grid-template-columns: 1fr;
    gap: 8px;
    margin: 0 30px;
  }

  .photo-skeleton:nth-child(3n + 2) {
    margin-top: 0;
  }
}
</style>
