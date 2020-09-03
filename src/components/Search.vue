<template>
    <div>
        <label for="article_search">Rechercher un article</label>
        <input 
            type="search" 
            v-model.trim="search"  
            aria-label="Rechercher" 
            maxlength="250"
            required />
        <button type="submit">Rechercher</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: ''
        }
    }
}
</script>