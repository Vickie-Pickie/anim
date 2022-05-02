function reflow(element) {
  // eslint-disable-next-line no-unused-expressions
  element.offsetHeight;
}

export default function collapse(button, block) {
  const collapseEl = document.createElement('div');
  block.parentElement.insertBefore(collapseEl, block);
  collapseEl.append(block);

  let isOpen = true;
  const transitionEndHandler = () => {
    if (!isOpen) {
      collapseEl.classList.remove('collapsing');
      collapseEl.classList.add('collapsed');
    } else {
      collapseEl.classList.remove('collapsing');
      collapseEl.style.height = '';
    }
  };

  const onClick = () => {
    if (isOpen) {
      collapseEl.style.height = `${collapseEl.offsetHeight}px`;
      reflow(collapseEl);
      collapseEl.classList.add('collapsing');
      collapseEl.style.height = '';
      isOpen = false;
    } else {
      collapseEl.classList.remove('collapsed');
      const height = collapseEl.offsetHeight;
      collapseEl.classList.add('collapsing');
      reflow(collapseEl);
      collapseEl.style.height = `${height}px`;
      isOpen = true;
    }
  };

  button.addEventListener('click', onClick);
  collapseEl.addEventListener('transitionend', transitionEndHandler);
}
