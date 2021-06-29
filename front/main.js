const url = 'https://we.protect.photos';
window.addEventListener('load', () => {
    const submit_button = document.getElementById('send_form_button');
    submit_button.addEventListener('click', (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('form_name')?.value,
            contact: document.getElementById('form_contact')?.value,
            message: document.getElementById('form_message')?.value,
            origin: 'photos'
        }
        fetch(`${url}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
        .then(resp_data => {
            document.getElementById('form_name').value = '';
            document.getElementById('form_contact').value = '';
            document.getElementById('form_message').value = '';
            document.getElementById('form_header').innerHTML = 'Thank you, your message saved. Feel free to send more';
            console.log('got response', resp_data);
        }).catch(err => {
            console.log('got error', err.message);
            document.getElementById('form_error').innerHTML = `Error happened, try again later`;
        })
    });
});
