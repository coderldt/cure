<template>
	<audio :src="current.url" :id="String(current.id)" :poster="current.logo" :name="current.name"
		:action="audioAction" controls></audio>
</template>

<script>
	export default {
		props: {
			current: {
				type: [Object, null],
				default: null
			}
		},
		data() {
			return {
				audioAction: {
					method: 'pause'
				}
			}
		}
	}
</script>

<style>
</style>
