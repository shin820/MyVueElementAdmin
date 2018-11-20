<template>
    <div class="attach-list-container">
        <div v-if="title" class="title">{{title}}</div>
        <div class="attach-list">
            <div class="attach" :key="attach.id" v-for="attach in attachs">
                <a v-if="/png/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_PNG.png"/></a>
                <a v-else-if="/jpg/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_JPEG.png"/></a>
                <a v-else-if="/gif/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_GIF.png"/></a>
                <a v-else-if="/bmp/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_BMP.png"/></a>
                <a v-else-if="/jpeg/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_JPEG.png"/></a>
                <a v-else-if="/docx/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_DOCX.png"/></a>
                <a v-else-if="/doc/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_DOCX.png"/></a>
                <a v-else-if="/xlxs/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_XLSX.png"/></a>
                <a v-else-if="/xls/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_XLSX.png"/></a>
                <a v-else-if="/pptx/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_PPTX.png"/></a>
                <a v-else-if="/ppt/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_PPTX.png"/></a>
                <a v-else-if="/zip/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_ZIP.png"/></a>
                <a v-else-if="/rar/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_RAR.png"/></a>
                <a v-else-if="/pdf/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_PDF.png"/></a>
                <a v-else-if="/txt/.test(attach.extension)" target="_blank" :href="attach.url"><img :title="attach.name" :alt="attach.name" src="@/assets/FILE_TEXT.png"/></a>
                <a v-else target="_blank" :href="attach.url"><img src="@/assets/FILE_OTHER.png"/></a>
                <el-tag v-if="attach.tagName"><a target="_blank" :href="attach.url">{{attach.tagName}}</a></el-tag>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    attachs: {
      type: Array,
      required: true
    }
  },
  methods: {
    getFileName(attach) {
      var map = new Map()
      map.set('.pdf', 'FILE_PDF')
      map.set('.txt', 'FILE_TXT')
      map.set('.xlxs', 'FILE_XLXS')
      map.set('.xls', 'FILE_XLXS')
      map.set('.pptx', 'FILE_PPTX')
      map.set('.ppt', 'FILE_PPT')
      map.set('.docx', 'FILE_DOCX')
      map.set('.doc', 'FILE_DOC')

      var name = map[attach.extension]
      return name || 'FILE_TXT'
    }
  }
}
</script>

<style lang="scss" scoped>
.attach-list-container {
    margin-top: 10px;

    .title {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .attach {
      float: left;
      margin-right: 5px;
      margin-bottom: 5px;
      text-align: center;

      .el-tag {
        display: block;
        margin: 0 auto;
        border-radius: 0;
      }
    }
    
    img{
      width: 100px;
      height: 100px;
    }
  }
</style>


