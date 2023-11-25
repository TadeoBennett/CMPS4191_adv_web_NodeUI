$.when($.ready).then(function(){
    
    $(".btn-login").on("click",function(e){
        e.preventDefault();
        // console.log("URL: " + location.protocol + "//" + location.host + "/login");

        // console.log($("#login-form").serialize());

        $.ajax({      
            url: location.protocol + "//" + location.host + "/login",
            data: $("#login-form").serialize(),
            type: 'POST',
            success: function(result){
                console.log(result);

                if (!isJSON(JSON.stringify(result))) {
                    console.log(result);
                    return false;
                }

                var response = JSON.parse(result);
                console.log(response);

                console.log("login status: " + response.rc);
                if (response.rc < 0) {//because negative response codes are errors in my API
                    $("#login-error").removeClass("d-none");
                    console.log(response.message); 
                    

                }else{
                    console.log("login successful");
                    window.location.href = "/home";
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log("Error: ", xhr.responseText);
                return xhr.responseText;
            }
        })
        .fail(function(xhr, textStatus, errorThrown){
            onsole.log("Error: ", xhr.responseText)
            return xhr.responseText;
        });
    })

    $(".btn-logout").on("click",function(e){
        e.preventDefault();
        console.log("logout button pressed");
        $.ajax({
            url: location.protocol + "//" + location.host + "/logout",
            type: 'GET',
            success: function(result){
                window.location.href = "/login";
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log("Error logging out");
            }
        })
        .fail(function(xhr, textStatus, errorThrown){
            console.log("Error logging out");
        });
    })
})

function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}