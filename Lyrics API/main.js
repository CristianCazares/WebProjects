let songs = [];
let iterator = 0;
function Song(title, artist, lyrics){
	this.title = title;
	this.artist = artist;
	this.lyrics = lyrics;
}

function main(){
	findLyricsP("5 seconds of summer", "Teeth");
	findLyricsP("Twenty One Pilots", "Lane Boy");
	findLyricsP("Imagine Dragons", "Enemy");
	findLyricsP("5 Seconds of Summer", "She Looks So Perfect");
	findLyricsP("VALORANT", "Die For You");
}

main();






function findLyrics(){
	findLyricsP(document.getElementById("artist").value, document.getElementById("title").value);
	/*console.log(
		"https://api.lyrics.ovh/v1/" + 
		document.getElementById("artist").value + "/" +
		document.getElementById("title").value);
	$.get(
		"https://api.lyrics.ovh/v1/" + 
		document.getElementById("artist").value + "/" +
		document.getElementById("title").value,
		function(data){
			document.getElementById("lyrics").innerHTML=data.lyrics.replace(new RegExp("\n","g"), 
			"<br>");
		}
	)*/
}

function findLyricsP(artist, title){
	//console.log("https://api.lyrics.ovh/v1/" + artist + "/" + title);
	$.ajax({
		async: false,
		type: 'GET',
		url: "https://api.lyrics.ovh/v1/" + artist + "/" + title,
		success: function(data){
			var newSong = new Song(title, artist, data.lyrics);
			songs.push(newSong);
			updateSongList(newSong, iterator);
			iterator++;
		}
	});
}

function updateSongListASH2(song, index){
	var h2 = document.createElement("h2");

	h2.setAttribute("class", "song");
	h2.setAttribute("onclick", "showLyrics(" + index + ")")
	
	h2.innerHTML = song.title + "/" + song.artist;
	document.getElementById("songList").appendChild(h2);
}

function updateSongList(song, index){
	var entry = document.createElement("tr");
	entry.setAttribute("class", "song");
	entry.setAttribute("onclick", "showLyrics(" + index + ")")
	
	var cellArtist = document.createElement("td");
	cellArtist.innerHTML = song.artist;
	var cellTitle = document.createElement("td");
	cellTitle.innerHTML = song.title;

	entry.appendChild(cellArtist);
	entry.appendChild(cellTitle);
	document.getElementById("songList").appendChild(entry);
}

function showLyrics(index){
	document.getElementById("lyrics").innerHTML = songs[index].lyrics.replace(new RegExp("\n","g"), "<br>");
}

function deleteEntry(){
	
}

/*
function findLyricsP(id){
	//console.log("https://api.lyrics.ovh/v1/" + artist + "/" + title);
	$.ajax({
		async: false,
		type: 'GET',
		url: "https://api.spotify.com/v1/playlists/" + id + "/tracks",
		success: function(data){
			console.log(data)
		}
	});
}
*/