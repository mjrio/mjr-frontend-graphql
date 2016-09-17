# How to view this presentation

    // install reveal-md
    > npm install -g reveal-md

    // open it
    > reveal-md slides.md --title ES6

> Thats all :)

---

### Reveal-md tips

Define slide attributes

    <!-- .slide: data-background="#ff0000" data-transition="zoom" -->
    ## My Slide Title

Fragements

    - Point 1
    <!-- .element: class="fragment" data-fragment-index="1" -->
    - Point 2
    <!-- .element: class="fragment" data-fragment-index="2" -->
    - Point 3
    <!-- .element: class="fragment" data-fragment-index="3" -->

Speaker notes:

    Note: speaker notes FTW!

Images

    ![](https://myImage.jpg)
    ![](./images/myImage.png)

    <img src="https://myImage.jpg" style="width: 400px;"/>
