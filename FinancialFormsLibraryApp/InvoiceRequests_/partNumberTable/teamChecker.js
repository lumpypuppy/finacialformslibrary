

    function taxTeammates(){
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
                console.log(personLogged + " is in the Tax Approvers Group");
            }else{
                console.log(personLogged + " is NOT in the Tax Approvers Group and will not be able to be able to edit");
            }
            return returnValue;
        }

        for(var i=0; i<results.length; i++){
            var result = results[i];
            teammates.push(result.Title);
            }
            console.log(teammates);

            canEdit = includes(teammates, personLogged);
            console.log ('A Tax team member? ' + canEdit);
            if(!canEdit){
                console.log ('Not a Tax team member. Cannot Edit this invoice request');
                document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                document.querySelector('#MSOZoneCell_WebPartWPQ2').style.pointerEvents = "none";
                document.querySelector('#MSOZoneCell_WebPartWPQ2').setAttribute('disabled', true);
                document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
                document.querySelector('input[title="JE Revenue Acct"]').setAttribute('disabled', true);
                document.querySelector('input[title="Receivable Acct"]').setAttribute('disabled', true);
                document.querySelector('input[title="Comments"]').setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody").setAttribute('disabled', true);
                document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td").setAttribute('disabled', true);
                document.querySelector('input[title="Please state why this billing is not being processed by Customer Service Required Field"]').setAttribute('disabled', true);
                document.querySelector('input[title="Customer Number Required Field"]').setAttribute('disabled', true);
                document.querySelector('input[title="Customer Name"]').setAttribute('disabled', true);
                document.querySelector('input[title="Affiliation Type"]').setAttribute('disabled', true);
                document.querySelector('input[title="Bill To Contact Name"]').setAttribute('disabled', true);
                document.querySelector('input[title="Bill To Address"]').setAttribute('disabled', true);
                document.querySelector('input[title="Bill To Street 1"]').setAttribute('disabled', true);
                document.querySelector('input[title="Bill To Street 2"]').setAttribute('disabled', true);
                document.querySelector('input[title="Bill To City"]').setAttribute('disabled', true);
                document.querySelector('input[title="Bill To State"]').setAttribute('disabled', true);
                document.querySelector('input[title="Bill To Zip"]').setAttribute('disabled', true);
                document.querySelector('input[title="Ship To Contact Name Required Field"]').setAttribute('disabled', true);
                document.querySelector('input[title="Ship To Address"]').setAttribute('disabled', true);
                document.querySelector('input[title="Ship To Street 1"]').setAttribute('disabled', true);
                document.querySelector('input[title="Ship To Street 2"]').setAttribute('disabled', true);
                document.querySelector('input[title="Ship To City"]').setAttribute('disabled', true);
                document.querySelector('input[title="Ship To State"]').setAttribute('disabled', true);
                document.querySelector('input[title="Ship To Zip"]').setAttribute('disabled', true);
                document.querySelector('input[title="Invoice Date Required Field"]').setAttribute('disabled', true);
                document.querySelector('input[title="Billing Date From"]').setAttribute('disabled', true);
                document.querySelector('input[title="Billing Date To"]').setAttribute('disabled', true);
                document.querySelector('input[title="Comments and Attachments"]').setAttribute('disabled', true);
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
                  if(results.length > 0){
                    initializeVariables(results);
                  }
                        },
                        error: function  (data) {
                            alert("Error: "+ data);
                       }
                });
        }
        f1()
    };

    function billingTeammates(){
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
            console.log ('Is this person a member of the Billing team = ' + canEdit);
            if(!canEdit){
                console.log ('This person is not a member of the Billing team.');
                document.querySelector('body').style.pointerEvents = "none";
                document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
                document.querySelector('#ctl00_ctl33_g_1b5cdece_1f82_4d0f_80a5_a14e20eb6ff0_ff331_ctl00_ctl00_UserField_upLevelDiv').style.pointerEvents = "none";
                document.querySelector('#ctl00_ctl33_g_1b5cdece_1f82_4d0f_80a5_a14e20eb6ff0_ff331_ctl00_ctl00_UserField').disabled = true;
                document.querySelector('body').setAttribute('disabled', true);
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
                  if(results.length > 0){
                    initializeVariables(results);
                  }						
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
                document.querySelector('body').style.pointerEvents = "none";
                document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
                document.querySelector('#ctl00_ctl33_g_1b5cdece_1f82_4d0f_80a5_a14e20eb6ff0_ff331_ctl00_ctl00_UserField_upLevelDiv').style.pointerEvents = "none";
                document.querySelector('#ctl00_ctl33_g_1b5cdece_1f82_4d0f_80a5_a14e20eb6ff0_ff331_ctl00_ctl00_UserField').disabled = true;
                document.querySelector('body').setAttribute('disabled', true);
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
                  if(results.length > 0){
                    initializeVariables(results);
                  }
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


            canEdit = includes(teammates, personLogged);
            console.log ('CFO Edit this form = ' + canEdit);
            if(!canEdit){
                console.log ('Cannot Edit');
                document.querySelector('body').style.pointerEvents = "none";
                document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
                document.querySelector('#ctl00_ctl33_g_1b5cdece_1f82_4d0f_80a5_a14e20eb6ff0_ff331_ctl00_ctl00_UserField_upLevelDiv').style.pointerEvents = "none";
                document.querySelector('#ctl00_ctl33_g_1b5cdece_1f82_4d0f_80a5_a14e20eb6ff0_ff331_ctl00_ctl00_UserField').disabled = true;
                document.querySelector('body').setAttribute('disabled', true);
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

                  if(results.length > 0){
                    initializeVariables(results);
                  }
                        },
                        error: function  (data) {
                            alert("Error: "+ data);
                       }
                });
        }
        f1()
    };

    function executiveTeammates(){
    var executivePerson = document.querySelector("#ctl00_ctl33_g_1b5cdece_1f82_4d0f_80a5_a14e20eb6ff0_ff331_ctl00_ctl00_UserField_containerCell").innerText.trim().replace(';', '');
    var personLogged = document.querySelector('#O365_MainLink_Me > div > div > span').innerHTML;

    if(personLogged != executivePerson){
        console.log('The executive to approve this should be ' + executivePerson);
        console.log('The person logged in is ' + personLogged);
        document.querySelector('body').style.pointerEvents = "none";
        document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
        document.querySelector('#ctl00_ctl33_g_1b5cdece_1f82_4d0f_80a5_a14e20eb6ff0_ff331_ctl00_ctl00_UserField_upLevelDiv').style.pointerEvents = "none";
        document.querySelector('#ctl00_ctl33_g_1b5cdece_1f82_4d0f_80a5_a14e20eb6ff0_ff331_ctl00_ctl00_UserField').disabled = true;
        document.querySelector('body').setAttribute('disabled', true);
        }

    };

    function managersOnlyApproval() {
        //This function captures the person logged in, compares it to who created it and if it is the same and of a certain status makes the page un-editable.
            $('#WebPartWPQ2').css('pointer-events','none');
            document.querySelector('body').setAttribute('disabled', true);

            var personLogged = document.querySelector('#O365_MainLink_Me > div > div > span').innerHTML.trim();
            var createdBy = document.querySelector('#ctl00_ctl33_g_1b5cdece_1f82_4d0f_80a5_a14e20eb6ff0_ctl05_ctl00_ctl02 > nobr > span > a').title.trim();
            var approvingManager = document.querySelector("#ctl00_ctl33_g_1b5cdece_1f82_4d0f_80a5_a14e20eb6ff0_ff261_ctl00_ctl00_UserField_upLevelDiv").innerText.trim().replace(';', '');
            var alternateManager = document.querySelector("#ctl00_ctl33_g_1b5cdece_1f82_4d0f_80a5_a14e20eb6ff0_ff271_ctl00_ctl00_UserField_upLevelDiv").innerText.trim().replace(';', '');
            var allowedEditor = false;
            console.log('person logged in = ' + personLogged);
            console.log('person created is = ' + createdBy);
            console.log('Manager is = ' + approvingManager);
            console.log('Alternate Manager is = ' + alternateManager);

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
                $('#WebPartWPQ2').css('pointer-events','auto');
                document.querySelector('body').removeAttribute('disabled');
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
                    console.log ('Cannot Edit this invoice rquest because you are not on the billing team');
                    document.querySelector('input[value="Submit"]').setAttribute('disabled', true);
                    document.querySelector('#MSOZoneCell_WebPartWPQ2').style.pointerEvents = "none";
                    document.querySelector('#MSOZoneCell_WebPartWPQ2').setAttribute('disabled', true);
                    document.querySelector("#DeltaPlaceHolderMain > div:nth-child(2)").setAttribute('disabled', true);
                    document.querySelector('input[title="JE Revenue Acct"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Receivable Acct"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Comments"]').setAttribute('disabled', true);
                    document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody").setAttribute('disabled', true);
                    document.querySelector("#part1 > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td").setAttribute('disabled', true);
                    document.querySelector('input[title="Please state why this billing is not being processed by Customer Service Required Field"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Customer Number Required Field"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Customer Name"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Affiliation Type"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Bill To Contact Name"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Bill To Address"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Bill To Street 1"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Bill To Street 2"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Bill To City"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Bill To State"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Bill To Zip"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Ship To Contact Name Required Field"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Ship To Address"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Ship To Street 1"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Ship To Street 2"]').setAttribute('disabled', true);
                   document.querySelector('input[title="Ship To City"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Ship To State"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Ship To Zip"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Invoice Date Required Field"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Billing Date From"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Billing Date To"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Comments and Attachments"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Invoice Number"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Invoice-Date"]').setAttribute('disabled', true);
                    document.querySelector('input[title="Billing Comments"]').setAttribute('disabled', true);
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
                    if(results.length > 0){
                        initializeVariables(results);
                    }
                            },
                            error: function  (data) {
                                alert("Error: "+ data);
                        }
                    });
            }
            f1()
        };
