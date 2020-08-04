<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Add Item</h3>
            </div>
             
            <div class="card-body">
               <el-form :model="addData" ref="Add Form">
                   
                    <el-form-item  class="col-sm-6 input-item icon-input">
                  <label>
                    Name
                    <span class="required-star">*</span>
                  </label>
                  <el-input
                    placeholder="Name"
                    name="name"
                    v-model="addData.name"
                    v-validate="'required'"
                    clearable
                  ></el-input>
                  <span class="help-block" v-if="errors.has('name')" >{{errors.first('name')}}</span>
                </el-form-item>
                   <el-form-item  class="col-sm-6 input-item icon-input">
                  <label>
                    Job
                    <span class="required-star">*</span>
                  </label>
                  <el-input
                    placeholder="Job"
                    name="job"
                    v-model="addData.job"
                    v-validate="'required'"
                    clearable
                  ></el-input>
                  <span class="help-block" v-if="errors.has('job')" >{{errors.first('job')}}</span>
                </el-form-item>
                <div class="form-group">
                    
                <el-button
                  type="primary"
                  name="my-button"
                 class="pull-right"
                  :disabled="errors.any() || !isComplete"
                  @click="submitForm()"
                >Add</el-button>
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
export default {
    data() {
        return {
            addData:{
            "name":"",
            "job":""
            },
        }
    },
    methods: {
        
        submitForm()
        {
            var app = this;
            let uri = 'https://reqres.in/api/users';
            this.axios.post(uri, {
                  body: app.addData
            }).then((response) => {
               if(response.status==201)
               {
                    app.$message({
                        message: "Added Item Successfully.",
                        type: "success"
                      });
               }
               else{
                   app.$message({
                        message: "Failed to add item.",
                        type: "error"
                      });
               }
               app.addData.job="";
               app.addData.name="";
               app.$validator.reset();
            });
        }
    },
    computed: {
    isComplete() {
      return this.addData.name && this.addData.job;
    }
  }
}
</script>
<style>
.help-block {
color :red;
}
.required-star {
color :red;
}
</style>