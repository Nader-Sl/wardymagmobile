/* JSONP */
var maxLength = 10;//based on how list items
var loader = null;
var permas = {};//an map hold articles permalinks
var excerptLength = 50;


/**
 * Comment
 */
function getExcerpt(title)
{
return title.substring(0,excerptLength)+(title.length<excerptLength?"":"...");
}

function handleFeed(data) {

 
    var articleLength = data.length;
	if(articleLength === 0)return;
    articleLength = (articleLength > maxLength) ? maxLength : articleLength;
	permas = {};
    for (var i = 1; i <= articleLength; i++) {

        var entry = data[i - 1]; 
	
       $('#list' + i).show();
	    var decodedTitle = $('<div/>').html(entry.title).text();//decode html to inject final text.
        $('#link' + i).text(getExcerpt(decodedTitle));
        $('#articleHeader' + i).text(decodedTitle);
	    permas[''+i] = entry.permalink;//store the permalink to the associative arr

      //entry.content = '<p dir="rtl"><iframe width="560" height="315" src="http://www.youtube.com/embed/K5t4NzeNzr4" class="youtube" frameborder="0" allowfullscreen></iframe></p>'+
//'<p dir="rtl">فيلم "وردي" .. مشاركة مركز الشيخ محمد حسين العمودي للتميز في الرعاية الصحية لسرطان الثدي في اليوم العالمي للسرطان 4 فبراير 2013، ومعلوم أن د.سامية العمودي المدير التنفيذي هي أول خليجية يتم ترشيحها لعضوية مجلس إدارة الإتحاد الدولي للسرطان بجنيف.</p>'
  $('#articleContent' + i + ' p' ).html(unescape(entry.content));	
	var thumbnail = entry.thumbnail;
	    if(thumbnail !== ""){
	
				
	 var item = $("#listItem"+i);
	 var cont = item.find(".resize-and-crop");
	 var $img = item.find("img");
	 if(cont.length == 0)
              { 

			 }else {//hasn't been cropped before
			item.html(cont.html());//remove old cont
			$img = item.find("img");//redefine img since html structure was altered.
		    $img.addClass("thumb");
					 }
			         
			 $img.attr('src',thumbnail);
		     $img.resizeAndCrop();
			 
			
	if(i === 1)//featured
	{	

	$(".featured-article").find("img").attr('src',thumbnail);
    $(".featured-title").find("a").text( getExcerpt(entry.title));
	}
	//$("#articleImg"+i).attr('src',thumbnail);
			
	}
        var cats = "";
        for (var cat = 0; cat < entry.categories.length; cat++)
		{
		var catTitle = entry.categories[cat].title;
	     	if(catTitle !== "Uncategorized")
            cats += catTitle + (cat === entry.categories.length - 1 ? "" : ",");
        $('#articleCategory' + i).text(cats);
		}
    }
	
	
   $('#articleWrapper1 .arrow-left').remove();
    $('#articleWrapper' + articleLength + ' .arrow-right').remove();
    if (articleLength < maxLength) {
        for (var i = articleLength + 1; i <= maxLength; i++) {
       $('#list' + i).hide();
        }
    }
}

function grabRSS(cat) {
maskHome = true;
$( '#home' ).trigger( 'pageshow');
  if($( "#main-menu" ).is(':visible'))
{
toggle();//close cat menu
}
$.ajax({
       url: 'http://wardymag.net/'+(cat !== undefined?('category/'+cat+'/'):"")+'?feed=json&jsonp=?',
        type: 'GET',
        dataType: 'JSONP',
        success: function(data) {
		
         handleFeed(data);
		 if(location.hash!=="#home")//for splash screen
		 {
		  clearTimeout(timeout)
		 location.hash = "#home";
		 }
		$("#listWrapper").unmask();
		$(".featured-article").unmask();
        }
    });
}


escape = function (str) {
  return str
    .replace(/[\\]/g, '\\\\')
    .replace(/[\"]/g, '\\\"')
    .replace(/[\/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t');
};




