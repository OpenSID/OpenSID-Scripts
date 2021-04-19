function getFormItems(form_id) {
  // Open a form by ID.
  var form = FormApp.openById(form_id);

  var objResult = {}
  
  // QUESTION ITEMS
  var arrayPertanyaan = []
  for(i = 0; i < form.getItems().length; i++){
    var objItem = {}
    objItem.title = form.getItems()[i].getTitle()
    objItem.type = form.getItems()[i].getType()
    objItem.choices = []

    if(form.getItems()[i].getType() == FormApp.ItemType.MULTIPLE_CHOICE){
      var choices = form.getItems()[i].asMultipleChoiceItem().getChoices();
      var arrayChoice = []
      countArrayChoice = 0

      for(j = 0; j < choices.length; j++){
        arrayChoice[countArrayChoice] = choices[j].getValue()
        countArrayChoice++
      }

      objItem.choices = arrayChoice
    }

    arrayPertanyaan[i] = objItem
  }

  // RESPONSE
  var arrayJawaban = []
  // Iterate for every response
  for(i = 0; i < form.getResponses().length; i++){
    var values = []
    var itemResponse = form.getResponses()[i].getGradableItemResponses()
    // Iterate for every questions responses
    for(j = 0; j < itemResponse.length; j++){
      values[j] = itemResponse[j].getResponse()

      // Record unique value for non-multiple choice
      if(form.getItems()[j].getType() != FormApp.ItemType.MULTIPLE_CHOICE){
        if(!(arrayPertanyaan[j].choices.includes(values[j]))){
          arrayPertanyaan[j].choices.push(values[j])
        }
      }
    }
    arrayJawaban[i] = values
  }

  objResult.pertanyaan = arrayPertanyaan
  objResult.jawaban = arrayJawaban
  return objResult;
}

function main() {
  getFormItems('10LS50kT95xj_L4NxJaiIdFWCu-pUzAummP1OlhBlA48')
}
