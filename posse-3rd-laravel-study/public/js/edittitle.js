// タイトル数を取得
const title_count = document.querySelectorAll('[data-title_index]').length;

// 編集ボタンを配列として取得
const title_button = [];
for (i = title_count - 1; i >= 0; i--) {
  title_button[i] = document.getElementById(`edit_title_button_${i}`);
}

// 編集ボタンのクリック処理
title_button.forEach((button, i) => {
  button.addEventListener('click', () => {
    let edit_title = document.getElementById(`edit_title_${i}`);
    let link_title = document.getElementById(`link_title_${i}`);
    let edit_title_button = document.getElementById(`edit_title_button_${i}`);
    let edit_submit_button = document.getElementById(`edit_submit_button_${i}`);
    edit_title.classList.remove('invisible');
    link_title.classList.add('invisible');
    edit_title_button.classList.add('invisible');
    edit_submit_button.classList.remove('invisible');
  });
});

// sort用のinput、↑ボタン、↓ボタンを取得
const input_sort = [];
const sort_up = [];
const sort_down = [];
for (i = title_count - 1; i >= 0; i--) {
  input_sort[i] = document.getElementById(`input_sort_${i}`);
  sort_up[i] = document.getElementById(`sort_up_${i}`);
  sort_down[i] = document.getElementById(`sort_down_${i}`);
}

const title_table_main = document.getElementById('title_table_main');

sort_up.forEach((button, i) => {
  button.addEventListener('click', () => {
    let clicked_sort = parseInt(input_sort[i].value);
    if (clicked_sort == 0) {
      ;
    } else {
      let above_clicked_sort = document.querySelector(`[data-sort="${clicked_sort - 1}"]`);
      above_clicked_sort.value = clicked_sort;
      above_clicked_sort.dataset.sort = `${clicked_sort}`;
      input_sort[i].value = clicked_sort - 1;
      input_sort[i].dataset.sort = `${clicked_sort - 1}`;
      let clicked_title = document.querySelector(`[data-title_index="${clicked_sort}"]`);
      let above_clicked_title = document.querySelector(`[data-title_index="${clicked_sort - 1}"]`);
      title_table_main.insertBefore(clicked_title, above_clicked_title);
      clicked_title.dataset.title_index = `${clicked_sort - 1}`;
      above_clicked_title.dataset.title_index = `${clicked_sort}`;
    }
  })
})

sort_down.forEach((button, i) => {
  button.addEventListener('click', () => {
    let clicked_sort = parseInt(input_sort[i].value);
    if (clicked_sort == title_count -1) {
      ;
    } else {
      let below_clicked_sort = document.querySelector(`[data-sort="${clicked_sort + 1}"]`);
      below_clicked_sort.value = clicked_sort;
      below_clicked_sort.dataset.sort = `${clicked_sort}`;
      input_sort[i].value = clicked_sort + 1;
      input_sort[i].dataset.sort = `${clicked_sort + 1}`;
      let clicked_title = document.querySelector(`[data-title_index="${clicked_sort}"]`);
      let below_clicked_title = document.querySelector(`[data-title_index="${clicked_sort + 1}"]`);
      title_table_main.insertBefore(below_clicked_title, clicked_title);
      clicked_title.dataset.title_index = `${clicked_sort + 1}`;
      below_clicked_title.dataset.title_index = `${clicked_sort}`;
    }
  })
})