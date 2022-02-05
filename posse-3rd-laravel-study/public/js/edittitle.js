// タイトル数を取得
const title_count = document.querySelectorAll('[data-title_index]').length;

// 編集ボタンを配列として取得
const title_button = [];
for (i = title_count - 1; i >= 0; i--) {
  title_button[i] = document.getElementById(`edit_title_button_${i}`);
}

// 編集ボタンのクリック処理
title_button.forEach((value, i) => {
  value.addEventListener('click', () => {
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

// 移動ボタンを取得
const start_sort_button = document.getElementById('start_sort_button');
const sort_form = document.getElementById('sort_form');
const all_titles = document.getElementById('all_titles');

start_sort_button.addEventListener('click', () => {
  start_sort_button.classList.add('invisible');
  all_titles.classList.add('invisible');
  sort_form.classList.remove('invisible');
})