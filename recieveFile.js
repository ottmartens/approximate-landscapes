
const fileInput = document.getElementById('fileInput')


fileInput.onchange = function(e) {
    const file = e.target.files[0]

    console.log(file)
}

