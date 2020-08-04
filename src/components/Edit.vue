<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Edit Item</h3>
            </div>
            <div class="card-body">
                 <el-form :model="editData" ref="Edit Form">
                   
                    <el-form-item  class="col-sm-6 input-item icon-input">
                  <label>
                    Name
                    <span class="required-star">*</span>
                  </label>
                  <el-input
                    placeholder="Name"
                    name="name"
                    v-model="editData.first_name"
                    v-validate="'required'"
                    clearable
                  ></el-input>
                  <span class="help-block" v-if="errors.has('name')" >{{errors.first('name')}}</span>
                </el-form-item>
                   <el-form-item  class="col-sm-6 input-item icon-input">
                  <label>
                    Email
                    <span class="required-star">*</span>
                  </label>
                  <el-input
                    placeholder="Email"
                    name="email"
                    v-model="editData.email"
                    v-validate="'required|email'"
                    clearable
                  ></el-input>
                  <span class="help-block" v-if="errors.has('email')" >{{errors.first('email')}}</span>
                </el-form-item>
                <div class="form-group">
                    
                <el-button
                  type="primary"
                  name="my-button"
                 class="pull-right"
                  :disabled="errors.any() || !isComplete"
                  @click="submitForm()"
                >Update</el-button>
                 <el-button
                  type="clear"
                  name="my-button"
                 class="pull-right"
                 @click="$router.go(-1)"
                >Back</el-button>
                </div>
              </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default{
        data(){
            return{
                item:{},
                editData:{
            "name":"",
            "job":""
            },
            }
        },
        created: function(){
            if(this.$route.params.id)
            {
                this.getItem();
            }
            else{
                 this.$message({
                        message: "Please select an item for editing.",
                        type: "warning"
                      });
            }
        },
        methods: {
            getItem()
            {
              let uri = 'https://reqres.in/api/users/' + this.$route.params.id;
                this.axios.get(uri).then((response) => {
                    this.editData=response.data.data;
                });
            },
             submitForm()
            {
                var app = this;
                let uri = 'https://reqres.in/api/users/'+this.$route.params.id;
                this.axios.put(uri, {
                  body: app.editData
                }).then((response) => {
               if(response.status==200)
               {
                    app.$message({
                        message: "Updated Item Successfully.",
                        type: "success"
                      });
               }
               else{
                   app.$message({
                        message: "Failed to update item.",
                        type: "error"
                      });
               }
              app.$validator.reset();
            });
        }
            
        },
        computed: {
    isComplete() {
      return this.editData.first_name && this.editData.email;
    }
  }
    }
</script>