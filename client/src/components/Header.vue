<template>
    <div class="row">
        <div class="col">

        </div>
        <div class="col">

        </div>
        <div class="col">
            <MiniCart/>
            
        </div>
    </div>
</template>

<script>
import MiniCart from '@/components/MiniCart.vue'

export default {
    name: 'Header',
    components: {
        MiniCart
    }
}
</script>