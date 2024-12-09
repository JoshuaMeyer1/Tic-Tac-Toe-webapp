<template>
	<div id="app">
		<app-navbar @navigate="navigateTo" />
		<div class="content">
			<component :is="currentView" />
		</div>
	</div>
</template>

<script>
	import AppNavbar from './components/AppNavbar.vue';
	import AppHome from './views/AppHome.vue';
	import AppAbout from './views/AppAbout.vue';

	export default {
		name: 'App',
		components: {
			AppNavbar,
			AppHome,
			AppAbout,
		},
		data() {
			return {
				currentView: "AppHome",
			};
		},

		created() {
			this.updateView(window.location.pathname);

			window.addEventListener("popstate", () => {
				this.updateView(window.location.pathname);
				});
		},
		methods: {
			updateView(path) {
				if (path === "/about") {
					this.currentView = "AppAbout";
				} else {
					this.currentView = "AppHome";
				}
			},
			navigateTo(path) {
				window.history.pushState({}, "", path);
				this.updateView(path);
			},
		},
	};
</script>

<style>
	/* Global styles */
	html, body {
		height: 100%;
		margin: 0;
	}

	#app {
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	.content {
		flex-grow: 1; /* Allow the content area to expand */
		padding: 0px;
	}
</style>
