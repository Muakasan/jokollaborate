$(document).on("click", ".prompt-span", function(){
	var punchlineUl = $(this).next();
	punchlineUl.toggle(400);
});

$('#prompt-input').on('keypress', function (event) {
	if(event.which === 13){
		var prompt = $('#prompt-input').val();
		if(prompt!="")
		{
			myDataRef.push({prompt: prompt, punchlines:{}});
			$('#prompt-input').val("");
 		}
 	}
});

var myDataRef = new Firebase('https://jokollaborate.firebaseio.com/');

$(document).on('keypress', '.punchline-input', function (event) {
	if(event.which === 13){
		var punchline = $(this).val();
		if(punchline!="")
		{
			var key = $(this).parent().parent().parent().attr("data-key");
			myDataRef.child(key).child("punchlines").push({text: punchline, votes: 0});
			$(this).val("");
		}
 	}
});

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

	myDataRef.child(snapshot.key()).child("punchlines").on('child_added', function(punchlineSnapshot){
		$("<li>", 
		{
			class: "punchline-li",
			"data-key": punchlineSnapshot.key()
		}).append(
		$("<span>",
		{
			class: "make-punchline-span",
			text: punchlineSnapshot.child("text").val()
		})).insertAfter($("[data-key='" + snapshot.key() +"'] > :nth-child(2)").children(':first-child'));
	});
});