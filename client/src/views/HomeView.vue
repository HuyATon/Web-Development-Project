<template>
  <div id="home">


    <section class="hero d-flex align-items-center justify-content-end">
      <div class="hero-content  p-4 rounded-3 me-4"> 
        <p class="text-muted">New Arrival</p>
        <h1 class="fw-bold ">Discover Our New Collection</h1>
        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button>Buy Now</button>
      </div>
    </section>

    <section class="browse-range py-4 text-center">
      <h2 class="fs-4 mb-2 fw-bold">Browse The Range</h2>
      <p class="mb-4 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div class="categories d-flex justify-content-around">
        <div class="category  p-3 rounded-3 text-center" style="width: 30%;">
          <img src="../assets/home-dining.png" alt="Dining" class="img-fluid rounded-3 mb-3" style="height: 480px; object-fit: cover;">
          <h4>Dining</h4>
        </div>
        <div class="category bg-light p-3 rounded-3 text-center" style="width: 30%;">
          <img src="../assets/home-living.png" alt="Living" class="img-fluid rounded-3 mb-3" style="height: 480px; object-fit: cover;">
          <h4>Living</h4>
        </div>
        <div class="category bg-light p-3 rounded-3 text-center" style="width: 30%;">
          <img src="../assets/home-bedroom.png" alt="Bedroom" class="img-fluid rounded-3 mb-3" style="height: 480px; object-fit: cover;">
          <h4>Bedroom</h4>
        </div>
      </div>
    </section>

    <section class="products py-4 text-center" id="products">
      <h2 class="fs-4 mb-2 fw-bold">Our Products</h2>
      <p class="mb-4 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <div class="product-list d-flex flex-wrap justify-content-around">
        <!-- Products -->
        <div v-if="products.length > 0" class="row p-4">
          <div v-for="product in products" :key="product._id" class="col-md-3 col-6 mb-4">
            <div class="card">
              <img :src="product.image_path" class="card-img-top" style="height: 300px;">
              <div class="card-body">
                <h6 class="fw-bold"> {{ product.name }}</h6>
                <p class="card-text"> {{ product.category }} </p>
                <h6 class="fw-bolder"> ${{ product.price }}</h6>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="d-flex justify-content-center p-4">
          <div>
            <span class="text-secondary">This category has no products...</span>
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item text-black" @click="handleNavigate" :class="{ disabled: currentPage == 1 }"><span
                  class="page-link text-black bg-tint"><span aria-hidden="true">&laquo;</span></span></li>
              <li v-for="page in pageNumb" :key="page" class="page-item text-black" @click="handleNavigate"><span
                  class="page-link text-black bg-tint" :class="{ 'current-active': currentPage == page }"> {{ page }}
                </span></li>
              <li class="page-item text-black" @click="handleNavigate" :class="{ disabled: currentPage == pageNumb }">
                <span class="page-link text-black bg-tint"><span aria-hidden="true">&raquo;</span></span></li>
            </ul>
          </nav>
        </div>
      </div>
    </section>


    <section class="inspiration d-flex justify-content-center py-4 px-5 " >
      <div class="inspiration-content d-flex w-80">
        <div class="inspiration-text flex-1 pe-4">
          <h2 class="fs-4 mb-3 fw-bold">50+ Beautiful rooms inspiration</h2>
          <p class="mb-3 text-muted">Our designer already made a lot of beautiful prototype of rooms that inspire you</p>
          <button>Explore More</button>
        </div>
        <div class="slideshow flex-2 position-relative">
          <div class="slide position-absolute w-80"  v-for="(slide, index) in slides" :key="index" :class="{ active: currentSlide === index }">
            <img :src="slide.image" :alt="slide.title" class="img-fluid rounded-3 mb-3" style="height: 100%; object-fit: cover;">
            <div class="slide-text position-absolute bottom-0 start-0 bg-dark text-white p-3 rounded-3">
              <p class="m-0">{{ slide.number }} — {{ slide.category }}</p>
              <h3 class="my-2">{{ slide.title }}</h3>
              <button>→</button>
            </div>
          </div>
          <button  class="arrow next position-absolute top-50 end-0 translate-middle-y bg-dark text-white border-0 p-2" @click="nextSlide">→</button>

          <div class="navigation position-absolute bottom-0 start-50 translate-middle-x d-flex">
            <span v-for="(slide, index) in slides" :key="index" :class="{ active: currentSlide === index }"
              @click="setSlide(index)"></span>
          </div>
        </div>
      </div>
    </section>

    <section class="share-setup text-center py-4">
      <h2 class="fs-4 m-2 fw-bold ">Share your setup with </h2>
      <h1 class="fw-bold ">#FuniroFurniture</h1>
      <p class="mb-4 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <div class="setup-gallery d-flex justify-content-center flex-wrap gap-2">
        <img src="../assets/setup1.png" alt="Setup 1">
        <img src="../assets/setup3.png" alt="Setup 2">
        <img src="../assets/setup4.png" alt="Setup 3">
        <img src="../assets/setup5.png" alt="Setup 4">
        <img src="../assets/setup6.png" alt="Setup 5">
        <img src="../assets/setup8.png" alt="Setup 6">
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import axios from 'axios'
import router from '@/router'
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    Footer
  },
  data() {
    return {
      products: [],
      offset: 0,
      categories: [],
      total: 0,
      currentPage: 1,
      // Filters & Sort
      limit: 8,
      category: 'all',
      sortOption: 'price_asc',
      // Slideshow
      currentSlide: 0,
      slides: [
        { number: '01', category: 'Bed Room', title: 'Inner Peace', image: require('../assets/home-bedroom.png') },
        { number: '02', category: 'Living Room', title: 'Cozy Corner', image: require('../assets/home-living.png') },
        { number: '03', category: 'Dining Room', title: 'Elegant Dining', image: require('../assets/home-dining.png') }
      ],
      slideInterval: null
    }
  },
  computed: {
    pageNumb() {
      return Math.ceil(this.total / this.limit)
    }
  },
  methods: {
    async loadProducts(resetPage = false) {
      if (resetPage) {
        this.currentPage = 1
        this.offset = 0
      }
      try {
        let response = null
        const limit = parseInt(this.limit) || 8
        if (this.category !== 'all') {
          response = await axios.get(`/products?category=${this.category.toLowerCase()}&limit=${limit}&offset=${this.offset}&sort=${this.sortOption}`)
        }
        else {
          response = await axios.get(`/products?limit=${limit}&offset=${this.offset}&sort=${this.sortOption}`)
        }
        const data = response.data.data
        this.products = data.products
        this.total = data.total
      }
      catch (err) {
        alert(err.message)
      }
    },

    async handleNavigate(e) {
      const page = e.target.innerText
      if (page === '«') {
        if (this.currentPage == 1) { return }
        this.offset -= this.limit
        this.currentPage--

      }
      else if (page === '»') {
        if (this.currentPage == this.pageNumb) { return }
        this.offset += this.limit
        this.currentPage++

      }
      else {
        this.offset = (page - 1) * this.limit
        this.currentPage = page

      }
      this.loadProducts()
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' })
    },
    // Slideshow
    setSlide(index) {
      this.currentSlide = index;
      clearInterval(this.slideInterval);
      this.startSlideShow();
    },
    startSlideShow() {
      this.slideInterval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }, 5000);
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
  },
  mounted() {
    this.loadProducts();
    this.startSlideShow();
  },
  beforeDestroy() {
    clearInterval(this.slideInterval);
  }
}
</script>

<style scoped>
/* Add your styles here */
/* Hero */
.hero {
  background: url('https://s3-alpha-sig.figma.com/img/98fb/219f/a11f805aade2224f1d6658764a2395df?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TcVSCt1gVi6P60SSTygMFPjBvkFI145WeMkfMUP4grhjUie5XcpoP8aGJSo~HADl0Tf2qM0lBB86j1Ft9fhJRMkyvepVWSI7tJ7lnit3K-vX0yNWRflR2lHjzYv~pxdQ6fJK2nKQjMTs8U6DwbqUcwg75Eae0v6tnmk9mcoSvDcTB23dASZpwyGhOSarxB-jgquPX36qJw144mP0HLMh5PiB-b8nIy7lZO136Esp4S-0vxkxd6w0KhheRlqUTpVArd1skkbFPzbJ4xVRHGKXGCb8NKv57J7atuMQk4awZtqkcgVBiBFCJ9FO6fRm8jiwr9lHj1qDwy3CBGmdRlYhtw__') no-repeat center center;
  background-size: cover;
  height: 80vh;
}

.hero-content {
  background-color: #FFF3E3;
  max-width: 400px;
}

.hero-content h1 {
  margin: 0.5rem 0;
  font-size: 2.5rem;
  color: #B88E2F !important;
}

.hero-content p {
  margin: 1rem 0;
  color: #555;
}

.hero-content button {
  background-color: #d4a373;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
}

.hero-content button:hover {
  background-color: #b5835a;
}

/* Browse Range */

.browse-range .category {
  background-color: #f4f4f4;
}

/* Products */
.current-active {
  color: white !important;
  background-color: rgb(172, 148, 58);
}

/* Inspiration */
.inspiration {
  background-color: #FCF8F3;
  height: 60vh;
}

.inspiration-content {
  display: flex;
  width: 80%;
}

.inspiration-text {
  flex: 1;
  padding-right: 2rem;
}

.inspiration-text h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.inspiration-text p {
  margin-bottom: 1rem;
  color: #777;
}

.inspiration-text button {
  background-color: #d4a373;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.inspiration-text button:hover {
  background-color: #b5835a;
}

.slideshow {
  flex: 2;
  position: relative;
}

.slide {
  object-fit: cover;
  display: none;
  position: absolute;
  width: 80%;
  /* height: 100%; */
  transition: opacity 0.5s;
}

.slide.active {
  display: block;
}

.slide img {
  
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 1rem;

}

.slide-text {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 1rem;
  border-radius: 4px;
}

.slide-text p {
  margin: 0;
}

.slide-text h3 {
  margin: 0.5rem 0;
}

.slide-text button {
  background-color: #d4a373;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.slide-text button:hover {
  background-color: #b5835a;
}

.navigation {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.navigation span {
  width: 10px;
  height: 10px;
  background-color: #ddd;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}

.navigation span.active {
  background-color: #d4a373;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.arrow.next {
  right: 10px;
}

/* Share Setup */
.share-setup {
  background-color: #f9f9f9;
}

.share-setup h2 span {
  color: #333;
}

.setup-gallery img {
  width: calc(30% - 1rem);
  border-radius: 8px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .setup-gallery img {
    width: calc(50% - 1rem);
  }
}

@media (max-width: 480px) {
  .setup-gallery img {
    width: 100%;
  }
}

</style>