let attempts = 3;
let run = true;
passcodeCorrect = false;
let str = "Test String"

//var SHA256 =  new Hashes.SHA256
//console.log('SHA256:' + SHA256.hex(str))
const getMessages = () => {
    const passcode = document.querySelector("#passcode")
    
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val()
        //console.log(data)
        if(run) {    
            for (let key in data) {
                //console.log(key, data[key])
                //message.innerHTML = "failure"
                if(data[key].passcode === passcode.value) {
                    console.log("match found")
                    const message = document.querySelector("#message")
                    message.innerHTML = data[key].message
                    passcodeCorrect = true;
                }
            }
            if(!passcodeCorrect && attempts <= 1) {
                message.innerHTML = "No Attempts Remaining"
                run = false;
            }
            else if(!passcodeCorrect) {
                message.innerHTML = `Invalid Password, you have ${--attempts} remaining`
            }
        }
        passcodeCorrect = false;
    })
}