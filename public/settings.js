$(document).ready(function(){
	if(localStorage.getItem("daily") == null){
		$("#eRTP").hide();
		$("#eRTPText").html("You must track your symptoms once before you can enable Return To Play");
	}

	$("#eRTP").change(function() {
		console.log("entered");
		console.log($("#eRTPbutton"));

	

		if( $("#eRTPbutton")[0].checked ){
			console.log("entered if state");
			
				localStorage.setItem("step", "1000");
				var jsonSym = JSON.parse(localStorage.getItem("daily"));
				localStorage.setItem("form", jsonSym.length-1);
				
			
		}

	});

	$("#eTestMode").change(function() {
		if($("#eTestModeButton")[0].checked){
			localStorage.setItem('test', 'true');

		}
		else{
			localStorage.setItem('test', 'false');
		}
	});

});
