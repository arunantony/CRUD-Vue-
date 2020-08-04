<template>
    <div>
       <div class="table-wrapper text-center" >
            <el-table
                    :data="items"
                    stripe
                    :border="true"
                    v-if="items.length!=0"
                  >
                   <el-table-column
                      prop="first_name"
                      label="First Name"
                      sortable
                      min-width="140"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      prop="last_name"
                      label="Last Name"
                      sortable
                      min-width="140"
                      show-overflow-tooltip
                    ></el-table-column>
                     <el-table-column
                      prop="email"
                      label="Email"
                      sortable
                      min-width="140"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column label="Actions" min-width="100" align="center">
                      <template slot-scope="scoped">
                          <el-tooltip effect="light" content="Edit" placement="bottom">
                            <router-link :to="{name: 'Edit', params: { id: scoped.row.id }}" 
                            class="btn btn-primary">Edit</router-link>
                          </el-tooltip>
                          <el-tooltip effect="light" content="Delete" placement="bottom">
                            <el-button   class="custom-icon delete-icon el-icon-delete pointer"  @click="deletevisible = true;delete_id=scoped.row.id;"></el-button>
                          </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-dialog title="Delete Product" :visible.sync="deletevisible" custom-class="col-xs-10 col-sm-6 col-md-5 col-lg-4">
                <p class="mt-15">This action cannot be undone.</p>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deletePro()">Confirm</el-button>
                </span>
      </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items:[],
            deletevisible:false,
            delete_id:''
        }
    },
    mounted() {
        var app = this;
        app.getList();
    },
    methods: {
        getList()
        {
            let uri = 'https://reqres.in/api/users';
              this.axios.get(uri).then((response) => {
                  this.items = response.data.data;
              });
        },
        deletePro()
        {
            var app = this;
            let uri = 'https://reqres.in/api/users/'+app.delete_id;
              this.axios.delete(uri).then((response) => {
                  app.deletevisible=false;
                  if(response.status==204){
                        this.$message({
                        message: "Deleted Item Successfully.",
                        type: "success"
                      });
                  }
                  else{
                      this.$message({
                        message: "Failed to delete item",
                        type: "error"
                      });
                  }
              });
            app.getList();
        }
    }
}
</script>