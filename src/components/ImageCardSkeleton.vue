<template>
<div class="card loading">
		<div class="image"></div>

		<div class="author">		
		</div>
	</div> 
</template>
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 400px;
  height: 400px;
  border-radius: 5px;
	margin: 5px;
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
  padding: 2px 16px;
}

.loading .image,
.loading h4,
.loading .description {
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

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.loading .card.author {
  min-height: 4rem;
  border-radius: 4px;
  animation-delay: .06s;
}
</style>