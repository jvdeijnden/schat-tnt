function slugify(string) {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

$(document).ready(function() {
	$("#search-input").keyup(function(event) {
		if (event.keyCode === 13) {
			$("#search-button").click();
		}
	});
	
	$("#search-button").click(function() {
		var searchSlug = slugify(document.getElementById("search-input").value);
		window.location.href = "search/" + searchSlug;
	});

	Morris.Donut({
		element: 'donut-chart',
	  	data: [
			{label: "Meetinstrumenten", value: 3},
			{label: "Bewegingsondersteuning", value: 2},
			{label: "Overig", value: 1}
	  	]
	});
});