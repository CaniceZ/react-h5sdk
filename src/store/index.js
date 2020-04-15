import {observable, action } from 'mobx'

class AppState {
  // 装饰器@
  @observable timer = 0
  @observable desc = ""
  @action
  resetTimer() {
    this.timer = 0;
  }

  @action
  increase() {
    this.timer++;
  }

  @action
  decrease() {
    this.timer--;
  }
  @action
  setDesc(newDesc) {
    this.desc = newDesc;
  }
}
// 将类实例化，后再暴露, 也可以先导出再在组件使用时再实例化
const appState = new AppState()

export default appState;
