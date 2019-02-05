# The BookList

[![Practice](https://img.shields.io/badge/Practice-Javascript-yellow.svg)]() 

A simple project to demonstrate syntactical differences between ES5 and ES6 classes - [View Demo]() 

## What it is
Its a simple book list app using ES5 constructors vs ES6 classes. built with: 

* HTML
* Vanilla JS - ES5 & ES6
* [Skeleton CSS]() - Minimalist light-weight CSS framework 
* [Understanding]() - Mindfulness + Comprehension

## Learning Points
* ES5 Constructors and Prototypes
* ES6 Classes
* DOM Manipulation & Traversal
* Event Handing & Delegation
* Local Storage Object Methods

## The gist of it
Constructors and Prototypes in ES5
```javascript
function Book(prop1,prop2){
  this.prop1 = prop1;
  this.prop2 = prop2;
} // Constructor with properties
Book.prototype.someMethod = function(arg){
  // prototype method
}
const book = new Book(value1, value2); // Instantiate
ui.someMethod(arg); // Use prototype method
```
Here's the same thing but with ES6 classes
```javascript
class UI {
  constructor(prop1,prop2){
    this.prop1 = prop1;
    this.prop2 = prop2;
  }
  someMethod(arg){
    // prototype method
  }
  static someStaticMethod(){
    // a Static prototype method
  }
} // props & methods neatly in class
const book = new Book(prop1, prop2)
```
_sweet sweet syntactical sugar_
But either way is good to go really.

## Acknowledgements
* Special thanks to [@bradtraversy](https://github.com/bradtraversy) for his sheer awesomeness - _Gomenasai Sensei sama_
* And Lord [@torvalds](https://github.com/torvalds) - Lord and Master of Open source. 
* And you, ofcourse, for bothering to read this... bro fist!
_<p align="center">"Adieu, while I meditate on these things. May the `git push --force` be with you"_</p>

<div align="center"><img align="center" src="https://i.imgur.com/bLBIZuy.jpg" width="150"/></div>
