<template>
  <fieldset class="auth-block">
    <el-checkbox-group v-for='(list, index) in checkList' :key="list.id" v-model="checkValue" @change="handleCheckList">
      <div class="box-title">
        <el-checkbox :label="list.id" @change="handleCheckLevelOne(list.id, index)">{{list.title}}</el-checkbox>
        <el-button class="double-arrow" @click="hideCkeckBox(index)" v-show='showBox[index]'>
          <font-awesome-icon :icon="['fa','angle-double-down']"></font-awesome-icon>
        </el-button>
        <el-button class="double-arrow" @click="showCkeckBox(index)" v-show='!showBox[index]'>
          <font-awesome-icon :icon="['fa','angle-double-up']"></font-awesome-icon>
        </el-button>
      </div>
      <el-row v-for='(children, index1) in list.children' :key="children.id" class="m-row" v-show='showBox[index]'>
        <el-col :span="4" class="box-col1">
          <el-tooltip class="item" effect="dark" :content="children.title" placement="top-start">
            <el-checkbox :label="children.id" @change="handleCheckLevelTwo(children.id, index, index1)">{{children.title}}</el-checkbox>
          </el-tooltip>
        </el-col>
        <el-col :span="20" class="box-col2">
          <el-tooltip class="item" effect="dark" :content="child.title" placement="top-start" v-for="(child, index2) in children.children" :key="child.id">
            <el-checkbox :label="child.id" style="width: 120px;" @change="handleCheckLevelThree(child.id, index, index1, index2)">{{child.title}}</el-checkbox>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-checkbox-group>
    <el-row>
      <el-col :span="24" class="box-title select-all">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAll">全选</el-checkbox>
      </el-col>
    </el-row>
    <p>总值 : {{checkValue}}</p>
  </fieldset>
</template>

<script>
import Vue from "../../../../node_modules/vue/dist/vue.min.js";
import { querAuthorityMenu } from "../../../api/authority.js";

const $querAuthorityMenu = querAuthorityMenu;

export default {
  data() {
    return {
      showBox: [],
      isIndeterminate: true,
      checkAll: false,
      checkValue: [], // 所有多选框的值
      levelOneChecked: [], // 一级选中选项组
      levelTwoChecked: [], // 二级选中选项组
      levelOneNotChecked: [], // 一级未选中选项组
      levelTwoNotChecked: [], // 二级未选中选项组
      checkList: [], // 当前权限树
      checkTwo: [], // 当前第二级选项框数组，用来判断是否与当前级的权限树数组长度一致，来确定父级是否勾选
      checkThree: [] // 当前第三级选项框数组，用来判断是否与当前级的权限树数组长度一致，来确定父级是否勾选
    };
  },
  methods: {
    handleCheckLevelOne(id, index) {
      // console.log('id:' + id)
      // console.log('当前索引:' + index)
      let checkListArr = [];
      // 第二级
      let checkTwoObj = {};
      let checkTwoArr = [];
      // 第三级
      let checkThreeObj1 = {};
      let checkThreeObj2 = {};
      let checkThreeFa = [];
      let checkThreeArr = [];
      if (this.checkList[index].id === id && this.checkValue.indexOf(id) >= 0) {
        this.checkList[index].children.forEach(item => {
          this.levelOneChecked.push(item.id);
          item.children.forEach(item1 => {
            this.levelOneChecked.push(item1.id);
          });
        });
        this.checkValue = Array.from(
          new Set(this.checkValue.concat(this.levelOneChecked))
        );
        this.levelOneNotChecked = [];
        // 把当前的多选框值还原成最开始的权限树结构，来判断第二级是否全部选中，来确定父级是否勾选
        checkTwoObj.grandfatherId = this.checkList[index].id;
        this.checkList[index].children.forEach(item => {
          checkTwoArr.push(item.id);
        });
        checkTwoObj.children = checkTwoArr;
        this.checkTwo.push(checkTwoObj);
        console.log(this.checkTwo);
        // 把当前的多选框值还原成最开始的权限树结构，来判断第三级是否全部选中，来确定父级是否勾选
        checkThreeObj1.grandfatherId = this.checkList[index].id;
        this.checkList[index].children.forEach(item => {
          checkThreeObj2.fatherId = item.id;
          item.children.forEach(item1 => {
            checkThreeArr.push(item1.id);
          });
          checkThreeObj2.children = checkThreeArr;
          checkThreeFa.push(checkThreeObj2);
        });
        checkThreeObj1.children = checkThreeFa;
        this.checkThree.push(checkThreeObj1);
        console.log(this.checkThree);
        // this.checkThree = [
        //   {
        //     grandfatherId: 1,
        //     children: [
        //       {
        //         fatherId: 11,
        //         children: [111, 112, 113, 114]
        //       }
        //     ]
        //   }
        // ]
      } else {
        this.checkList[index].children.forEach(item => {
          this.levelOneNotChecked.push(item.id);
          item.children.forEach(item1 => {
            this.levelOneNotChecked.push(item1.id);
          });
        });
        let setValue = Array.from(new Set(this.checkValue));
        let setindexArr = Array.from(new Set(this.levelOneNotChecked));
        setValue.forEach(item => {
          if (setindexArr.indexOf(item) < 0) {
            checkListArr.push(item);
          }
        });
        this.checkValue = checkListArr;
        this.levelOneChecked = [];
        this.checkThree = [];
        this.checkTwo = [];
      }
    },
    handleCheckLevelTwo(id, index, index1) {
      // console.log('id:' + id)
      // console.log('父级索引:' + index)
      // console.log('当前数组索引:' + index1)
      let checkListArr = [];
      let obj = {};
      let arr = [];
      let list = this.checkList[index].children[index1];
      if (list.id === id && this.checkValue.indexOf(id) >= 0) {
        // 选中当前选项框，子选项框全选
        list.children.forEach(item => {
          this.levelTwoChecked.push(item.id);
        });
        this.checkValue = Array.from(
          new Set(this.checkValue.concat(this.levelTwoChecked))
        );
        this.levelTwoNotChecked = [];
        // 把当前的多选框值还原成最开始的权限树结构，来判断第二级是否全部选中，来确定父级是否勾选
        if (this.checkTwo.length > 0) {
          let levelOneIndex = this.checkTwo.findIndex(item => {
            return item.grandfatherId === this.checkList[index].id;
          });
          if (levelOneIndex >= 0) {
            this.checkTwo[levelOneIndex].children.push(id);
          } else {
            arr.push(id);
            obj.grandfatherId = this.checkList[index].id;
            obj.children = arr;
            this.checkTwo.push(obj);
          }
        } else {
          arr.push(id);
          obj.grandfatherId = this.checkList[index].id;
          obj.children = arr;
          this.checkTwo.push(obj);
        }
        console.log(this.checkTwo);
      } else {
        let levelOneIndex = this.checkTwo.findIndex(item => {
          return item.grandfatherId === this.checkList[index].id;
        });
        if (levelOneIndex >= 0) {
          let i = this.checkTwo.findIndex(item => {
            return item === id;
          });
          this.checkTwo[levelOneIndex].children.splice(i, 1);
        }
        list.children.forEach(item => {
          this.levelTwoNotChecked.push(item.id);
        });
        let setValue = Array.from(new Set(this.checkValue));
        let setindexArr = Array.from(new Set(this.levelTwoNotChecked));
        setValue.forEach(item => {
          if (setindexArr.indexOf(item) < 0) {
            checkListArr.push(item);
          }
        });
        this.checkValue = checkListArr;
        this.levelTwoChecked = [];
      }
      let levelOneIndex = this.checkTwo.findIndex(item => {
        return item.grandfatherId === this.checkList[index].id;
      });
      if (levelOneIndex >= 0) {
        if (
          this.checkTwo[levelOneIndex].children.length ===
          this.checkList[index].children.length
        ) {
          this.checkValue = Array.from(
            new Set(this.checkValue.concat(this.checkList[index].id))
          );
        } else {
          let i = this.checkValue.findIndex(item => {
            return item === this.checkList[index].id;
          });
          if (i >= 0) {
            this.checkValue.splice(i, 1);
          }
        }
      }
    },
    handleCheckLevelThree(id, index, index1, index2) {
      // console.log('id:' + id)
      // console.log('爷爷级索引:' + index)
      // console.log('父级索引:' + index1)
      // console.log('当前数组索引:' + index2)
      let obj1 = {};
      let father = [];
      let obj2 = {};
      let arr = [];
      let list = this.checkList[index].children[index1].children[index2];
      if (list.id === id && this.checkValue.indexOf(id) >= 0) {
        // 把当前的多选框值还原成最开始的权限树结构，来判断第三级是否全部选中，来确定父级是否勾选
        if (this.checkThree.length > 0) {
          let levelOneIndex = this.checkThree.findIndex(item => {
            return item.grandfatherId === this.checkList[index].id;
          });
          if (levelOneIndex >= 0) {
            let levelTwoIndex = this.checkThree[
              levelOneIndex
            ].children.findIndex(item => {
              return (
                item.fatherId === this.checkList[index].children[index1].id
              );
            });
            if (levelTwoIndex >= 0) {
              this.checkThree[levelOneIndex].children[
                levelTwoIndex
              ].children.push(id);
            } else {
              arr.push(id);
              obj1.fatherId = this.checkList[index].children[index1].id;
              obj1.children = arr;
              this.checkThree[levelOneIndex].children.push(obj1);
            }
          } else {
            arr.push(id);
            obj1.fatherId = this.checkList[index].children[index1].id;
            obj1.children = arr;
            father.push(obj1);
            obj2.grandfatherId = this.checkList[index].id;
            obj2.children = father;
            this.checkThree.push(obj2);
          }
        } else {
          arr.push(id);
          obj1.fatherId = this.checkList[index].children[index1].id;
          obj1.children = arr;
          father.push(obj1);
          obj2.grandfatherId = this.checkList[index].id;
          obj2.children = father;
          this.checkThree.push(obj2);
        }
        console.log(this.checkThree);
      } else {
        let levelOneIndex = this.checkThree.findIndex(item => {
          return item.grandfatherId === this.checkList[index].id;
        });
        if (levelOneIndex >= 0) {
          let levelTwoIndex = this.checkThree[levelOneIndex].children.findIndex(
            item => {
              return (
                item.fatherId === this.checkList[index].children[index1].id
              );
            }
          );
          if (levelTwoIndex >= 0) {
            let i = this.checkThree[levelOneIndex].children[
              levelTwoIndex
            ].children.findIndex(item => {
              return item === id;
            });
            if (i >= 0) {
              this.checkThree[levelOneIndex].children[
                levelTwoIndex
              ].children.splice(i, 1);
            }
          }
        }
      }
      let levelOneIndex = this.checkThree.findIndex(item => {
        return item.grandfatherId === this.checkList[index].id;
      });
      if (levelOneIndex >= 0) {
        let levelTwoIndex = this.checkThree[levelOneIndex].children.findIndex(
          item => {
            return item.fatherId === this.checkList[index].children[index1].id;
          }
        );
        if (levelTwoIndex >= 0) {
          if (
            this.checkThree[levelOneIndex].children[levelTwoIndex].children
              .length === this.checkList[index].children[index1].children.length
          ) {
            this.checkValue = Array.from(
              new Set(
                this.checkValue.concat(
                  this.checkList[index].children[index1].id
                )
              )
            );
          } else {
            let i = this.checkValue.findIndex(item => {
              return item === this.checkList[index].children[index1].id;
            });
            if (i >= 0) {
              this.checkValue.splice(i, 1);
            }
          }
        }
      }
    },
    handleCheckList(value) {
      this.checkAll = value.length === this.selectAllCheckBoxId().length;
      this.isIndeterminate =
        value.length > 0 && value.length < this.selectAllCheckBoxId().length;
    },
    handleCheckAll(value) {
      // 第二级
      let checkTwoObj = {};
      let checkTwoArr = [];
      // 第三级
      // let checkThreeObj1 = {}
      // let checkThreeObj2 = {}
      // let checkThreeFa = []
      // let checkThreeArr = []
      this.isIndeterminate = false;
      if (value) {
        this.checkValue = this.selectAllCheckBoxId();
        // 把当前的多选框值还原成最开始的权限树结构，来判断第二级是否全部选中，来确定父级是否勾选
        this.checkList.forEach(item => {
          checkTwoObj.grandfatherId = item.id;
          item.children.forEach(item1 => {
            checkTwoArr.push(item1.id);
          });
          console.log(checkTwoArr);
          checkTwoObj.children = checkTwoArr;
          this.checkTwo.push(checkTwoObj);
        });
        console.log(this.checkTwo);
        // 把当前的多选框值还原成最开始的权限树结构，来判断第三级是否全部选中，来确定父级是否勾选
        // checkThreeObj1.grandfatherId = this.checkList[index].id
        // this.checkList[index].children.forEach(item => {
        //   checkThreeObj2.fatherId = item.id
        //   item.children.forEach(item1 => {
        //     checkThreeArr.push(item1.id)
        //   })
        //   checkThreeObj2.children = checkThreeArr
        //   checkThreeFa.push(checkThreeObj2)
        // })
        // checkThreeObj1.children = checkThreeFa
        // this.checkThree.push(checkThreeObj1)
        // console.log(this.checkThree)

        this.levelOneNotChecked = [];
        this.levelTwoNotChecked = [];
      } else {
        this.checkValue = [];
        this.checkThree = [];
        this.checkTwo = [];
        this.levelOneChecked = [];
        this.levelTwoChecked = [];
      }
    },
    selectAllCheckBoxId() {
      let arr = [];
      this.checkList.forEach(item => {
        arr.push(item.id);
        if (item.hasOwnProperty("children") && item.children) {
          item.children.forEach(item1 => {
            arr.push(item1.id);
            if (item1.hasOwnProperty("children") && item1.children) {
              item1.children.forEach(item2 => {
                arr.push(item2.id);
              });
            }
          });
        }
      });
      return arr;
    },
    showCkeckBox(index) {
      Vue.set(this.showBox, index, true);
    },
    hideCkeckBox(index) {
      Vue.set(this.showBox, index, false);
    }
  },
  mounted() {
    $querAuthorityMenu().then(({ data }) => {
      this.checkList = data;
      for (let i = 0; i < this.checkList.length; i++) {
        this.showBox.push(true);
      }
    });
  }
};
</script>

<style lang='scss' scoped>
@import "../../../assets/scss/theme.scss";
.auth-block {
  border: 0;
  .el-checkbox {
    padding: 6.5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-title {
    background-color: rgba(39, 107, 191, 0.1);
    padding-left: 10px;
    clear: both;
    .double-arrow {
      border: 0;
      float: right;
      color: #2464b3;
      background-color: rgba(255, 255, 255, 0);
      font-size: 14px;
    }
  }
  .m-row {
    &:nth-child(odd) {
      background-color: rgba(39, 107, 191, 0.05);
    }
    .box-col1 {
      padding-left: 20px;
      .el-checkbox {
        width: 240px;
      }
    }
    .box-col2 {
      .el-checkbox {
        width: 120px;
        margin: 0;
        margin-right: 15px;
      }
    }
  }
}
</style>
