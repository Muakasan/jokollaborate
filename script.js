var myDataRef = new Firebase('https://sizzling-heat-1186.firebaseio.com/');

/*
myDataRef.once("value", function(snapshot) {
	//var data = snapshot.exportVal();
	snapshot.forEach(function(childSnapshot){
	  	$("#jokesList").append(
		$("<li>", {
			text: childSnapshot.val().prompt,	
			"data-key": childSnapshot.key()

		}));

	})
});
*/
/*
var testkey = "-K0YyESbjiR7biaKRJHu";
var promptRef = myDataRef.child(testkey).child("punchlines");
promptRef.push("test").set({text: "to get to the other side", votes: 0});
*/
/*
$('#submitPromptButton').click(function()
{	
	var prompt = $('#promptInput').val();
	myDataRef.push({prompt: prompt, punchlines:{}});
	$('#promptInput').val("");
});
*/

myDataRef.on('child_added', function(snapshot) {
	$("<li>",
		{
			class: "prompt-li",
			"data-key": snapshot.key()
		}).append(
		$("<span>", 
			{
				class: "prompt-span",
				text: snapshot.val().prompt
			}),
		$("<ul>",
			{
				class: "punchline-ul"
			}).append(
			$("<li>",
				{
					class: "punchline-li"
				}).append(
				$("<span>", 
					{
						class: "make-punchline-span",
						text: "Make a new punchline"
					}),
				$("<input>",
					{
						type: "text",
						placeholder: "Punchline",
						class: "punchline-input"
					})))).insertAfter("#make-prompt-li");
});