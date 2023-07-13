console.log("hello world: from start.ts");

const submitButton = document.getElementById('submit')
const mainContent = document.getElementById('content')

submitButton.onclick = formSubmitted

function formSubmitted() {
    const textbox = document.getElementById('textareaID') as HTMLInputElement
    const input = textbox.value
    console.log(`Form Submitted: ${input}`);

    onSucess()
}

// Replace the UI
function onSucess() {
    mainContent.innerHTML = `<h1>Todo Sent</h1>
    <button onClick="window.location.reload();">create another</button>
    `
}