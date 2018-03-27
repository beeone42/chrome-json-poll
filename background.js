
var update_interval = "none";
var json_url = "";

function BadgeOn()
{
	update_interval = setInterval(function() { updateBadge(); }, 1000);
	chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 255, 255]});
	chrome.browserAction.setBadgeText({text:"on"});
	updateBadge();
}

function BadgeOff()
{
	clearInterval(update_interval);	
	update_interval = "none";
	chrome.browserAction.setBadgeBackgroundColor({color:[128, 128, 128, 255]});
	chrome.browserAction.setBadgeText({text:"off"});
}

function updateBadge() {

	$.getJSON(json_url).done(function(data) {
	
		if (data.param != "ok")
		{
			chrome.browserAction.setBadgeBackgroundColor({color:[255, 191, 0, 255]});
			chrome.browserAction.setBadgeText({text:data.t.toString()});
		}
		else
		{
			chrome.browserAction.setBadgeBackgroundColor({color:[123, 182, 97, 255]});
			chrome.browserAction.setBadgeText({text:data.param});
		}
    });

}

function reloadConfig() {
  chrome.storage.sync.get({
    jsonUrl: 'https://raw.githubusercontent.com/beeone42/chrome-json-poll/master/sample.json',
  }, function(items) {
 	json_url = items.jsonUrl;
  });
}

(function() {

	reloadConfig();
	BadgeOff(); 

	chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
	
		if (update_interval == "none")
		{
			BadgeOn();
		}
		else
		{
			BadgeOff();
		}
	});
	
})()
