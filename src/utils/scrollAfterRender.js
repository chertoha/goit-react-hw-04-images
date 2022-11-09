export default function scrollAnimationAfterRender() {
  const gallery = document.querySelector('.ImageGallery');

  if (gallery) {
    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
