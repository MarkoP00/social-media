<template>
    <button :type="props.type">
        {{ props.title }}
    </button>
</template>

<script setup>
    import {defineProps} from 'vue';

    const props = defineProps({
        title: String,
        type: String
    })
</script>

<style scoped>
button {
      padding: 15px 20px;
      background-color: #007bff;
      width: 100%;
      font-size: 15px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.3s ease;
    }
button:hover {
      background-color: #0056b3;
      letter-spacing: 3px;
    }
</style>