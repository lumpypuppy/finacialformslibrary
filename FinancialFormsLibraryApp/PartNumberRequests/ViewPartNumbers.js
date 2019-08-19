<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="../../SiteAssets/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices-2014.02.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-browser/0.1.0/jquery.browser.min.js"></script>

<script type="text/javascript">
$(document).ready(function() {
    
    var listInfo = document.querySelector("#script").children[1].id;
    var viewId = listInfo.slice(40, 76);
    var listId = listInfo.slice(1, 37);
    console.log(listInfo);
    console.log(listId);
    console.log(viewId);
    
    //This code below is an example of how to target a specific table element 
    //document.querySelector("#\\{" + listId + "\\}-\\{"+ viewId +"\\} tbody td:first-child + td + td + td + td + td + td + td + td a").style.color = 'red';
    //document.querySelector("#\\{" + listId + "\\}-\\{"+ viewId +"\\} tbody td:first-child + td + td + td + td + td + td + td + td a").style.color = 'red';

});
</script>

<style>

.ms-vh, .ms-vh2, .ms-vh-icon, .ms-vh-icon-empty, .ms-vh2-nofilter, .ms-vh2-nofilter-notextalign, .ms-vh2-nofilter-perm, .ms-vhImage, .ms-vh2-nograd, .ms-vh3-nograd, .ms-vh2-nograd-icon, .ms-vh2-nofilter-icon, .ms-ph {
    font-weight: normal;
    font-size: 11px;
    color: #777;
    text-align: left;
    text-decoration: none;
    vertical-align: middle;
    white-space: nowrap;
}

tbody  tr  td:first-child + td + td + td + td + td + td a{
    pointer-events: none;
    color: #444444;
}

tbody  tr  td:first-child + td + td + td + td + td + td {
    width: 150px;
}

tbody  tr  td:first-child + td + td + td + td + td + td + td + td + td + td + td {
    width: 160px;
}

.ms-alternatingstrong .ms-vb a:link, .ms-alternatingstrong .ms-vb2 a:link, .ms-alternatingstrong .ms-vb-user a:link, .ms-alternatingstrong .ms-vb a:visited, .ms-alternatingstrong .ms-vb2 a:visited, .ms-alternatingstrong .ms-vb-user a:visited, .ms-alternatingstrong .ms-vb a:visited:hover, .ms-alternatingstrong .ms-vb2 a:visited:hover, .ms-alternatingstrong .ms-vb-user a:visited:hover {
    color: #444444;
}
.ms-vb a:visited, .ms-vb2 a:visited, .ms-vb-user a:visited {
    color: #444444;
    text-decoration: none;
}

a {
    color: #444444;
}

</style>