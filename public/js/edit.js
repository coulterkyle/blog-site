console.log('linked')

let updateTitle = document.getElementById('edit-title')
let updateText = document.getElementById('edit-text')

function test () {
    const data = `"title": "${updateTitle.value}" + "text": "${updateText.value}"`
    console.log(data)
}

async function updatePost(id) {
    let data = {
        "title": `${updateTitle.value}`,
        "text": `${updateText.value}`
    }
    if (id) {
        const updateRequest = await fetch(`/api/blogposts/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
            
        });

        if (updateRequest.ok) {
            // const rePopulate = await fetch('/mymeals', {
            //     method: "GET",
            //     headers: { 'Content-Type': 'application/json' },
            // })
            alert("Post successfully updated!")
            document.location.assign(`/blogposts/${id}`);
        }
    }
}