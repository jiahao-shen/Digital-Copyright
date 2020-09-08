<template>
  <el-table
		style="width:100%;"
		border
		:data="tableData"
	>
		<el-table-column
      prop="name"
      label="字段"
      >
    </el-table-column>
		<el-table-column
      prop="value"
      label="值"
      >
    </el-table-column>
	</el-table>
</template>
<script>
export default {
	props: {
		tableData: Array
	}
}
</script>

