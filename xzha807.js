let currentTab = "";
function showHome() {
 if (currentTab != "Home") {
	currentTab = "Home";
	showNoTabs();
	document.getElementById("Home").style.backgroundColor = "lightBlue";
	document.getElementById("SectionHome").style.display = "inline";
 }
}

function showCourses() {
 if (currentTab != "Courses") {
	currentTab = "Courses";
	showNoTabs();
	document.getElementById("Courses").style.backgroundColor = "lightBlue";
	getCourses();
	document.getElementById("SectionCourses").style.display = "inline";
 }
}

function showPeople() {
 if (currentTab != "People") {
	currentTab = "People";
	showNoTabs();
	document.getElementById("People").style.backgroundColor = "lightBlue";
	getPeople();
	document.getElementById("SectionPeople").style.display = "inline";
 }
}

function showNotices() {
 if (currentTab != "Notices") {
	currentTab = "Notices";
	showNoTabs();
	document.getElementById("Notices").style.backgroundColor = "lightBlue";
	getNotices();
	document.getElementById("SectionNotices").style.display = "inline";
 }
}

function showNews() {
 if (currentTab != "News") {
	currentTab = "News";
	showNoTabs();
	document.getElementById("News").style.backgroundColor = "lightBlue";
	getNews();
	document.getElementById("SectionNews").style.display = "inline";
 }
}
function showComments() {
 if (currentTab != "Comments") {
	currentTab = "Comments";
	showNoTabs();
	document.getElementById("Comments").style.backgroundColor = "lightBlue";
	document.getElementById("SectionComments").style.display = "inline";
 }
}

function showNoTabs() {
 document.getElementById("Home").style.backgroundColor = "transparent";
 document.getElementById("Courses").style.backgroundColor = "transparent";
 document.getElementById("People").style.backgroundColor = "transparent";
 document.getElementById("Notices").style.backgroundColor = "transparent";
 document.getElementById("News").style.backgroundColor = "transparent";
 document.getElementById("Comments").style.backgroundColor = "transparent";

 document.getElementById("SectionHome").style.display = "none";
 document.getElementById("SectionCourses").style.display = "none";
 document.getElementById("SectionPeople").style.display = "none";
 document.getElementById("SectionNotices").style.display = "none";
 document.getElementById("SectionNews").style.display = "none";
 document.getElementById("SectionComments").style.display = "none";
}

function showModal() {
   var modal = document.getElementById("SectionModal")  
   modal.style.display = "block"; 
   getSchedules();
}

function getCourses(){
	const uri = 
	"http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/courses";
	const xhr = new XMLHttpRequest();
	xhr.open("Get",uri,true);
	xhr.onload = ()=>{
		const resp = JSON.parse(xhr.responseText);
		resp.data.sort(function(a, b) {return a.catalogNbr - b.catalogNbr});
		DisplayCourses(resp.data);
	}
	xhr.send(null);
}

function DisplayCourses(courses){
	let tableContent = "";
	const addCourse = (course) =>{
		tableContent += "<tr><td>" + "Course ID" + "</td><td id='Modal' class='center' onclick='showModal();'>" + course.subject + " " + course.catalogNbr + "</td></tr>\n";
		tableContent += "<tr><td>" + " " + "</td></tr>\n";
		tableContent += "<tr><td>" + "Course Title" + "</td><td>" + course.titleLong + "</td></tr>\n";
		tableContent += "<tr><td>" + " " + "</td></tr>\n";
		tableContent += "<tr><td>" + "Course Points" + "</td><td>" + course.unitsAcadProg + "</td></tr>\n";
		tableContent += "<tr><td>" + " " + "</td></tr>\n";
		tableContent += "<tr><td>" + "Course Description" + "</td><td>" + course.description + "</td></tr>\n";
		tableContent += "<tr><td>" + " " + "</td></tr>\n";
		tableContent += "<tr><td>" + "Course Prerequisite" + "</td><td>" + course.rqrmntDescr + "</td></tr>\n";
		tableContent += "<tr><td>" + "___" + "</td></tr>\n";
		
	}
	courses.forEach(addCourse);
	document.getElementById("showCourses").innerHTML = tableContent;
}

function getSchedules(){
	var content = document.getElementById("Modal").textContent.split(' ');
	var CID = content[1];
	
	const uri = 
	"http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/course?c="+CID;

	const xhr = new XMLHttpRequest();
	xhr.open("Get",uri,true);
	xhr.onload = ()=>{
		const resp = JSON.parse(xhr.responseText);
		resp.data.filter((element) => element["catalogNbr"] == CID)
		DisplaySchedules(resp.data);
	}
	xhr.send(null);
}

function DisplaySchedules(schedules){
	let LecContent = "";
	let TutContent = "";
	let tableContent = "";
	const addSchedule = (schedule) =>{
		var endDatetmp = schedule.endDate.split('-');
		var endDate= new Date (endDatetmp[0], endDatetmp[1]-1 ,endDatetmp[2]);
		var Today = new Date();
		if(endDate>Today){
			if(schedule.component=="LEC"){
				LecContent += "<tr><td>" + schedule.acadOrg + " " + schedule.catalogNbr + "</td><td>" + schedule.component+ "</td></tr>\n";
				LecContent += "<tr><td>" + "Days and Times" + "</td><td>" + "Room" + "</td></tr>\n";
				
				for (i = 0; i < schedule.meetingPatterns.length; i++){
					LecContent += "<tr><td>" + schedule.meetingPatterns[i].daysOfWeek +" "
					+ schedule.meetingPatterns[i].startTime+":"
					+ schedule.meetingPatterns[i].endTime
					+ "</td><td>" + schedule.meetingPatterns[i].location + "</td></tr>\n";
				}
				LecContent += "<tr><td>" + "___" + "</td></tr>\n";
			}
			else if(schedule.component=="TUT"){
				TutContent += "<tr><td>" + schedule.acadOrg + " " + schedule.catalogNbr + "</td><td>" + schedule.component+ "</td></tr>\n";
				TutContent += "<tr><td>" + "Days and Times" + "</td><td>" + "Room" + "</td></tr>\n";
				for (i = 0; i < schedule.meetingPatterns.length; i++){
					TutContent += "<tr><td>" + schedule.meetingPatterns[i].daysOfWeek +" "
					+ schedule.meetingPatterns[i].startTime+":"
					+ schedule.meetingPatterns[i].endTime
					+ "</td><td>" + schedule.meetingPatterns[i].location + "</td></tr>\n";
				}
				TutContent += "<tr><td>" + "___" + "</td></tr>\n";
			}
		}
		tableContent=LecContent+TutContent;
	}
	schedules.forEach(addSchedule);
	document.getElementById("showSchedules").innerHTML = tableContent;
	
}

function getPeople(){
	const uri = 
	"http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/people";
	const xhr = new XMLHttpRequest();
	xhr.open("Get",uri,true);
	xhr.onload = ()=>{
		const resp = JSON.parse(xhr.responseText);
		DisplayPeople(resp.list);
	}
	xhr.send(null);
}

function DisplayPeople(people){
	let tableContent = "";
	const addPerson = (person) =>{
		var url = 'https://unidirectory.auckland.ac.nz/people/imageraw/{PersonID}/{Imageid}/small';
		var urlVCard = "https://unidirectory.auckland.ac.nz/people/vcard/{PersonID}";
		
		var personId = person.profileUrl[1];
		var ImageId = person.imageId;
		
		if (ImageId == undefined || personId == undefined){
			url='http://redsox.uoa.auckland.ac.nz/ups/logo-115x115.png';
		}
		else{
			url = url.replace(/{PersonID}/, personId);
			url = url.replace(/{Imageid}/, ImageId);
		}
		urlVCard = urlVCard.replace(/{PersonID}/, personId);
		
		var phoneNumber = person.extn == undefined ? "tel:+64 9 373 7599" : "tel:+64 9 373 7599;ext=" + person.extn;
		
		tableContent += "<tr><td>" +"<img src=\"" + url + "\" height=80 width=80></img>" + "</td><td>" + 
		"<a href=\"" + urlVCard +"\">" + '&#128100;' +"</a>"+ " " +
		"<a href=\"" + "mailto:" + person.emailAddresses +"\">" + '&#128231;' +"</a>"+ " " +
		"<a href=\"" + phoneNumber +"\">" + '&#128241;' +"</a>"+
		"</td></tr>\n";
		tableContent += "<tr><td>" + person.names + "</td><td>" + person.jobtitles + "</td></tr>\n";
		tableContent += "<tr><td>" + " " + "</td></tr>\n";
		tableContent += "<tr><td>" + "____________" + "</td></tr>\n";
	}
	people.forEach(addPerson);
	document.getElementById("showPeople").innerHTML = tableContent;
}

function getNews(){
	const uri = 
	"http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/news";
	var xhr = new XMLHttpRequest();
	xhr.open("Get",uri,true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = ()=>{
		const resp = JSON.parse(xhr.responseText);
		DisplayNews(resp);
	}
	xhr.send(null);
}

function DisplayNews(_news){
	let tableContent = "";
	const addNews = (news) =>{
		tableContent += "<tr><td>" + "<a href=\"" + news.linkField + "\">" + news.titleField +"</a>" + "</td></tr>\n";
		tableContent += "<tr><td>" + " " + "</td></tr>\n";
		tableContent += "<tr><td>" + news.pubDateField + "</td></tr>\n";
		tableContent += "<tr><td>" + " " + "</td></tr>\n";
		tableContent += "<tr><td>" + news.descriptionField + "</td></tr>\n";
		tableContent += "<tr><td>" + "_______________" + "</td></tr>\n";
	}
	
	_news.forEach(addNews);
	document.getElementById("showNews").innerHTML = tableContent;
}

function getNotices(){
	const uri = 
	"http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/notices";
	var xhr = new XMLHttpRequest();
	xhr.open("Get",uri,true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = ()=>{
		const resp = JSON.parse(xhr.responseText);
		DisplayNotices(resp);
	}
	xhr.send(null);
}

function DisplayNotices(notices){
	let tableContent = "";
	const addNotice = (notice) =>{
		tableContent += "<tr><td>" + "<a href=\"" + notice.linkField + "\">" + notice.titleField +"</a>" + "</td></tr>\n";
		tableContent += "<tr><td>" + " " + "</td></tr>\n";
		tableContent += "<tr><td>" + notice.pubDateField + "</td></tr>\n";
		tableContent += "<tr><td>" + " " + "</td></tr>\n";
		tableContent += "<tr><td>" + notice.descriptionField + "</td></tr>\n";
		tableContent += "<tr><td>" + "_______________" + "</td></tr>\n";
	}
	
	notices.forEach(addNotice);
	document.getElementById("showNotices").innerHTML = tableContent;
}

function postComments(){
	var comment = document.getElementById('comment').value;
	var name = document.getElementById('name').value;
	const uri = 
	"http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/comment?name=" + name;
	const xhr = new XMLHttpRequest();
	xhr.open("POST",uri,true);
	xhr.setRequestHeader("Content-Type", "application/json");
	/*xhr.setRequestHeader("Content-Length", name.length);*/
	xhr.onload = ()=>{
		location.reload();
	}
	xhr.send(JSON.stringify(comment));
}


window.onload = function () {
 showHome();
}
