const all_questions = document.getElementById('all_questions');
const to_all_questions = document.getElementById('all_questions_button')
const sort_questions = document.getElementById('sort_questions');
const to_sort_questions = document.getElementById('sort_questions_button');
const sortable_questions = document.getElementById('sortable_questions');

const sort = Sortable.create(sortable_questions, {animation: 200});

to_sort_questions.addEventListener('click', function() {
  all_questions.classList.add('hidden');
  sort_questions.classList.remove('hidden');
});

to_all_questions.addEventListener('click', function() {
  all_questions.classList.remove('hidden');
  sort_questions.classList.add('hidden');
});
