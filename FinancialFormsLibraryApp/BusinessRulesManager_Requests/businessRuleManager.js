<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="//code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices-2014.02.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-browser/0.1.0/jquery.browser.min.js"></script>

<script>
$(document).ready(function() {
    var value = document.querySelectorAll('input[value="Save"]')[1].id;
    console.log(value);
    document.querySelector("#"+value).value = 'Submit';
}); 
</script>


<style>
#s4-titlerow, .s4-titlerowhidetitle {
    display: block !important;
}

tr {
    display: block;
}

#part1 > table > tbody > tr:nth-child(1) > td > table > tbody > tr {
    display: none;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(4) {
    display: grid;
}

input[type=password], input[type=text], input[type=file], textarea, .ms-inputBox {
    padding: 2px 5px;
    max-width: 350px;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(4) > td.ms-formbody {
    display: inline;
}
</style>