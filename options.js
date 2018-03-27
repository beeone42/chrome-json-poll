// Saves options to chrome.storage
function save_options() {
  var url = document.getElementById('json-url').value;
  chrome.storage.sync.set({
    jsonUrl: url
  }, function() {

  var views = chrome.extension.getViews();
  for (var i = 0; i < views.length; i++) {
    var view = views[i];
    if (typeof view.reloadConfig !== "undefined") { 
      view.reloadConfig();
    }
  }

    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    jsonUrl: 'https://raw.githubusercontent.com/beeone42/chrome-json-poll/master/sample.json'
  }, function(items) {
    document.getElementById('json-url').value = items.jsonUrl;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);