<template>
<div class="swiperContainer">
    <Swiper :modules="[EffectCube,Pagination]" effect="cube" :grabCursor="true" :loop="true" :cubeEffect="{
        shadow: true,
        slideShadows: false,
        shadowOffset: 20,
        shadowScale: 0.94,
    }"
    :pagination="{clickable: true}">
      <SwiperSlide v-for="(photo, index) in photos" :key="index">
        <img :src="photo" alt="">
      </SwiperSlide>
    </Swiper>
</div>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { EffectCube, Pagination } from 'swiper/modules';
  import 'swiper/css/effect-cube';
  import 'swiper/css/pagination'
  import 'swiper/css';

  
  const photos = [
    'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
    'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg','https://pixlr.com/images/index/ai-image-generator-two.webp', 'https://media.istockphoto.com/id/1166613720/photo/sunflower-in-full-bloom-with-blue-sky.webp?b=1&s=170667a&w=0&k=20&c=kAbs2YK8la_t5kRip_-tFyDroAw4QsKsMKeit9IGA4o='
  ];
  
  </script>

<style scoepd>
    .swiperContainer{
        max-width: 1000px;
        margin: 0 auto;
        padding: 50px 0;
    }
    .swiper{
        width: 400px;
        height: 400px;
        overflow: visible;
    }
    .swiper-slide img{
        width: 100%;
        height: 100%;
    }
</style>