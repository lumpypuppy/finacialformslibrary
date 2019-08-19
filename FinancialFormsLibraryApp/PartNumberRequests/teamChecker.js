

    function taxTeammates(){
        var teammates = [];
        var canEdit;
        var personLogged = document.querySelector("#O365_MainLink_Me > div > div > span").textContent;
        function initializeVariables(results){	
        var str = JSON.stringify(results);

        function includes(teammates, personLogged) {
            var returnValue = false;
            var pos = teammates.indexOf(personLogged);

            if (pos >= 0) {
                returnValue = true;
                console.log(personLogged + " is in the Admin Group");
            }else{
                console.log(personLogged + " is NOT in the Admin Group");
            }
            return returnValue;
        }

        for(var i=0; i<results.length; i++){
            var result = results[i];
            teammates.push(result.Title);
            }
            console.log(teammates);

            canEdit = includes(teammates, personLogged);
            console.log ('Person can edit this form = ' + canEdit);
            if(!canEdit){
                console.log ('Not a Tax Approver Group Member Cannot Edit');
                document.querySelector('#MSOZoneCell_WebPartWPQ2').style.pointerEvents = "none";
                document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
                //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField_upLevelDiv').style.pointerEvents = "none";
                //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField').disabled = true;
                document.querySelector('#MSOZoneCell_WebPartWPQ2').setAttribute('disabled', true);
                document.querySelector('[title="Location (States) possible values"]').setAttribute('disabled', true);
                document.querySelector('[title="Item Description Required Field"]').setAttribute('disabled', true);
                document.querySelector('[title="Part Number"]').setAttribute('disabled', true);
                document.querySelector('[title="Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="Non-Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="Non-Affiliate Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="New Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="New Non-Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="New Non-Affiliate Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="Product Code"]').setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(8) > td.ms-formbody > span > div").setAttribute('disabled', true);
                document.querySelector('[title="DEV"]').setAttribute('disabled', true);
                document.querySelector('[title="QA"]').setAttribute('disabled', true);
                document.querySelector('[title="PROD Required Field"]').setAttribute('disabled', true);
                document.querySelector("#commentsRowforApprover > td.ms-formbody > span > div").setAttribute('disabled', true);
                document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(1)").setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(4)").setAttribute('disabled', true);
            }
        }

        function f1(){
        //This is the REST call to grab the billing admin members
        var endPointUrl = "../../_api/web/sitegroups/getbyname(\'Tax%20Approvers\')/users"
         $.ajax({

                         url: endPointUrl,
                         method: "GET",
                         headers: { "Accept":  "application/json; odata=verbose","Content-Type":"application/json; odata=verbose" },
                         success: function  (data) {

                 var results = data.d.results
                 initializeVariables(results);
                        },
                        error: function  (data) {
                            alert("Error: "+ data);
                       }
                });
        }
        f1()
    };

    function scribbled(){
        //This function does not give hotdogs to everyone. It is just a test
        console.log('Hotdogs for everyone!');
    };

    function billingTeammates(){
        var teammates = [];
        var canEdit;
        var personLogged = document.querySelector("#O365_MainLink_Me > div > div > span").textContent;
        function initializeVariables(results){
        var str = JSON.stringify(results);

        function includes(teammates, personLogged) {
            var returnValue = false;
            var pos = teammates.indexOf(personLogged);

            if (pos >= 0) {
                returnValue = true;
                //alert(personLogged + " is in the Admin Group");
            }else{
                //alert(personLogged + " is NOT in the Admin Group");
            }
            return returnValue;
        }

        for(var i=0; i<results.length; i++){
            var result = results[i];
            teammates.push(result.Title);
            }
            console.log(teammates);

            canEdit = includes(teammates, personLogged);
            console.log ('Can Edit this form = ' + canEdit);
            if(!canEdit){
                console.log ('Cannot Edit');
                document.querySelector("#Ribbon\\.ListForm\\.Edit\\.Actions-LargeLarge-0-0").style.visibility = 'hidden';
                document.querySelector('#MSOZoneCell_WebPartWPQ2').style.pointerEvents = "none";
                document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
                //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField_upLevelDiv').style.pointerEvents = "none";
                //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField').disabled = true;
                document.querySelector('#MSOZoneCell_WebPartWPQ2').setAttribute('disabled', true);
                document.querySelector('[title="Location (States) possible values"]').setAttribute('disabled', true);
                document.querySelector('[title="Location (States) possible values"]').setAttribute('disabled', true);
                document.querySelector('[title="Part Number"]').setAttribute('disabled', true);
                document.querySelector('[title="Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="Non-Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="Non-Affiliate Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="New Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="New Non-Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="New Non-Affiliate Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="Product Code"]').setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(8) > td.ms-formbody > span > div").setAttribute('disabled', true);
                document.querySelector('[title="DEV"]').setAttribute('disabled', true);
                document.querySelector('[title="QA"]').setAttribute('disabled', true);
                document.querySelector('[title="PROD Required Field"]').setAttribute('disabled', true);
                document.querySelector("#commentsRowforApprover > td.ms-formbody > span > div").setAttribute('disabled', true);
                document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(1)").setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(4)").setAttribute('disabled', true);
            }

        }

        function f1(){
        //This is the REST call to grab the billing admin members
        var endPointUrl = "../../_api/web/sitegroups/getbyname(\'Billing%20Team\')/users"
         $.ajax({

                         url: endPointUrl,
                         method: "GET",
                         headers: { "Accept":  "application/json; odata=verbose","Content-Type":"application/json; odata=verbose" },
                         success: function  (data) {

                var results = data.d.results
                initializeVariables(results);
                        },
                        error: function  (data) {
                            alert("Error: "+ data);
                       }
                });
        }
        f1()
    };

    function adminTeammates(){

        var teammates = [];
        var canEdit;
        var personLogged = document.querySelector("#O365_MainLink_Me > div > div > span").textContent;
        function initializeVariables(results){
        var str = JSON.stringify(results);

        function includes(teammates, personLogged) {
            var returnValue = false;
            var pos = teammates.indexOf(personLogged);

            if (pos >= 0) {
                returnValue = true;
                //alert(personLogged + " is in the Admin Group");
            }else{
                //alert(personLogged + " is NOT in the Admin Group");
            }
            return returnValue;
        }

        for(var i=0; i<results.length; i++){
            var result = results[i];
            teammates.push(result.Title);
            }
            console.log(teammates);

            canEdit = includes(teammates, personLogged);
            console.log ('Can Edit this form = ' + canEdit);
            if(!canEdit){
                console.log ('Cannot Edit');
                document.querySelector('#MSOZoneCell_WebPartWPQ2').style.pointerEvents = "none";
                document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
                //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField_upLevelDiv').style.pointerEvents = "none";
                //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField').disabled = true;
                document.querySelector('#MSOZoneCell_WebPartWPQ2').setAttribute('disabled', true);
                document.querySelector('[title="Location (States) possible values"]').setAttribute('disabled', true);
                document.querySelector('[title="Item Description Required Field"]').setAttribute('disabled', true);
                document.querySelector('[title="Part Number"]').setAttribute('disabled', true);
                document.querySelector('[title="Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="Non-Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="Non-Affiliate Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="New Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="New Non-Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="New Non-Affiliate Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="Product Code"]').setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(8) > td.ms-formbody > span > div").setAttribute('disabled', true);
                document.querySelector('[title="DEV"]').setAttribute('disabled', true);
                document.querySelector('[title="QA"]').setAttribute('disabled', true);
                document.querySelector('[title="PROD Required Field"]').setAttribute('disabled', true);
                document.querySelector("#commentsRowforApprover > td.ms-formbody > span > div").setAttribute('disabled', true);
                document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(1)").setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(4)").setAttribute('disabled', true);
            }

        }

        function f1(){
        //This is the REST call to grab the billing admin members
        var endPointUrl = "../../_api/web/sitegroups/getbyname(\'Billing%20Admin%20Group\')/users"
         $.ajax({

                         url: endPointUrl,
                         method: "GET",
                         headers: { "Accept":  "application/json; odata=verbose","Content-Type":"application/json; odata=verbose" },
                         success: function  (data) {

                var results = data.d.results
                initializeVariables(results);
                        },
                        error: function  (data) {
                            alert("Error: "+ data);
                       }
                });
        }
        f1()
    };

    function cfoTeammates(){
        var teammates = [];
        var canEdit;
        var personLogged = document.querySelector("#O365_MainLink_Me > div > div > span").textContent;
        function initializeVariables(results){	
        var str = JSON.stringify(results);

        function includes(teammates, personLogged) {
            var returnValue = false;
            var pos = teammates.indexOf(personLogged);

            if (pos >= 0) {
                returnValue = true;
                //alert(personLogged + " is in the Admin Group");
            }else{
                //alert(personLogged + " is NOT in the Admin Group");
            }
            return returnValue;
        }

        for(var i=0; i<results.length; i++){
            var result = results[i];
            teammates.push(result.Title);
            }


            canEdit = includes(teammates, personLogged);
            console.log ('CFO Edit this form = ' + canEdit);
            console.log(teammates);
            if(!canEdit){
                console.log ('Not CFO, therefore, cannot Edit');
                document.querySelector('#MSOZoneCell_WebPartWPQ2').style.pointerEvents = "none";
                document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
                //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField_upLevelDiv').style.pointerEvents = "none";
                //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField').disabled = true;
                document.querySelector('#MSOZoneCell_WebPartWPQ2').setAttribute('disabled', true);
                document.querySelector('[title="Location (States) possible values"]').setAttribute('disabled', true);
                document.querySelector('[title="Item Description Required Field"]').setAttribute('disabled', true);
                document.querySelector('[title="Part Number"]').setAttribute('disabled', true);
                document.querySelector('[title="Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="Non-Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="Non-Affiliate Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="New Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="New Non-Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="New Non-Affiliate Member Price"]').setAttribute('disabled', true);
                document.querySelector('[title="Product Code"]').setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(8) > td.ms-formbody > span > div").setAttribute('disabled', true);
                document.querySelector('[title="DEV"]').setAttribute('disabled', true);
                document.querySelector('[title="QA"]').setAttribute('disabled', true);
                document.querySelector('[title="PROD Required Field"]').setAttribute('disabled', true);
                document.querySelector("#commentsRowforApprover > td.ms-formbody > span > div").setAttribute('disabled', true);
                document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(1)").setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(4)").setAttribute('disabled', true);
            }

        }

        function f1(){
        //This is the REST call to grab the billing admin members
        var endPointUrl = "../../_api/web/sitegroups/getbyname(\'cfo\')/users"
         $.ajax({
                         url: endPointUrl,
                         method: "GET",
                         headers: { "Accept":  "application/json; odata=verbose","Content-Type":"application/json; odata=verbose" },
                         success: function  (data) {

                 var results = data.d.results
                 initializeVariables(results);

                        },
                        error: function  (data) {
                            alert("Error: "+ data);
                       }
                });
        }
        f1()
    };

    function executiveTeammates(){
    var executivePerson = document.querySelector("#tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div").innerText.trim().replace(';', '');
    var personLogged = document.querySelector('#O365_MainLink_Me > div > div > span').innerHTML;
    console.log("person is: "+ executivePerson);
    if(personLogged != executivePerson){
        console.log('The executive to approve this should be ' + executivePerson);
        console.log('The person logged in is ' + personLogged);
        document.querySelector('#MSOZoneCell_WebPartWPQ2').style.pointerEvents = "none";
        document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
        //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField_upLevelDiv').style.pointerEvents = "none";
        document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2)').style.visibility = 'hidden';
        document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(24) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2)').style.visibility = 'hidden';
        document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(25) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2)').style.visibility = 'hidden';

        document.querySelector('#tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(2)').style.visibility = 'hidden';
        document.querySelector('#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(27)').setAttribute('disabled', true);
        document.querySelector('#MSOZoneCell_WebPartWPQ2').setAttribute('disabled', true);
        document.querySelector('[title="Location (States) possible values"]').setAttribute('disabled', true);
        document.querySelector('[title="Item Description Required Field"]').setAttribute('disabled', true);
        document.querySelector('[title="Part Number"]').setAttribute('disabled', true);
        document.querySelector('[title="Member Price"]').setAttribute('disabled', true);
        document.querySelector('[title="Non-Member Price"]').setAttribute('disabled', true);
        document.querySelector('[title="Non-Affiliate Member Price"]').setAttribute('disabled', true);
        document.querySelector('[title="New Member Price"]').setAttribute('disabled', true);
        document.querySelector('[title="New Non-Member Price"]').setAttribute('disabled', true);
        document.querySelector('[title="New Non-Affiliate Member Price"]').setAttribute('disabled', true);
        document.querySelector('[title="Product Code"]').setAttribute('disabled', true);
        document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(8) > td.ms-formbody > span > div").setAttribute('disabled', true);
        document.querySelector('[title="DEV"]').setAttribute('disabled', true);
        document.querySelector('[title="QA"]').setAttribute('disabled', true);
        document.querySelector('[title="PROD Required Field"]').setAttribute('disabled', true);
        document.querySelector("#commentsRowforApprover > td.ms-formbody > span > div").setAttribute('disabled', true);
        document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
        document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(1)").setAttribute('disabled', true);
        document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(4)").setAttribute('disabled', true);
        }

    };

    function managersOnlyApproval() {
        //This function captures the person logged in, compares it to who created it and if it is the same and of a certain status makes the page un-editable.
        var personLogged = document.querySelector("#O365_MainLink_Me > div > div > span").textContent;
        console.log("Person logged inside of function " + personLogged);
        document.querySelector("#commentsRowforApprover > td.ms-formbody > span > div").style.visibility = 'hidden';
        document.querySelector('#MSOZoneCell_WebPartWPQ2').style.pointerEvents = "none";
        document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
        //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField_upLevelDiv').style.pointerEvents = "none";
        //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField').disabled = true;
        document.querySelector('#MSOZoneCell_WebPartWPQ2').setAttribute('disabled', true);
        document.querySelector('[title="Location (States) possible values"]').setAttribute('disabled', true);
        document.querySelector('[title="Item Description Required Field"]').setAttribute('disabled', true);
        document.querySelector('[title="Part Number"]').setAttribute('disabled', true);
        document.querySelector('[title="Member Price"]').setAttribute('disabled', true);
        document.querySelector('[title="Non-Member Price"]').setAttribute('disabled', true);
        document.querySelector('[title="Non-Affiliate Member Price"]').setAttribute('disabled', true);
        document.querySelector('[title="New Member Price"]').setAttribute('disabled', true);
        document.querySelector('[title="New Non-Member Price"]').setAttribute('disabled', true);
        document.querySelector('[title="New Non-Affiliate Member Price"]').setAttribute('disabled', true);
        document.querySelector('[title="Product Code"]').setAttribute('disabled', true);
        document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(8) > td.ms-formbody > span > div").setAttribute('disabled', true);
        document.querySelector('[title="DEV"]').setAttribute('disabled', true);
        document.querySelector('[title="QA"]').setAttribute('disabled', true);
        document.querySelector('[title="PROD Required Field"]').setAttribute('disabled', true);
        document.querySelector("#commentsRowforApprover > td.ms-formbody > span > div").setAttribute('disabled', true);
        document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
        document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(1)").setAttribute('disabled', true);
        document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(4)").setAttribute('disabled', true);

            var createdBy = document.querySelector('#onetidinfoblock1 > span > nobr > span > a').title.trim();
            var approvingManager = document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(23) > td:nth-child(2) > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div").innerText.trim().replace(';', '');
            var alternateManager = document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(24) > td.ms-formbody > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div").innerText.trim().replace(';', '');
            var allowedEditor = false;
            console.log('person logged in = ' + personLogged);
            console.log('team checker- managersonlyapproval person created is = ' + createdBy);
            console.log('team checker- managersonlyapproval Manager is = ' + approvingManager);
            console.log('team checker- managersonlyapproval Alternate Manager is = ' + alternateManager);

            if(personLogged == createdBy){
                allowedEditor = false;
                console.log('Can edit? ' + allowedEditor);
                };

            if(personLogged == alternateManager){
                allowedEditor = true;
                console.log('Can edit? ' + allowedEditor);
                };

            if (personLogged == approvingManager){
                console.log('mgr only');
                allowedEditor = true;
                console.log('Can edit? ' + allowedEditor);
                };

            if(allowedEditor){
                document.querySelector('#MSOZoneCell_WebPartWPQ2').style.pointerEvents = 'auto';
                document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").removeAttribute('disabled');
                document.querySelector('#tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.pointerEvents = "auto";
                document.querySelector("#commentsRowforApprover > td.ms-formbody > span > div").style.visibility = 'visible';
                //document.querySelector('#ctl00_ctl33_g_697800ea_f9b0_461a_bc7f_0e87c72b778d_ff331_ctl00_ctl00_UserField').disabled = false;
                document.querySelector('#MSOZoneCell_WebPartWPQ2').removeAttribute('disabled');
                document.querySelector('[title="Location (States) possible values"]').removeAttribute('disabled');
                document.querySelector('[title="Item Description Required Field"]').removeAttribute('disabled');
                document.querySelector('[title="Part Number"]').removeAttribute('disabled');
                document.querySelector('[title="Member Price"]').removeAttribute('disabled');
                document.querySelector('[title="Non-Member Price"]').removeAttribute('disabled');
                document.querySelector('[title="Non-Affiliate Member Price"]').removeAttribute('disabled');
                document.querySelector('[title="New Member Price"]').removeAttribute('disabled');
                document.querySelector('[title="New Non-Member Price"]').removeAttribute('disabled');
                document.querySelector('[title="New Non-Affiliate Member Price"]').removeAttribute('disabled');
                document.querySelector('[title="Product Code"]').removeAttribute('disabled');
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(8) > td.ms-formbody > span > div").removeAttribute('disabled');
                document.querySelector('[title="DEV"]').removeAttribute('disabled');
                document.querySelector('[title="QA"]').removeAttribute('disabled');
                document.querySelector('[title="PROD Required Field"]').removeAttribute('disabled');
                document.querySelector("#commentsRowforApprover > td.ms-formbody > span > div").removeAttribute('disabled');
                document.querySelector('input[value="Submit"]').removeAttribute('disabled');
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(1)").removeAttribute('disabled');
                document.querySelector("#part1 > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.ms-formbody > span > table > tbody > tr > td.ms-input.ms-noWrap > button:nth-child(4)").removeAttribute('disabled');
        
                console.log('Can edit this page? ' + allowedEditor);
            };
        };

    function invoiceRequestTeammates(){
            var teammates = [];
            var canEdit;
            var personLogged = document.querySelector('#O365_MainLink_Me > div > div > span').innerHTML;

            function initializeVariables(results){
            var str = JSON.stringify(results);

            function includes(teammates, personLogged) {
                var returnValue = false;
                var pos = teammates.indexOf(personLogged);

                if (pos >= 0) {
                    returnValue = true;
                    //alert(personLogged + " is in the Admin Group");
                }else{
                    //alert(personLogged + " is NOT in the Admin Group");
                }
                return returnValue;
            }

            for(var i=0; i<results.length; i++){
                var result = results[i];
                teammates.push(result.Title);
                }
                console.log(teammates);

                canEdit = includes(teammates, personLogged);
                console.log ('Can Edit this form = ' + canEdit);
                if(!canEdit){
                    console.log ('Cannot Edit');
                    document.querySelector('body').setAttribute('disabled', true);
                    document.querySelector('body').style.pointerEvents = "none";
                    document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
                    document.querySelector('#tdManager > span > span > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > div').style.pointerEvents = "none";
                    document.querySelector('#tdManager > span > span').disabled = true;
                }
            }

            function f1(){
            //This is the REST call to grab the billing admin members
            var endPointUrl = "../../_api/web/sitegroups/getbyname(\'Invoice%20Request%20Group\')/users"
            $.ajax({
                            url: endPointUrl,
                            method: "GET",
                            headers: { "Accept":  "application/json; odata=verbose","Content-Type":"application/json; odata=verbose" },
                            success: function  (data){

                    var results = data.d.results
                    initializeVariables(results);
                            },
                            error: function  (data) {
                                alert("Error: "+ data);
                        }
                    });
            }
            f1()
        };
