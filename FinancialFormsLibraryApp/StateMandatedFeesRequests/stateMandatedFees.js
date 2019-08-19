<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="../../SiteAssets/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices-2014.02.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-browser/0.1.0/jquery.browser.min.js"></script>

<script type="text/javascript">
$(document).ready(function() {
var value = document.querySelectorAll('input[value="Save"]')[1].id;
console.log(value);
document.querySelector("#"+value).value = 'Submit';

var cancelValue = document.querySelectorAll('input[value="Cancel"]')[0].id;
console.log(cancelValue);
document.querySelector("#"+cancelValue).style.display = 'none';

document.querySelector("[title='Year Required Field']").style.width = "82px";

    $('body').change(
        function(){
            var amt1 = parseFloat(document.querySelector("[title='Amount1']").value.replace(",", ""));
            var amt2 = parseFloat(document.querySelector("[title='Amount2']").value.replace(",", ""));
            var amt3 = parseFloat(document.querySelector("[title='Amount3']").value.replace(",", ""));
            var amt4 = parseFloat(document.querySelector("[title='Amount4']").value.replace(",", ""));
            var amt5 = parseFloat(document.querySelector("[title='Amount5']").value.replace(",", ""));
            var amt6 = parseFloat(document.querySelector("[title='Amount6']").value.replace(",", ""));
            var amt7 = parseFloat(document.querySelector("[title='Amount7']").value.replace(",", ""));
            var amt8 = parseFloat(document.querySelector("[title='Amount8']").value.replace(",", ""));
            var amt9 = parseFloat(document.querySelector("[title='Amount9']").value.replace(",", ""));
            var amt10 = parseFloat(document.querySelector("[title='Amount10']").value.replace(",", ""));
            var total;
            total = amt1+amt2+amt3+amt4+amt5+amt6+amt7+amt8+amt9+amt10;
            document.querySelector("[title='Total']").value = total;
            console.log(total);
        });
                
    });
</script>
<style>
#s4-titlerow, .s4-titlerowhidetitle {
    display: block !important;
}

#part1 > table > tbody > tr:nth-child(1) > td > table > tbody > tr {
    display: none;
}

tr {
    display: block;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(14) > td.ms-formlabel, #WebPartWPQ2 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(14) > td.ms-formbody {
    display: block;
}

#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(13) > td.ms-formlabel, #WebPartWPQ2 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(13) > td.ms-formlabel {
    padding-right: 210px;
}


#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(14) > td.ms-formbody {
    max-width: 400px;
}

</style>