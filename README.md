# Project 4: Around The U.S.


**Description of technologies used**
1. HTML5
2. CSS3
3. JavaScript

<br>
<br>

```javascript
/**
 * This function behave like a toggle funtion that belong to
 * classList
 **/
function toggleEditor() {
  let isContainOpen = popup.classList.contains('popup_open'); /* A ver that with him, I check if I will remove the the class or add */

/*
The logic if it's false, It's mean that the popup window isn't open yet so, we need to add the class and put the the right properties */
  if(!isContainOpen) {
     console.log("hello");
     popup.classList.add('popup_open');
     inputNameElement.value = userNameElement.textContent;
     inputJobElement.value = userJobElement.textContent;
  }
  else {
    popup.classList.remove('popup_open');
  }
}

```

<br>
<br>
**URL to My Website**

[Around The U.S.](https://galiii.github.io/web_project_4/)
