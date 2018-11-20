<template>
  <treeselect :value="selectedId" noChildrenText="没有子项" @select="handleSelect" search-nested :clearable="false" :default-expand-level="3" :show-count="true" :options="options" placeholder="请选择集团/子公司/项目/合同段">
    <label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }" :class="labelClassName">
      <span class="label label-primary" v-if="node.id.indexOf('1_')===0">集团</span>
      <span class="label label-success" v-if="node.id.indexOf('2_')===0">分公司</span>
      <span class="label label-info" v-if="node.id.indexOf('3_')===0">项目</span>
      <span class="label label-default" v-if="node.id.indexOf('4_')===0">标段</span>
      <span>{{node.label}}</span>
      <span class="badge" v-if="count>0">{{count}}</span>
    </label>
  </treeselect>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getOrganizationUnitTree } from '@/api/organizationUnit'
import { deepClone } from '@/utils'

export default {
  props: {
    excludeSection: {
      type: Boolean,
      default: false
    },
    excludeProject: {
      type: Boolean,
      default: false
    },
    selected: {
      type: String
    }
  },
  data() {
    return {
      options: [],
      selectedNode: {},
      selectedId: this.selected
    }
  },
  watch: {
    selected(val) {
      this.selectedId = val
    }
  },
  components: {
    Treeselect
  },
  computed: {
    type() {
      return this.selectedNode.type
    }
  },
  mounted() {
    var params = { excludeSection: this.excludeSection, excludeProject: this.excludeProject }
    getOrganizationUnitTree(params).then(response => {
      var data = deepClone(response.data)
      this.normalize(data)
      this.options = data
      if (!this.selected) {
        this.handleSelect(this.options[0])
      }
    })
  },
  methods: {
    select(type, id) {
      this.selectedId = type + '_' + id
      this.$emit('select', { id: id, type: type })
    },
    handleSelect(node) {
      this.selectedNode = node
      this.selectedId = node.id
      this.$emit('select', { id: node.value, type: node.type })
    },
    normalize(options) {
      /* 确保每一项拥有唯一的Id */
      options.forEach(option => {
        option.value = option.id
        option.id = option.type + '_' + option.id
        if (option.children && option.children.length) {
          this.normalize(option.children)
        } else {
          delete option.children
        }
      })
    }
  }
}
</script>

