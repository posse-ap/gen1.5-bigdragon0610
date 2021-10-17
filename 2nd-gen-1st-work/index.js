'use strict'

const modalBg = document.getElementById('modal-bg');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content-wrapper');
const modalDone = document.getElementById('modal-done-wrapper');
const modalPostBtn = document.getElementById('modal-postBtn');

function showmodal() {
    modalBg.classList.add('modal-bg-visible');
    modal.classList.add('modal-visible');
    modalContent.classList.remove('modal-content-wrapper-hidden');
    modalPostBtn.classList.add('modal-postBtn-visible');
}

function closemodal() {
    modalBg.classList.remove('modal-bg-visible');
    modal.classList.remove('modal-visible');
    modalDone.classList.remove('modal-done-wrapper-visible');
    modalPostBtn.classList.remove('modal-postBtn-visible');
}

function showmodalDone() {
    modalContent.classList.add('modal-content-wrapper-hidden');
    modalDone.classList.add('modal-done-wrapper-visible');
    modalPostBtn.classList.remove('modal-postBtn-visible');
}