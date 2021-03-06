
Promise.all([getVoices(), getSettings(), domReady()]).then(spread(initialize));

function initialize(voices, settings) {
  setI18nText();

  var langs = voices.map(function(voice) {
    return voice.lang.split('-', 1)[0];
  })
  var isAvailable = function() {
    return langs.indexOf($(this).data("lang")) != -1;
  };
  $("input[data-lang]").filter(isAvailable).parent().css("display", "block");

  var selectedLangs = settings.languages ? settings.languages.split(',') : [];
  var isSelected = function() {
    return selectedLangs.indexOf($(this).data("lang")) != -1;
  };
  $("input[data-lang]").filter(isSelected).prop("checked", true);

  $("input[data-lang]").click(function() {
    updateSettings({
      languages: $("input[data-lang]:checked").map(function() {return $(this).data("lang")}).get().join(',')
    })
  })

  $("#back-button").click(function() {
    location.href = "options.html";
  })
}
