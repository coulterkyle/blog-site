console.log('linked')

let updateTitle = document.getElementById('edit-title')
let updateText = document.getElementById('edit-text')


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
            document.location.assign(`/blogposts/${id}`);
        }
    }
}