function openAnswer(li) {
  const parent = li.parentNode;
  const answerLi = parent.lastElementChild;
  parent.classList.add('clicked');
  answerLi.classList.remove('invisible');
  console.log(li.dataset.true_false)
  if (li.dataset.true_false == '1') {
    answerLi.children[1].classList.add('invisible');
  } else {
    answerLi.firstElementChild.classList.add('invisible');
  }
}