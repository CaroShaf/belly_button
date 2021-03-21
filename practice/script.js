// d3.selectAll("body").on("change", updatePage);

function updatePage() {
  var dropdownMenu = d3.select("#selectOption");
  // console.log(dropdownMenu);
  const options = dropdownMenu._groups[0][0].options;
  for (let i = 0; i < options.length; i++) {
    const o = options.item(i);
    console.log(o.text);
  }
  console.log(options);
  // console.log(optionValues);
  // var dropdownMenuID = dropdownMenu.id;
  // var selectedOption = dropdownMenu.value;

//   console.log(dropdownMenuID);
//   var element = document.getElementById("selectOption");
// console.log(element.value);
};

function optionChanged(option) {
  console.log(option);
}

updatePage()