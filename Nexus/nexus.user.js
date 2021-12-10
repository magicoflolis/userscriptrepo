function(event) {
  var href = this.href;
  if (/[?&]file_id=/.test(href)) {
    event.preventDefault();

    var button = this;

    button.style.color = "yellow";
    button.innerText = 'WAIT';

    var game_id = document.getElementById("section").dataset.gameId;
    var search_params = new URL(href).searchParams;

    var file_id = search_params.get("file_id");
    if (!file_id)
      file_id = search_params.get("id"); // for ModRequirementsPopUp

    if (!/[?&]nmm=/.test(href)) {
      ajax_request({
        type: "POST",
        url: "/Core/Libs/Common/Managers/Downloads?GenerateDownloadUrl",
        data: "fid=" + file_id + "&game_id=" + game_id,
        headers: {
          Origin: "https://www.nexusmods.com",
          Referer: href,
          "Sec-Fetch-Site": "same-origin",
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        success: function(data) {
          if (data) {
            try {
              data = JSON.parse(data);

              if (data.url) {
                console.log('Success', data.url);
                btnSuccess(button);
                document.location.href = data.url;
                return;
              }
            } catch (e) {
              console.error(e);
            }
          }

          btnError(button);
        },
        error: function() {
          btnError(button);
        }
      });
    } else {
      ajax_request({
        type: "GET",
        url: href,
        headers: {
          Origin: "https://www.nexusmods.com",
          Referer: document.location.href,
          "Sec-Fetch-Site": "same-origin",
          "X-Requested-With": "XMLHttpRequest"
        },
        success: function(data) {
          if (data) {
            var xml = new DOMParser().parseFromString(data, "text/html");
            var slow = xml.getElementById("slowDownloadButton");
            var downloadUrl = slow.getAttribute("data-download-url");
            console.log('Success', downloadUrl);
            btnSuccess(button);
            document.location.href = downloadUrl;
            return;
          }

          btnError(button);
        },
        error: function(ajaxContext) {
          console.log(ajaxContext.responseText);
          btnError(button);
        }
      });
    }

    var popup = $(this).parent();
    if (popup.hasClass('popup')) {
      popup.children("button").click();
    }

    return false;
  }
}