<template>
    <section>
        <main>
            <div class="title">
                <h2>{{ props.title }}</h2>
            </div>
            <div class="message">
                <p>{{ props.message }}</p>
            </div>
            <div class="actionButton">
                <GlobalButton title="Okay!" @click="closeEvent"></GlobalButton>
            </div>
        </main>
    </section>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue';
    import GlobalButton from './GlobalButton.vue';
    const emits = defineEmits('close-event')
    const props = defineProps({
        title: String,
        message: String
    })

    function closeEvent(){
        emits('close-event')
    }
</script>

<style scoped>
    section{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    main{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 475px;
        background-color: #fff;
        padding: 30px;
        text-align: center;
        border-radius: 10px;
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
        border: 1px solid #ccc;
        transition: all 0.5s;
    }
    .title h2 {
        color: #333;
        font-size: 24px;
        font-weight: bold;
    }
    .message p {
        color: #666;
        font-size: 16px;
    }
    .actionButton {
        margin-top: 20px;
    }

    @media(min-width: 375px){
        main{
            width: 345px;
        }
    }
    @media(min-width: 424px){
        main{
            width: 400px;
        }
    }
    @media(min-width: 500px){
        main{
            width: 475px;
        }
    }
</style>
