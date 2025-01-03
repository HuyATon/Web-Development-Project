<template>
    <div :class="{ 'text-bg-success': this.success, 'text-bg-danger': !this.success }" 
    class="toast fade align-items-center border-0 position-absolute top-0 end-0 p-2" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                {{ message }}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Toast',
    props: {
        success: {
            type: Boolean,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    mounted() {
        const toast = new bootstrap.Toast($(".toast")[0], {
            autohide: false,
            delay: 2000
        })
        toast.show()
    }
}
</script>