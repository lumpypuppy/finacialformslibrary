<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="../../SiteAssets/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices-2014.02.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-browser/0.1.0/jquery.browser.min.js"></script>

<script type="text/javascript">
$(document).ready(function() {

$('input[title="Year Required Field"]').attr("disabled", true);
$('[title="Quarter"]').attr("disabled", true);
$('[title="State"]').attr("disabled", true);
$('[title="State2"]').attr("disabled", true);
$('[title="State3"]').attr("disabled", true);
$('[title="State4"]').attr("disabled", true);
$('[title="State5"]').attr("disabled", true);
$('[title="State6"]').attr("disabled", true);
$('[title="State7"]').attr("disabled", true);
$('[title="State8"]').attr("disabled", true);
$('[title="State9"]').attr("disabled", true);
$('[title="State10"]').attr("disabled", true);
$('input[title="Amount1"]').attr("disabled", true);
$('input[title="Amount2"]').attr("disabled", true);
$('input[title="Amount3"]').attr("disabled", true);
$('input[title="Amount4"]').attr("disabled", true);
$('input[title="Amount5"]').attr("disabled", true);
$('input[title="Amount6"]').attr("disabled", true);
$('input[title="Amount7"]').attr("disabled", true);
$('input[title="Amount8"]').attr("disabled", true);
$('input[title="Amount9"]').attr("disabled", true);
$('input[title="Amount10"]').attr("disabled", true);
$('input[title="Total"]').attr("disabled", true);



function userEdit() {
    //This function captures the person logged in, compares it to who created it and if it is the same and of a certain status makes the page un-editable.
        var personLogged = document.querySelector("#O365_MainLink_Me > div > div > span").innerHTML;
        var createdBy = document.querySelector("#onetidinfoblock1").children[0].children[0].childNodes[0].children[1].innerText;
        console.log('person logged in = ' + personLogged);
        console.log('person created is = ' + createdBy);
        
        if(personLogged == createdBy){
                $('#WebPartWPQ2').css('pointer-events','none');
                document.querySelector("#s4-bodyContainer").setAttribute('disabled', true);
                console.log('should not be able to edit');
            }
    } 
    userEdit();
    
    var value = document.querySelectorAll('input[value="Save"]')[1].id;
    document.querySelector("#"+value).value = 'Submit';
    
    var cancelValue = document.querySelectorAll('input[value="Cancel"]')[0].id;
    document.querySelector("#"+cancelValue).style.display = 'none';

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

$('#onetIDListForm > tbody > tr > td > div').change(
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

input[type=password], input[type=text], input[type=file], textarea, .ms-inputBox {
    width: 82px;


#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(14) > td.ms-formbody {
    max-width: 400px;
}

</style>