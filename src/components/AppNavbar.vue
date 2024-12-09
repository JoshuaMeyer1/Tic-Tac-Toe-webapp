<template>
    <nav class="navbar navbar-expand-lg custom-navbar">
        <a class="navbar-brand custom-navbar-brand">
            <strong>Tic Tac Toe App</strong>
        </a>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="#" class="nav-link custom-nav-link" @click.prevent="navigate('/')">
                    Play
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link custom-nav-link" @click.prevent="navigate('/about')">
                    About
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>
  
<script>
    export default {
        name: "AppNavbar",
        methods: {
            navigate(path) {
            this.$emit("navigate", path); // Emit event
            },
        },
    };
</script>

<style scoped>
    .custom-navbar {
        background-color: #474442; 
        color: #ffffff; 
    }
    .custom-navbar-brand {
        color: #a9bcc7;
    }
    .custom-nav-link {
        color: #ffffff;
    }
    .custom-nav-link:hover {
        color: #a9bcc7;
    }
</style>
  