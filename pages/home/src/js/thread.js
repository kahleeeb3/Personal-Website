function test(data) {

    const HTMLElement = document.getElementById("thread");

    for (const post of data.posts){

        // create post div
        const div = document.createElement("div");
        div.classList.add("post");

        div.innerHTML = `
        <div class="post-header">
            <div class="title-date">
                <a href="${post.link}" class="title">${post.title}</a>
                <p class="date">${post.date}</p>
            </div>
            <div class="image">
                <img src=${post.image} />
            </div>
        </div>
        <div class="abstract">
            <p><b>Description:</b></p>
            <p>${post.description}</p>
        `;
        
        HTMLElement.appendChild(div);
    }
}


loadJSON(`/pages/home/src/json/thread.json`, test);