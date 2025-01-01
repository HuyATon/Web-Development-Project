<!-- <template>
  <div id="about">
    <header class="bg-dark text-white text-center py-5 header-about ">
      <div class="container">
        <h1 class="text-black">Contact</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb justify-content-center ">
            <li class="breadcrumb-item"><a href="/" class="text-black">Home</a></li>
            <li class="breadcrumb-item active text-black" aria-current="page">Contact</li>
          </ol>
        </nav>
      </div>
    </header>

    <section class="container py-5">
      <div class="text-center mb-5">
        <h2>Get In Touch With Us</h2>
        <p>For more information about our product & services, please feel free to drop us an email. Our staff always be there to help you out. Do not hesitate!</p>
      </div>
      
      <div class="row text-center mb-5">
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <i class="fas fa-map-marker-alt fa-2x mb-3"></i>
              <h5 class="card-title">Address</h5>
              <p class="card-text">236 5th SE Avenue, New York NY10000, United States</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <i class="fas fa-phone fa-2x mb-3"></i>
              <h5 class="card-title">Phone</h5>
              <p class="card-text">Mobile: (+84) 546-6789<br>Hotline: (+84) 456-6789</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <i class="fas fa-clock fa-2x mb-3"></i>
              <h5 class="card-title">Working Time</h5>
              <p class="card-text">Monday-Friday: 9:00 - 22:00<br>Saturday-Sunday: 9:00 - 21:00</p>
            </div>
          </div>
        </div>
      </div>

      <form class="needs-validation" novalidate>
        <div class="mb-3">
          <label for="name" class="form-label">Your name</label>
          <input type="text" class="form-control" id="name" placeholder="Abc" required>
          <div class="invalid-feedback">
            Please provide your name.
          </div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" placeholder="Abc@def.com" required>
          <div class="invalid-feedback">
            Please provide a valid email address.
          </div>
        </div>
        <div class="mb-3">
          <label for="subject" class="form-label">Subject</label>
          <input type="text" class="form-control" id="subject" placeholder="This is an optional">
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea class="form-control" id="message" rows="4" placeholder="Hi! I'd like to ask about" required></textarea>
          <div class="invalid-feedback">
            Please provide a message.
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </section>
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue'

export default {
  name: 'About',
  components: {
    Footer
  },
  mounted() {
    (() => {
      'use strict'
      const forms = document.querySelectorAll('.needs-validation')
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
    })()
  }
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
.header-about {
  background-image: url('../assets/about-bg.jfif');
  background-size: cover;
  background-position: center;
  
}
</style> -->
<template>
  <div class="about-us">
    <!-- Section 1: Hero Section -->
    <div class=" py-5 hero-about">
      <div class="row align-items-center justify-content-end">
        <div class="col-md-6  text-black p-5 hero-content">
          <h2 class="fw-bold">ABOUT US</h2>
          <p class="mb-4 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

          
        </div>
        
      </div>
    </div>

    <!-- Section 2: Statistics -->
    <div class="bg-light py-5">
      <div class="container text-center">
        <div class="row">
          <div class="col-md-3">
            <h3 class="fw-bold">15K</h3>
            <p>Happy Customers</p>
          </div>
          <div class="col-md-3">
            <h3 class="fw-bold">150K</h3>
            <p>Monthly Visitors</p>
          </div>
          <div class="col-md-3">
            <h3 class="fw-bold">15</h3>
            <p>Countries Worldwide</p>
          </div>
          <div class="col-md-3">
            <h3 class="fw-bold">100+</h3>
            <p>Top Partners</p>
          </div>
        </div>
      </div>
    </div>

    

    <!-- Section 3: Team Section -->
    <div class="container py-5 team-section">
      <h3 class="text-center fw-bold mb-4">Meet Our Team</h3>
      <div class="row text-center">
        <!-- Lặp qua danh sách member -->
        <div class="col-md-3" v-for="(member, index) in members" :key="index">
          <img
            :src="member.image"
            :alt="member.name"
            class="rounded-circle mb-3"
          />
          <h5 class="fw-bold">{{ member.name }}</h5>
          <p>{{ member.profession }}</p>
          <div>
            <!-- Lặp qua danh sách mạng xã hội -->
            <a
              v-for="(social, sIndex) in member.social"
              :key="sIndex"
              :href="social.link"
              class="text-muted me-2"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>


    <div class=" py-5 text-center section-4">
      <div class=" text-black p-5 rounded">
        <h3>Now Let's Grow Yours</h3>
        
          <p class="mb-4 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        
        <button class="btn btn-light" @click="navigateToLogin">Join with us</button>
      </div>
    </div>
    <Footer/>
  </div>

</template>

<script>

import Footer from '@/components/Footer.vue';
import router from '@/router'
export default {
  name: "AboutUs",
  components: {
    Footer,
  },
  data() {
    return {
      members : [
        {
          name: "mem1",
          profession: "dev",
          image: "https://via.placeholder.com/150",
          social: [
            {
              icon: "fab fa-facebook",
              link: "#",
            },
            {
              icon: "fab fa-instagram",
              link: "#",
            },
            {
              icon: "fab fa-twitter",
              link: "#",
            },
          ],
        },
        {
          name: "mem2",
          profession: "dev",
          image: "https://via.placeholder.com/150",
          social: [
            {
              icon: "fab fa-facebook",
              link: "#",
            },
            {
              icon: "fab fa-instagram",
              link: "#",
            },
            {
              icon: "fab fa-twitter",
              link: "#",
            },
          ],
        },
        {
          name: "mem3",
          profession: "dev",
          image: "https://via.placeholder.com/150",
          social: [
            {
              icon: "fab fa-facebook",
              link: "#",
            },
            {
              icon: "fab fa-instagram",
              link: "#",
            },
            {
              icon: "fab fa-twitter",
              link: "#",
            },
          ],
        },
        {
          name: "mem4",
          profession: "dev",
          image: "https://via.placeholder.com/150",
          social: [
            {
              icon: "fab fa-facebook",
              link: "#",
            },
            {
              icon: "fab fa-instagram",
              link: "#",
            },
            {
              icon: "fab fa-twitter",
              link: "#",
            },
          ],
        },
      ],
      methods: {
        navigateToLogin() {
          router.push({ name: 'LoginView'})
        },
      },
    };
  },
};
</script>

<style scoped>
.hero-about {
  background-image: url('../assets/about-bg.jfif');
  background-size: cover;
  background-position: center;
  
}

button {
  background-color: #d4a373;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
}

 button:hover {
  background-color: #b5835a;
}

.hero-content {
  background-color: rgba(255, 255, 255, 0.8);
}

.team-section img {
  background-color: #FCF8F3;
}

.section-6 {
  background-color: #FAF3EA;
}

</style>
