<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';


const props = defineProps <{
  currentPage: number
  totalPage: number
  limit: number
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void
  (e: 'addNextList', value: number): void
}>()

const shownPageLeng = 5
const shownStartPage = ref(0)

const lastCardIdx = computed(() => {
  return props.totalPage * props.limit -1
})

onMounted(() => {
  confirmRequiredNextPageByScroll()
})

//스크롤이 마지막 카드 top 위치에  도달할 경우 다음페이지 목록을 가져온다.
const confirmRequiredNextPageByScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const lastCardEl = document.getElementById(`${lastCardIdx.value}`)
  if (lastCardEl && scrollPosition > lastCardEl.offsetTop) {
    emit('addNextList', props.totalPage + 1)
    if (props.currentPage === (shownStartPage.value + 5)) {
      shownStartPage.value += 1
    }
  }
}

//스크롤 이벤트 추적자
const scrollTracker = () => {
  const boundaryTopEl = document.getElementById(`${(props.currentPage * props.limit) - props.limit - 1}`)
  const boundaryBottomEl = document.getElementById(`${props.currentPage * props.limit - 1}`)

  if (props.currentPage > 1 && boundaryTopEl && boundaryTopEl?.offsetTop > window.scrollY) {
    if (props.currentPage > 1) {
      const prevPage = props.currentPage - 1
      if ((shownStartPage.value + 1) > prevPage) shownStartPage.value -= 1
      emit('update:currentPage', prevPage)  
    }
  } else if (boundaryBottomEl && boundaryBottomEl?.offsetTop <= window.scrollY) {
    if (props.currentPage === (shownStartPage.value + 5)) {
      shownStartPage.value += 1
    }
    emit('update:currentPage', props.currentPage + 1)
  }
  
  confirmRequiredNextPageByScroll()
}

//페이지 클릭시 페이지 첫번째 카드 위치로 이동한다.
const targetScrolling = (pageNum: number) => {
  const calcVal = pageNum - 1
  const id = calcVal ? calcVal * props.limit : calcVal
  const currentElement = document.getElementById(`${id}`)
  if (currentElement) {
    const top = (currentElement.getBoundingClientRect().top || 0) + window.scrollY
    window.scroll({top: top + 1, behavior:'smooth'})
  }
}

const goToPrevPage = () => {
  const prevPage = props.currentPage - 1
  if (prevPage > 0) {
    if ((shownStartPage.value + 1) > prevPage) shownStartPage.value -= 1
    targetScrolling(prevPage)  
  }
  
}

const goToNextPage = (event: Event) => {
  const nextPage = props.currentPage + 1
  if (props.currentPage === props.totalPage) {
    emit('addNextList', nextPage) 
  }

  if (props.currentPage === (shownStartPage.value + 5)) {
    shownStartPage.value += 1
  }
  targetScrolling(nextPage)
  event.preventDefault()
}

document.addEventListener('scroll', scrollTracker)
</script>

<template>
  <div class="pagination">
    <ul v-if="currentPage">
      <li class="first" @click="goToPrevPage">&#xE000;</li> 
      
      <template v-for="num in totalPage < shownPageLeng ? totalPage : shownPageLeng" :key="num">
        <li v-if="num <= totalPage"
        :class="{
          selected: Number(num + shownStartPage) === currentPage, 
          }" @click="targetScrolling(num + shownStartPage)">
        <span>{{ Number(num + shownStartPage) }}</span>
        
      </li>
      </template>

      <li class="spinner-li" v-if="loading"><div class="spinner"></div></li>
      <li class="next" @click="goToNextPage">&#xE001;</li>  
    </ul>
  </div>
</template>

<style scope>
.pagination{
  position: fixed;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, 0);
}

.pagination > ul > li {
  float: left;
  padding: 8px 16px;
  list-style-type: none;
  border: 0 solid white;
  background-color: #E6F4F1;
  font-size: 25px;
}
.pagination > ul > li:hover{
  cursor: pointer;
  background-color: #F9F8FF;
}

.pagination > ul >.selected {
  background-color: #00A2EB;
  pointer-events: none;

}
.first {
  border-radius: 10px 0 0 10px;
}

.next {
  border-radius: 0 10px 10px 0;
}

.spinner-li {
  pointer-events: none;
}

.spinner {
  box-sizing: border-box;
  width: 24px;
  height: 31px;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: #00A2EB;
  border-bottom-color: #00A2EB;
  animation: spinner .8s ease infinite;
  pointer-events: none;

}

@keyframes spinner {
  from {transform: rotate(0deg); }
  to {transform: rotate(360deg);}
}

</style>