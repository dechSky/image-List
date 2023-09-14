<script setup lang="ts">
import {VueFinalModal} from "vue-final-modal"
import {ImageModel} from "@/service/models/ImageType"
import { computed } from "vue";

const props = defineProps<{
	image: ImageModel
}>()

const emit = defineEmits <{
  (e: 'close'): void
}>()

const customSizeUrl = computed(() => {
	const url = new URL(props.image.download_url)
	return `${url.origin}/id/${props.image.id}/250`
})

const gotoOriginPage = () => {
  window.open(props.image.url, '_blank')
}
</script>

<template>
  <VueFinalModal 
      class="confirm-modal"
      content-class="confirm-modal-content"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade">
    <div class="modal">
      <button class="close-btn" @click="emit('close')">X</button>
      <img class="image" 
      :src="customSizeUrl">
      <div class="middle" @click="gotoOriginPage">
        <div class="text">원본페이지 가기</div>
      </div>

      <div class="info">
        <div>저자 : {{ image.author }}</div>
        <div>width : {{ image.width }}</div>
        <div>height : {{ image.height }}</div>
        <div>다운로드 URL : <a :href="image.download_url" target="_blank">{{ image.download_url }}</a></div>
      </div>
      
    </div> 
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem 3rem 2rem ;
  background: #fff;
  border-radius: 2rem;
}
.confirm-modal-content > * + *{
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 1.375rem;
}
.confirm-modal-content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .confirm-modal-content {
  background: #000;
}
</style>
<style scoped>
.modal {
  position: relative;
  width: 100%;
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
  border-radius: 45px;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  cursor: pointer;
}

.modal:hover .image {
  opacity: 0.3;
}

.modal:hover .middle {
  opacity: 1;
}

.info{
  margin-top: 2rem;
}
.text {
  background-color: #04AA6D;
  color: white;
  font-size: 16px;  padding: 16px 32px;

}

.close-btn {
  position: absolute;
  top: -30px;
  right: 0;
}
</style>
