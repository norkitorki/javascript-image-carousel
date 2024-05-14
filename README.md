## Javascript Image-Carousel

This image carousel built with simple javascript and css allows you to display a collection of images.

Images can be traversed via the designated buttons to the left or right of the container, left or right arrows on your keyboard, 
as well as clicking the navigation circles at the bottom of the container.

## Usage

Add the contents of image-carousel.js and image-carousel.css to your code.

Append your images to the div element with a class value of 'slides'.

### html

```html
<section class="my-image-carousel">
  <div class="image-carousel">
    <div class="carousel-frame">
      <button class="arrow-left"><</button>
      <div class="slides">
        <!-- Append your images via <img> elements to this div -->
      </div>
      <button class="arrow-right">></button>
    </div>
    <div class="carousel-navigator"></div>
  </div>
</section>
```

### javascript

```javascript
const myImageCarousel = document.querySelector('.my-image-carousel');

imageCarousel(myImageCarousel, {
  height: 600,
  slideInterval: 5,
  revertTraversal: true,
});
```

## Options

The following arguments can be passed to the options hash:

```
height: Number           # The number of pixels that the image carousel will take up vertically
slideInterval: Number    # If number is bigger than 0, represents the interval before traversing to the next slide
revertTraversal: Boolean # When slideInterval is bigger than 0, reverts automatic slide traversal when reaching the last image
```
