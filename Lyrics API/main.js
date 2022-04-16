let songs = [];
let iterator = 0;
const lyricsSpace = document.getElementById("lyrics");
function Song(title, artist, lyrics){
	this.title = title;
	this.artist = artist;
	this.lyrics = lyrics;
}

function main(){
	findLyrics("5 seconds of summer", "Teeth");
	findLyrics("Twenty One Pilots", "Lane Boy");
	/*findLyrics("Imagine Dragons", "Enemy");
	findLyrics("5 Seconds of Summer", "She Looks So Perfect");
	findLyrics("VALORANT", "Die For You");*/
	wordOnLyrics(songs[0]);
}

main();






function addSong(){
	findLyrics(document.getElementById("artist").value, document.getElementById("title").value);
}

function findLyrics(artist, title){
	$.ajax({
		async: false,
		type: 'GET',
		url: "https://api.lyrics.ovh/v1/" + artist + "/" + title,
		success: function(data){
			var newSong = new Song(title, artist, data.lyrics);
			songs.push(newSong);
			updateSongList(newSong, iterator);
			iterator++;
			console.log(data.lyrics);
		},
		error: function(xhr, status, error) {
			console.log("COULD NOT FIND: " + title + "/" + artist);
		}		
	});
}

function updateSongList(song, index){
	var entry = document.createElement("tr");
	entry.setAttribute("class", "song");
	entry.setAttribute("onclick", "showLyrics(" + index + ", this)");
	entry.setAttribute("data-state", "hidden");
	
	
	var cellArtist = document.createElement("td");
	cellArtist.innerHTML = song.artist;
	var cellTitle = document.createElement("td");
	cellTitle.innerHTML = song.title;

	entry.appendChild(cellArtist);
	entry.appendChild(cellTitle);
	document.getElementById("songList").appendChild(entry);
}

function showLyrics(index, entry){
	//If the clicked one is hidden
	if(entry.dataset.state == "hidden"){
		//Hide all of them
		var songsEntries = getSongs();
		songsEntries.forEach(song => {
			song.dataset.state = "hidden";
		});
		//Show the clicked one
		lyricsSpace.innerHTML = songs[index].lyrics.replace(new RegExp("\n\n|\n","g"), "<br>");
		entry.dataset.state = "showed";
	}else{
		//If the clicked one is showed. Hide it
		lyricsSpace.innerHTML = "";
		entry.dataset.state = "hidden";
	}
}

function deleteEntries(button){
	if(button.dataset.state == "delete"){
		button.innerHTML = "Done";
		button.dataset.state = "done";

		var songsEntries = getSongs();
		songsEntries.forEach(song =>{
			song.classList.add("deletable");
			song.setAttribute("onclick", "deleteEntry(this)")
		})
	}else{
		button.innerHTML = "Delete";
		button.dataset.state = "delete";
	}
}
function deleteEntry(entry){
	entry.remove();
}



function getSongs(){
	return document.querySelectorAll("[class=song]");
}

var resultLyrics;
function wordOnLyrics(inputSong){
	songs.forEach(song => {
		lyrics = song.lyrics;
		console.log(lyrics);
		
	});
}