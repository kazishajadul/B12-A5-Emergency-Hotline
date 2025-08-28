1. getElementById, getElementsByClassName, এবং querySelector / querySelectorAll এর মধ্যে পার্থক্য

getElementById("idName")
jokhon akta specefic ID dara kono element selecct kore, result o akta dai


getElementsByClassName("className")
jokhon akta according to class name element er html_collection dai (array r moto kaj kore but array na)



querySelector("CSS selector")
querySelector dara element khuje first element k dai

querySelectorAll("CSS selector")
querySelectorAll dia element khuje nodelist -e dai


2. DOM-এ নতুন element তৈরি ও insert করা

Jamon akta html ami jokhon akta <ul> nia tar moddo <li> rakhlam ar script file likhlam

<HTML>
<body>
<ul>
<li id="class friut-list"> Apple </li>

</ul>


<script>
  let li = document.createElement("li");  
  li.innerText = "Mango";                
 
  let ul = document.getElementById("list");
  ul.appendChild(li);                    
</script>


Output
Apple
Mango

3. Event Bubbling কী এবং কিভাবে কাজ করে

Event bubbling means = kono element-e jokhon  event gote, tokhon seta  parent → grandparent → document upore tuthe jai

<div id="parent" style="background:lightblue; padding:20px;">
  <button id="child">Click Me</button>
</div>
<script>
  document.getElementById("parent").addEventListener("click", () => {
    console.log("Parent clicked");
  });
  document.getElementById("child").addEventListener("click", () => {
    console.log("Child clicked");
  });
</script>

4. What is **Event Delegation** in JavaScript? Why is it useful?
  Event Delegtion amon akta method akhanee parent element e event listener use kora jai
  and paranet er moddo child element gulor event panet dia kaj kora jai

  Event Delegatin website er performance valo hoi, code maintain kora easy hoi

5. What is the difference between **preventDefault() and stopPropagation()** methods?

