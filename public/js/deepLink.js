
window.onload = function () {
    console.log(window.location.pathname)
    if (window.location.pathname == "/deepLink") {
        fetchDeepLink()
    } else {

    }

}

/**
 * fetch Android Memo
 */
function fetchDeepLink() {
    $.ajax({
        type: "GET",
        url: "../api/deepLink",
        dataType: "JSON",
        success: function (json) {

            json.list.forEach(element => {
                // initView
                const divRoot = $('<div class="card-normal-bg"></div>');

                let card = $('<div id="card-contents" class="card-normal-contents"></div>')
                // DataBinding
                const link = "<a href='" + element.LINK + "'>" + element.TITLE + "</a>"
                card.html(link)
                // card.html(element.TITLE + "<p>" + element.LINK + "</p>")
                divRoot.append(card);
                $('#list').append(divRoot);
            })
        },
        error: function (xhr, status, error) {
            console.log(status, 'Error ' + error);
        }
    })
}

function addDeepLink() {
    if (document.getElementById('link').value == "" || document.getElementById('title').value == "") {
        return false
    } else {
        let link = document.getElementById('link').value
        if(link.startsWith('http')) {
            return true
        } else {
            return true
        }        
    }
}
