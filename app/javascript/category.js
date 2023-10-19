// ブラウザが読み込まれて、loadイベントが発火する
window.addEventListener('turbo:load', function () {
  
  const parentCategory = document.getElementById('parent-category')
  const selectWrap = document.getElementById('select-wrap')
  
  const selectChildElement = (selectForm) => {

  }

  // Ajax通信を可能にする
  const XHR = new XMLHttpRequest();
  const categoryXHR = (id) => {
    XHR.open("GET", `/category/${id}`, true);
    XHR.responseType = "json";
    XHR.send();
  }

  // 子カテゴリーの値を全て取得する関数
  const getChildCategoryData = () => {
    const parentValue = parentCategory.value
    categoryXHR(parentValue)

    // コントローラーからJSON形式でレスポンスの受信が成功した時に、onloadが発火する。
    XHR.onload = () => {
      const items = XHR.response.item;
      appendChildSelect(items)
      const childCategory = document.getElementById('child-select')

      // 子カテゴリーのプルダウンの値が変化することによって孫コテゴリーのイベント発火する
      childCategory.addEventListener('change', () => {
        selectChildElement('grand-child-select-wrap')
        getGrandchildCategoryData(childCategory)
      })
    }
  }

  // 子カテゴリーのプルダウンを表示させる関数
  const appendChildSelect = (items) => {

    const childWrap = document.createElement('div')
    const childSelect = document.createElement('select')

    childWrap.setAttribute('id', 'child-select-wrap')
    childSelect.setAttribute('id', 'child-select')

    // forEach文でitem（子カテゴリーの値）を繰り返す
    items.forEach(item => {
      const childOption = document.createElement('option')
      childOption.innerHTML = item.name
      childOption.setAttribute('value', item.id)
      childSelect.appendChild(childOption)
    });

    childWrap.appendChild(childSelect)
    selectWrap.appendChild(childWrap)
  }

  // 親カテゴリーを選択した後の発火するイベント
  parentCategory.addEventListener('change', function () {
    selectChildElement('child-select-wrap')
    getChildCategoryData()
  })
})