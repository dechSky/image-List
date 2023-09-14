<script setup lang="ts">
import imageService from "@/service/imageService"
import { onMounted, ref } from "vue";
import ImageCard from "./ImageCard.vue"
import { PagenatedList } from "@/service/models/PaginatedList";
import PageIndex from "./pageIndex.vue";
import ImageCardSkeleton from "./ImageCardSkeleton.vue";

const images = ref<PagenatedList>() 
const startPage = 1
const limit = 15

onMounted(async () => {
	images.value = await getImageList(startPage, limit) 
}) 

const addNextList = async (pageNum: number) => {
	if (pageNum === images.value?.nextPage && !images.value.loading) {
		images.value.loading = true
		const res = await getImageList(pageNum, limit)
		images.value.addNextList(res)
	}
	
}

const getImageList = async (page: number, limit: number) => {
	return await imageService.getimageList(page, limit)
}

</script>
<template>
	<div class="card-list" v-if="images">
		<template v-if="images?.data">
			<ImageCard v-for="(image, index) in images?.data" 
			:id="index"
			:key="index" 
			:image="image"
			/>
			<template v-if="images.loading">
				<ImageCardSkeleton v-for="index in limit" :key="index"/>
			</template>
		</template>
		<PageIndex :current-page="images.currentPage" 
				:total-page="images.totalPage"
				:limit="limit"
				:loading="images.loading"
				@add-next-list="addNextList"
		@update:current-page="images.currentPage = $event"/>
	</div>
	<div v-else>
		<div>이미지가 없습니다.</div>
	</div>
	
</template>
<style scoped>
.card-list {
	display: flex;
	flex-flow: row wrap;
	align-items: flex-start;

}
</style>
