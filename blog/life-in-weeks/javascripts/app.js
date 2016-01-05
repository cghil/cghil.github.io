var information = myLifeVisualized.model.setUpModel("09/01/1991", 72),
	data = information.data,
	percentage = information.percentage;

myLifeVisualized.graph.createGraphic(data);

myLifeVisualized.inputFromUser.test();