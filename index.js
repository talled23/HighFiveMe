console.log(localStorage.getItem("prevItems"))
var postList = JSON.parse(localStorage.getItem("prevItems"));
console.log(postList);

if (postList != null) {
    for(var i=postList.length-1; i>=0; i--){
        console.log(i);
        makeNewPost(postList[i], i)
    }
    
}

function makeNewPost(postData, index) {
    // later: add id to these elements for CSS purposes
    const element = document.createElement("li");
    element.classList.add('list-group-item');
    element.classList.add('my-5');

    const div1 = document.createElement("div");
    div1.classList.add('card');
    div1.style.width = '18rem';
    element.appendChild(div1);

    const postHeader = document.createElement("div");
    postHeader.classList.add('card-header');

    const postTitle = document.createElement("div");

    postTitle.innerHTML = ("Top 5 " + postData.title).bold();
    postTitle.style.fontSize = '25px'
    postHeader.appendChild(postTitle);

    div1.appendChild(postHeader);

    const tagsHolder = document.createElement("div");
    tagsHolder.classList.add('card-subtitle');
    tagsHolder.classList.add('mb-2');
    tagsHolder.classList.add('text-muted');
    tagsHolder.innerHTML = "Tags: " + postData.tags;
    postHeader.appendChild(tagsHolder);

    const top5list = document.createElement("ul");
    top5list.classList.add('list-group');
    top5list.classList.add('list-group-flush');
    div1.appendChild(top5list);

    for (var i=0; i<5; i++) {
        const item = document.createElement("li");
        item.classList.add('list-group-item');
        item.innerHTML = (i+1) + ". " + postData.items[i];
        top5list.appendChild(item);
    }

    const anchor = document.createElement("a");
    anchor.href = "add.html";
    div1.appendChild(anchor);

    const editPostButton = document.createElement("button");
    editPostButton.classList.add("edit");
    editPostButton.innerHTML="Edit";
    editPostButton.addEventListener("click", ()=> {
        // call a function with post at index "index" in add.js
        localStorage.setItem('editIndex', index);
    })
    anchor.appendChild(editPostButton);

    document.querySelector('ul').appendChild(element);
}