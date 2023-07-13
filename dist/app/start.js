console.log("hello world: from start.ts");
const submitButton = document.getElementById('submit');
const mainContent = document.getElementById('content');
submitButton.onclick = formSubmitted;
function formSubmitted() {
    const textbox = document.getElementById('textareaID');
    const input = textbox.value;
    console.log(`Form Submitted: ${input}`);
    onSucess();
}
// Replace the UI
function onSucess() {
    mainContent.innerHTML = `<h1>Form Submitted</h1></br>
    <button onClick="window.location.reload();">Refresh Page</button>
    `;
}
//# sourceMappingURL=start.js.map