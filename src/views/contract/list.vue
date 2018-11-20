<template>
  <div class="app-container data-list-container">
    <div class="filter-container">
      <organization-unit-tree-select :selected="selected" :excludeSection="true" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-select clearable style="width: 120px" class="filter-item" @change="handleFilter" v-model="listQuery.contractStatus" placeholder="合同状态">
        <el-option v-for="item in statuses" :key="item.id" :label="item.name" :value="item.name">
        </el-option>
      </el-select>
      <el-select clearable style="width: 140px" class="filter-item" @change="handleFilter" v-model="listQuery.contractTypeId" placeholder="合同类型">
        <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable style="width: 140px" class="filter-item" @change="handleFilter" v-model="listQuery.projectStatusId" placeholder="项目状态">
        <el-option v-for="item in projectStatuses" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="daterange"
        class="filter-item"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-download" style="margin-left:0px;">导出</el-button> -->
    </div>
    <el-table v-loading="loading" stripe border fit highlight-current-row :data="contracts" style="width: 100%;">
      <el-table-column type="expand">
           <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="项目名称"><span>{{ props.row.projectName }}</span></el-form-item>
              <el-form-item label="合同名称"><span>{{ props.row.name }}</span></el-form-item>
              <el-form-item label="合同编号"><span>{{ props.row.code }}</span></el-form-item>
              <el-form-item label="合同类型"><span>{{ props.row.contractTypeName }}</span></el-form-item>
              <el-form-item label="所属概算"><span>{{ props.row.roughCalculationName }}</span></el-form-item>
              <el-form-item label="合同金额"><span>{{ props.row.contractAmount|chineseAmount }}</span></el-form-item>
              <el-form-item label="变更金额"><span>{{ props.row.alterAmount|chineseAmount }}</span></el-form-item>
              <el-form-item label="已支付金额"><span>{{ props.row.paymentAmount|chineseAmount }}</span></el-form-item>
              <el-form-item label="签订时间"><span>{{ props.row.signedTime|date }}</span></el-form-item>
              <el-form-item label="建设单位"><span>{{ props.row.firstUnitName}}</span></el-form-item>
              <el-form-item label="建设单位负责人"><span>{{ props.row.firstPerson}}</span></el-form-item>
              <el-form-item label="发起人"><span>{{ props.row.initiator}}</span></el-form-item>
              <el-form-item label="发起部门"><span>{{ props.row.aDepartment}}</span></el-form-item>
              <el-form-item label="乙方单位"><span>{{ props.row.secondUnitName}}</span></el-form-item>
              <el-form-item label="乙方单位负责人"><span>{{ props.row.secondPerson}}</span></el-form-item>
              <el-form-item label="乙方标段名称"><span>{{ props.row.secondContractName}}</span></el-form-item>
              <el-form-item label="联合体"><span>{{ props.row.threeUnitName}}</span></el-form-item>
              <el-form-item label="联合体负责人"><span>{{ props.row.threePerson}}</span></el-form-item>
              <el-form-item label="联合体标段名称"><span>{{ props.row.threeContractName}}</span></el-form-item>
              <el-form-item label="项目管理模式"><span>{{ props.row.managementMode}}</span></el-form-item>
              <el-form-item label="合同主要工程"><span>{{ props.row.constructionContent}}</span></el-form-item>
              <el-form-item label="备注"><span>{{ props.row.note}}</span></el-form-item>
            </el-form>
            <attach-list title="合同相关附件" :attachs="props.row.attachmentDtos"></attach-list>
          </template>
      </el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="name" label="合同名称"></el-table-column>
      <el-table-column prop="code" label="合同编号"></el-table-column>
      <el-table-column prop="contractTypeName" label="合同类型"></el-table-column>
      <el-table-column prop="contractStatus" label="合同状态"></el-table-column>
      <el-table-column prop="roughCalculationName" label="所属概算"></el-table-column>
      <el-table-column prop="contractAmount" label="合同金额">
        <template slot-scope="scope">
          <span>{{scope.row.contractAmount|chineseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="alterAmount" label="变更金额">
        <template slot-scope="scope">
          <span>{{scope.row.alterAmount|chineseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentAmount" label="已支付金额">
        <template slot-scope="scope">
          <span>{{scope.row.paymentAmount|chineseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="signedTime" label="签订时间">
        <template slot-scope="scope">
           <span>{{scope.row.signedTime|date}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import AttachList from '@/components/Attachment/AttachList'
import { getContractList } from '@/api/contract'
import { getContractTypes, getContractStatuses, getProjectStatuses } from '@/api/dataDict'
import { mapGetters } from 'vuex'

export default {
  name: 'contract-list',
  data() {
    return {
      selected: null,
      loading: false,
      daterange: [],
      listQuery: {
        organizationId: 0,
        organizationType: 0,
        from: null,
        to: null
      },
      total: 0,
      page: 1,
      pageSize: 10,
      contracts: [],
      statuses: [],
      projectStatuses: [],
      types: []
    }
  },
  components: {
    OrganizationUnitTreeSelect,
    AttachList
  },
  created() {
    this.getQueryFromUrl()
    this.handleFilter()

    getProjectStatuses(this.organizationId).then(response => {
      this.projectStatuses = response.data
    })

    getContractStatuses(this.organizationId).then(response => {
      this.statuses = response.data
    })

    getContractTypes(this.organizationId).then(response => {
      this.types = response.data
    })
  },
  watch: {
    daterange(val) {
      if (val && val.length === 2) {
        this.listQuery.from = val[0]
        this.listQuery.to = val[1]
      } else {
        this.listQuery.from = null
        this.listQuery.to = null
      }
    }
  },
  methods: {
    getQueryFromUrl() {
      this.listQuery.organizationId = this.$route.query.organizationId || null
      this.listQuery.organizationType = this.$route.query.organizationType || null
      if (this.listQuery.organizationId && this.listQuery.organizationType) {
        this.selected = this.listQuery.organizationType + '_' + this.listQuery.organizationId
      }
      this.listQuery.contractStatus = this.$route.query.contractStatus || null
      this.listQuery.contractTypeId = this.$route.query.contractTypeId || null
      this.listQuery.projectStatusId = this.$route.query.projectStatusId || null
      if (this.$route.query.from && this.$route.query.to) {
        this.daterange = [this.$route.query.from, this.$route.query.to]
      }
    },
    handleSelect(payload) {
      this.listQuery.organizationId = payload.id
      this.listQuery.organizationType = payload.type
      this.handleFilter()
    },
    handleFilter() {
      if (!this.listQuery.organizationId || !this.listQuery.organizationType) {
        return
      }
      this.loading = true
      this.listQuery.skipCount = (this.page - 1) * this.pageSize
      this.listQuery.maxResultCount = this.pageSize
      getContractList(this.listQuery).then(response => {
        this.addAttachmentTagName(response.data.items)
        this.contracts = response.data.items
        this.total = response.data.totalCount
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleFilter()
    },
    handleCurrentChange(val) {
      this.page = val
      this.handleFilter()
    },
    addAttachmentTagName(data) {
      data.forEach(t => {
        if (t.attachmentDtos) {
          t.attachmentDtos.forEach(r => {
            if (r.refType === 42) {
              r.tagName = '合同审批记录'
            }
            if (r.refType === 43) {
              r.tagName = '合同文件'
            }
            if (r.refType === 44) {
              r.tagName = '中标通知书'
            }
            if (r.refType === 45) {
              r.tagName = '其他附件'
            }
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters(['organizationId', 'organizationType'])
  }
}
</script>

<style scoped>

.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33.333%;
}
</style>

