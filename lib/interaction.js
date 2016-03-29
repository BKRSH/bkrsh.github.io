	function SelectionIndic(a) {

		$('#help').css('display', 'none')
		Choix = ""
		Indic = a
		Choix = Indic + Annee
		Choix2 = Indic + Annee
		Choix2 = Choix2.replace("_An", " ")

		var Test = Indic.slice(0, 1)
		switch (Test) {
			case 'D':
				$("#D").addClass("selectedIndic");
				$("#E").removeClass("selectedIndic");
				$("#T").removeClass("selectedIndic");
				break;
			case 'E':
				$("#E").addClass("selectedIndic");
				$("#D").removeClass("selectedIndic");
				$("#T").removeClass("selectedIndic");
				break;
			case 'T':
				$("#T").addClass("selectedIndic");
				$("#D").removeClass("selectedIndic");
				$("#E").removeClass("selectedIndic");
				break;
		}

		if (Annee === "") {
			alert("Veuillez choisir une année")
		} else {
			PopulationChoix = "Population " + Annee.replace("An", "")
			PIBChoix = "Pib " + Annee.replace("An", "")
			UpdateStyle(Choix)
			drawTable(4, Choix3);
			drawTable(5);		
		$('#listepays').css({'display':'block'})	
		}
        
       if($('#infobox').css('display') == 'block')
        {
          function trouvePays(pays) {return pays.Code_Pays === CPays;}
		Choix2011 = Choix.slice(0,Choix.length - 4) + "2011";
		Choix2012 = Choix.slice(0,Choix.length - 4) + "2012";
		Choix2013 = Choix.slice(0,Choix.length - 4) + "2013";
        label=""
        if(Choix.slice(0,1)==='E'){label ="Energie propre"}else{label = Choix.slice(0,-7)}
        document.getElementById("C2011").innerHTML = label +" 2011: " +Data_Europa.find(trouvePays)[Choix2011]+ " "+unite
        document.getElementById("C2012").innerHTML =label +" 2012: " +Data_Europa.find(trouvePays)[Choix2012]+" "+  unite
        document.getElementById("C2013").innerHTML =label+" 2013: "+ Data_Europa.find(trouvePays)[Choix2013] +" "+ unite
        }

	}

	function SelectionAnnee(b) {
		$('#help').css('display', 'none')
		Choix = "";
		Annee = b
		Choix = Indic + Annee
		Choix2 = Indic + Annee
		Choix2 = Choix2.replace("_An", " ")

		var Test = Annee.slice(2, 6)
		switch (Test) {
			case '2011':
				$("#2011").addClass("selectedIndic");
				$("#2012").removeClass("selectedIndic");
				$("#2013").removeClass("selectedIndic");
				break;
			case '2012':
				$("#2012").addClass("selectedIndic");
				$("#2011").removeClass("selectedIndic");
				$("#2013").removeClass("selectedIndic");
				break;
			case '2013':
				$("#2013").addClass("selectedIndic");
				$("#2011").removeClass("selectedIndic");
				$("#2012").removeClass("selectedIndic");
				break;
		}

		if (Indic === "") {
			alert("Veuillez choisir un indicateur")
		} else {
			PopulationChoix = "Population " + Annee.replace("An", "")
			PIBChoix = "Pib " + Annee.replace("An", "")
			UpdateStyle(Choix)
			drawTable(4, Choix3);
			drawTable(5)
			$('#listepays').css({'display':'block'})	

		}

	};
	function FiltrerGroupe(c) {
		Choix3 = c
		switch (Choix3) {
			case 'reset':
				$("#reset").addClass("selectedGrp");
				$("#GRP6").removeClass("selectedGrp");
				$("#GRP15").removeClass("selectedGrp");
				$("#GRP28").removeClass("selectedGrp");
				break;
			case 'GRP6':
				$("#GRP6").addClass("selectedGrp");
				$("#reset").removeClass("selectedGrp");
				$("#GRP15").removeClass("selectedGrp");
				$("#GRP28").removeClass("selectedGrp");
				break;
			case 'GRP15':
				$("#GRP15").addClass("selectedGrp");
				$("#reset").removeClass("selectedGrp");
				$("#GRP6").removeClass("selectedGrp");
				$("#GRP28").removeClass("selectedGrp");
				break;
			case 'GRP28':
				$("#GRP28").addClass("selectedGrp");
				$("#reset").removeClass("selectedGrp");
				$("#GRP6").removeClass("selectedGrp");
				$("#GRP15").removeClass("selectedGrp");
				break;
		}
		drawTable(4, Choix3)
	};


	function Hide(c, d) {
		$('#help').css('display', 'none')
		if (c === "#container1") {
			$('.Grp').css("display", "block")
			$("#reset").addClass("selectedGrp");
			$("#GRP6").removeClass("selectedGrp");
			$("#GRP15").removeClass("selectedGrp");
			$("#GRP28").removeClass("selectedGrp");
			$("#TDB").addClass("selectedMenu");
			$("#CARTO").removeClass("selectedMenu")

		} else {
			$('.Grp').css("display", "none")
			$("#CARTO").addClass("selectedMenu");
			$("#TDB").removeClass("selectedMenu")
		}
		$(c).fadeOut(500, function() {})
		$(d).fadeIn(500, function() {})
		}

	function Help() {
		$('#infobox').fadeOut(0, function() {})
		$('#help').fadeIn(0, function() {})
        $('#listepays').css({'margin-top': 5, 'display':'block'})

	}