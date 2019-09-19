const name = document.getElementById('name');

const submitClick = () => {
    var firebaseRef = firebase.database().ref('Appointments/K0jTZLvEH8WKtvWz1TGJgMXWO7y1');
    firebaseRef.once('value').then((snapshot) => {
        const durationStartArray = [];
        snapshot.forEach((durationStart) => {
            const appointmentStartArray = {};
            durationStart.child("bookings").forEach((appointmentStart) => {
                if (appointmentStart.child("patName").val() === name.value) {
                    appointmentStartArray[appointmentStart.key] = appointmentStart.toJSON();
                }
            })
            if (Object.keys(appointmentStartArray).length !== 0) {
                const obj = durationStart.val();
                obj["bookings"] = appointmentStartArray;
                durationStartArray.push({[durationStart.key]: obj});
            }
        })
        if (Object.keys(durationStartArray).length !== 0) {
            console.log(durationStartArray);
            document.getElementById("result").innerHTML = JSON.stringify(durationStartArray ,undefined,  4);
        }
    })

}