function pasuser(form) {
	if (form.id.value=="StarHunter144") { 
		if (form.pass.value=="asd") {              
			location="starhunter_episodes.html" 
		} else {
			alert("Incorect Password")
		}
	} else {
		alert("Invalid Username")
	}
}