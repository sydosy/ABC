run();
function run() {
    let protocol = window.location.protocol;
    let hostname = window.location.hostname;
    console.log(hostname);
    console.log(protocol);
    if (protocol === 'http:') {
        let formElements = document.forms;
        console.log(formElements);
        for (let i = 0; i < formElements.length; i++) {
            let inputElements = formElements[i].getElementsByTagName('input');
            for (let j = 0; j < inputElements.length; j++) {
                if (inputElements[j].type === 'password') {
                    alert('友利奈緒が可愛い');
                }
            }
        }
    }
}