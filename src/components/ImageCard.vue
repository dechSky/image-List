<script setup lang="ts">
import {useModal} from "vue-final-modal"
import {ImageModel} from "@/service/models/ImageType"
import { computed, ref } from "vue";
import ImageDetailModal from "./ImageDetailModal.vue";

const props = defineProps<{
	image: ImageModel
}>()

const imgLoaded = ref(false)

const customSizeUrl = computed(() => {
	const url = new URL(props.image.download_url)
	return `${url.origin}/id/${props.image.id}/400`
})


const { open, close } = useModal({
	component: ImageDetailModal,
	attrs: {
		image: props.image,
		onClose() {
			close()
		}
	}
})
</script>

<template>
<div class="card" @click="open">
	<img class="image" @load="imgLoaded = true"
		:src="customSizeUrl" 
		onerror="this.src='@/assets/images/no-error-image.jpeg'">
	<img v-if="!imgLoaded" class="image" src="@/assets/images/no-error-image.jpeg">

	<div class="author">
		<p>{{ image.author }}</p>
	</div>
</div> 

</template>
<style scoped>
.card {
  transition: 0.3s;
  width: 400px;
  border-radius: 5px;
	margin: 5px;
	background: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card:hover {
	box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
	cursor: pointer;
}
.image {
	width: 100%;
	border-radius: 5px 5px 0 0;

}
.card.author{
	width: 100%;
  padding: 20px;
}
.image-skeleton {
	width: 100%;
	border-radius: 5px 5px 0 0;
	background-color: var(--loading-grey);
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, .5) 50%,
    rgba(255, 255, 255, 0) 60%
  ) var(--loading-grey);
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;

}

@keyframes image-skeleton {
  to {
    background-position-x: -20%;
  }
}

</style>