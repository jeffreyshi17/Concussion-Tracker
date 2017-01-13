[{
	"id": "SAC",
	"title": "Sleep/Alcohol/Caffeine Tracker",
	"desc": "Please answer the following questions about your daily sleep and alcohol/caffeine consumption",
	"date": "",
	"questions": [{
		"id": "SAC_0",
		"question": "How many hours of sleep did you get last night?",
		"answers": [{
			"id": "SAC_0_0",
			"type": "text",
			"text": "hrs",
			"options": [{
				"id": "SAC_0_0_0", 
				"type": "slider",
				"min": "0",
				"max": "10",
				"step": "1",
				"text": "How many times, if any, did you wake up during the night?"

			}, {
				"id": "SAC_0_0_1",
				"type": "slider",
				"min": "1",
				"max": "5",
				"step": "1",
				"text": "Please rate the quality of your sleep on a scale of 1 to 5"
			}]

		}]
	}, {
		"id": "SAC_1",
		"question": "Did you drink alcohol today?",
		"answers": [{
			"id": "SAC_1_0",
			"type": "radio",
			"text": "Yes",
			"options": [{
				"id": "SAC_1_0_0",
				"type": "checkbox",
				"text": "Beer",
				"options": [{
					"id": "SAC_1_0_0_0",
					"type": "slider",
					"min": "1",
					"max": "10",
					"step": "1",
					"text": "If yes, how many beers?"
				}]
			}, {
				"id": "SAC_1_0_1",
				"type": "checkbox",
				"text": "Wine",
				"options": [{
					"id": "SAC_1_0_1_0",
					"type" :"slider",
					"min": "1",
					"max": "10",
					"step": "1",
					"text": "If yes, how many glasses?"
				}]
			}, {
				"id": "SAC_1_0_2",
				"type": "checkbox",
				"text": "Hard liquor",
				"options": [{
					"id": "SAC_1_0_2_0",
					"type": "text",
					"text": "If yes, what liquor?",
					"options":[{
						"id": "SAC_1_0_2_0_0",
						"type": "slider",
						"min": "1",
						"max": "10",
						"step": "1",
						"text": "How many shots?"
					}]
				}]
			}]
		}, {
			"id": "SAC_1_1",
			"type": "radio",
			"text": "No"
		}]



	}, {
		"id": "SAC_2",
		"question": "Did you consume caffeine today?",
		"answers": [{
			"id": "SAC_2_0",
			"type": "radio",
			"text": "Yes",
			"options": [{
				"id": "SAC_2_0_0",
				"type": "checkbox",
				"text": "Coffee",
				"options": [{
					"id": "SAC_2_0_0_0",
					"type": "slider",
					"min": "1",
					"max": "10",
					"step": "1",
					"text": "How many 8oz cups?"
				}]
			}, {
				"id": "SAC_2_0_1",
				"type": "checkbox",
				"text": "Tea",
				"options": [{
					"id": "SAC_2_0_1_0",
					"type": "slider",
					"min": "1",
					"max": "10",
					"step": "1",
					"text": "How many 8oz cups?"
				}]
			}, {
				"id": "SAC_2_0_2",
				"type": "checkbox",
				"text": "Other",
				"options": [{
					"id": "SAC_2_0_2_0",
					"type": "slider",
					"min": "1",
					"max": "10",
					"step": "1",
					"text": "How many milligrams?"
				}]
			}]
		}, {
			"id": "SAC_2_1",
			"type": "radio",
			"text": "No"
		}]
	}, {
		"id": "SAC_3",
		"question": "Did you consume drugs today?",
		"answers": [{
			"id": "SAC_3_0",
			"type": "radio",
			"text": "Yes",
			"options": [{
				"id": "SAC_3_0_0",
				"type": "checkbox", 
				"text": "Marijuana",
				"options": [{
					"id": "SAC_3_0_0_0",
					"type": "checkbox",
					"text": "Recreational Marijuana",
					"options": [{
						"id": "SAC_3_0_0_0_0",
						"type": "text",
						"text": "How many grams?"
					}]
				}, {
					"id": "SAC_3_0_0_1",
					"type": "checkbox",
					"text": "Medicinal Marijuana",
					"options": [{
						"id": "SAC_3_0_0_0_1",
						"type": "text",
						"text": "How many grams?"
					}]

				}]
			}, {
				"id": "SAC_3_0_1",
				"type": "checkbox",
				"text": "Cocaine",
				"options": [{
					"id": "SAC_3_0_1_0",
					"type": "text",
					"text": "How many grams?"
				}]
			}, {
				"id": "SAC_3_0_2",
				"type": "checkbox",
				"text": "Other drug",
				"options": [{
					"id": "SAC_3_0_2_0",
					"type": "text",
					"text": "What drug?"
				}, {
					"id": "SAC_3_0_2_1",
					"type": "text",
					"text": "How many grams?"
				}]
			}]
		}]
	}]


}]