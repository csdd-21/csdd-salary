 validateField(form, index) {
      let result = true;
      // for (let item of this.$refs.form.model.datas) {
      //   if (item.prop.split(".")[1] == index) {
      //     this.$refs[form].validateField(item.prop, (error) => {
      //       if (error != "") {
      //         result = false;
      //       }
      //     });
      //   }
      //   if (!result) break;
      // }
      return result;
    },



 validateField(item, index) {
      // let result = true;
       console.log('item, index',item, index);
       console.log('this.$refs',this.$refs['form']);
       
       this.$refs['form'].validateField('datas.0.realSalary',(valid) => {
         console.log('realSalary',valid);
         
         console.log('valid --------',this.$refs['form']);
         
          if (valid) {
            console.log('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      // for (let item of this.$refs.form.model.datas) {
      //   console.log('666',item);
      //   if (item.prop.split(".")[1] == index) {
      //     this.$refs['form'].validateField(item.prop, (error) => {
      //       if (error != "") {
      //         // result = false;
      //       }
      //     });
      //   }
      //   if (!result) break;
      // }
      
      // return result;
    },





validateField() {
      return new Promise((resolve, reject) => {
        this.$refs["form"]
          .validate()
          .then((res) => {
            console.log("res ------------");
            resolve("成功");
          })
          .catch((err) => {
            reject(err);
          });
      });
    },




validateField1(item, index) {
      this.$refs["form"].validate((valid) => {
        console.log("valid ---- ", valid);

        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.$refs["form"].validateField("datas.0.realSalary", (valid, error) => {
      //   console.log("11111", valid, "2222", error);
      //   if (valid) {
      //     console.log("submit!");
      //   }
      // });
      //  this.$refs['form'].validate((valid) => {
      //    console.log('this.$refs',this.$refs['form']);
      //     if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      // for (let item of this.$refs.form.model.datas) {
      //   console.log('666',item);
      //   if (item.prop.split(".")[1] == index) {
      //     this.$refs['form'].validateField(item.prop, (error) => {
      //       if (error != "") {
      //         // result = false;
      //       }
      //     });
      //   }
      //   if (!result) break;
      // }
      // return result;
    },












