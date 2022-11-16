const rootElement = document.querySelector("#root");
rootElement.insertAdjacentHTML(
  "beforeend",
  `
<h2>Add new student to list</h2>
<input type="text" class="name" name="student" placeholder="Add new student" >
<button>Send</button>
`
);
const sendButton = document.querySelector("button");
sendButton.addEventListener("click", (event) => {
  console.log(document.querySelector(".name").value);

  const sendData = {
    name: document.querySelector(".name").value,
    status: true,
  };

  fetch(`/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sendData),
  });
});
