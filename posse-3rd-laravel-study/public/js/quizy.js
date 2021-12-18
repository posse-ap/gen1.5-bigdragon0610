function openAnswer(li) {
  const parent = li.parentNode;
  const answerLi = parent.lastElementChild;
  parent.classList.add('clicked');
  answerLi.classList.remove('invisible');
  if (li.dataset.true_false == 1) {
    answerLi.children[1].classList.add('invisible');
    li.classList.add('pushed-correct');
  } else {
    answerLi.firstElementChild.classList.add('invisible');
    li.classList.add('pushed-incorrect')
    for (i=0; i<parent.childElementCount-1; i++) {
      if (parent.children[i].dataset.true_false == 1) {
        parent.children[i].classList.add('pushed-correct');
      }
    }
  }
}

//querySelectorAllでdatasetをとってこよう！