<template>
  <div class="components-container">
    <div>
      <tinymce v-model="content" :height="300" :content="content"/>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  watch: {
    content() {
      this.$emit('contentChange', this.content)
    }
  },
  data() {
    return {
      content:''
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>