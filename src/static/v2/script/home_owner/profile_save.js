$(document).ready(function () {
    var stripe;

    $('#id_dob').datepicker();

    $.get('/publishable_key').done(
        function (data){
            stripe = Stripe(data.publishable_key);
        }
    );

    const myForm = document.querySelector('.my-form');
    myForm.addEventListener('submit', handleForm);

    async function handleForm(event) {
        event.preventDefault();

        const data = new FormData();
        data.append('file', document.querySelector('#id-file').files[0]);
        data.append('purpose', 'identity_document');
        const fileResult = await fetch('https://uploads.stripe.com/v1/files', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${stripe._apiKey}` },
            body: data,
        });
        const fileData = await fileResult.json();

        var dob = new Date(document.querySelector('.inp-dob').value);
        var gender = document.querySelector('.inp-gender').value;
        var phone_number = document.querySelector('.inp-contact-num').value;

        if (gender === 'M')
            gender = 'male';
        else if (gender === 'F')
            gender = 'female'
        else
            gender = undefined;
        
        var account_data = {
            legal_entity: {
                first_name: document.querySelector('.inp-first-name').value,
                last_name: document.querySelector('.inp-last-name').value,
                address: {
                    line1: document.querySelector('.inp-street-address1').value,
                    city: document.querySelector('.inp-city').value,
                    state: document.querySelector('.inp-state').value,
                    postal_code: document.querySelector('.inp-zip').value,
                },
                dob: {
                    day: dob.getDate(),
                    month: dob.getMonth() + 1,
                    year: dob.getFullYear(),
                },
                gender: gender,
                phone_number: phone_number,
            },
            tos_shown_and_accepted: true,
        };

        if (fileData.id){
            account_data.legal_entity['verification'] = {
                document: fileData.id
            }
        }

        const result = await stripe.createToken('account', account_data);

        var resultBankAccount;
        
        if (document.querySelector('.inp-routing-number').value || document.querySelector('.inp-account-number').value){
            resultBankAccount = await stripe.createToken('bank_account', {
                country: 'AU',
                currency: 'aud',
                routing_number: document.querySelector('.inp-routing-number').value,
                account_number: document.querySelector('.inp-account-number').value,
                account_holder_name: document.querySelector('.inp-first-name').value + ' ' + document.querySelector('.inp-last-name').value,
                account_holder_type: 'individual',
            });
        }

        // TODO: Remove country Hard Code

        if (resultBankAccount && resultBankAccount.error){
            document.querySelector('#bank-error-message').innerHTML = resultBankAccount.error.message;
        }
        else if (!resultBankAccount && result.token){
            document.querySelector('#token').value = result.token.id;
            myForm.submit();
        }
        else if (result.token && resultBankAccount.token) {
            document.querySelector('#token').value = result.token.id;
            document.querySelector('#bank-account-token').value = resultBankAccount.token.id;
            myForm.submit();
        }
    }
});