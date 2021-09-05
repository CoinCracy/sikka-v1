export function getAllTokens() {
	let req = new XMLHttpRequest();

	req.onreadystatechange = () => {
	if (req.readyState == XMLHttpRequest.DONE) {
		localStorage.setItem("tokenList", req.responseText);
		console.log("Here" + localStorage.getItem("tokenList"));
		// console.log(JSON.parse(req.responseText)["record"]); 
		}
	};

	req.open("GET", "https://api.jsonbin.io/v3/b/61348070dfe0cf16eb5551f2", true);
	req.setRequestHeader("X-Master-Key", "$2b$10$86IauVLmhv5pkFwygAnGO.AVVw5MEPY8j.eafBDdEHgI7.NW6Y4cK");
	req.send();
}
