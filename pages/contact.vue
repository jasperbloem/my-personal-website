<script setup>
    import MailIcon from '~icons/line-md/email'
    import LinkedinIcon from '~icons/logos/linkedin-icon'
    import SendIcon from '~icons/mdi/send'

    const { t } = useI18n({
        useScope: 'local'
    })

    useHead({
        title: 'Contact | Jasper Bloem',
        meta: [
            { name: 'Contact me!' }
        ],
    })

    const formFields = ref({
        firstName: '',
        lastName: '',
        emailAddress: '',
        message: '',
    })

    let msg = ref([])
    let messageSent = ref(false)

    const formValid = () => {
        validateField('firstName', formFields.value.firstName)
        validateField('lastName', formFields.value.lastName)

        validateEmail(formFields.value.emailAddress)

        validateField('message', formFields.value.message)

        console.log(formFields.value.firstName.length)

        return (
            formFields.value.firstName.length > 0 &&
            formFields.value.lastName.length > 0 &&
            /(.+)@(.+){2,}.(.+){2,}/.test(formFields.value.emailAddress) &&
            formFields.value.message.length > 0
        )
    }

    const validateField = (field, value) => {
        if(value.length > 0)
            msg.value[field] = true
        else
            msg.value[field] = false
    }

    const validateEmail = value => {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            msg.value['emailAddress'] = true
        else
            msg.value['emailAddress'] = false
    }

    async function submitForm() {
        let isValid = formValid()
        if (!isValid) {
            console.log('not valid')
            return
        } else {

            try {
                const response = await $fetch('https://api.jasperbloem.com/handleMail.php', {
                    method: 'POST',
                    body: {
                        firstName: formFields.value.firstName,
                        lastName: formFields.value.lastName,
                        emailAddress: formFields.value.emailAddress,
                        message: formFields.value.message,
                    }
                })
                alert('Message sent!')
                console.log(response)
                formFields.value = {
                    firstName: '',
                    lastName: '',
                    emailAddress: '',
                    message: '',
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

</script>

<template>
    <h1>{{ t('Contact me') }}</h1>
    <div class="contact-container">
        <div class="contact-info">
            <p>{{ t('description') }}</p>
            <a class="flex items-center mt-4 mb-2" href="mailto:me@jasperbloem.com">
                <mail-icon /><span class="ml-2">me@jasperbloem.com</span>
            </a>
            <a href="https://www.linkedin.com/in/jasperbloem/" target="_blank">
                <linkedin-icon />
            </a>
        </div>
        <div class="contact-form">
            <h2>{{ $t('Or send me a message') }}</h2>
            <form @submit.prevent="submitForm" class="flex flex-wrap">
                <div class="form-group w-full md:w-1/2 mb-6 md:mb-0">
                    <label>{{ $t('First name') }}</label>
                    <input v-model="formFields.firstName" name="firstName"
                           :class="msg.firstName === false ? 'invalid-field' : ''"/>
                </div>
                <div class="form-group w-full md:w-1/2 mb-6 md:mb-0">
                    <label>{{ $t('Last name') }}</label>
                    <input v-model="formFields.lastName" name="lastName"
                           :class="msg.lastName === false ? 'invalid-field' : ''"/>
                </div>
                <div class="form-group w-full md:w-1/2 mb-6 md:mb-0">
                    <label>{{ $t('Email') }}</label>
                    <input v-model="formFields.emailAddress" name="emailAddress"
                           :class="msg.emailAddress === false ? 'invalid-field' : ''"/>
                </div>
                <div class="form-group w-full mb-6 md:mb-0">
                    <label>{{ $t('Message') }}</label>
                    <textarea v-model="formFields.message" name="message"
                              :class="msg.message === false ? 'invalid-field' : ''"/>
                </div>
                <button
                    type="submit"
                    class="send-form-btn">
                    <send-icon/>
                    <span>
                        {{ $t('Send') }}
                    </span>
                </button>
            </form>
        </div>
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "description": "I'm always up for a new challenge. If you're looking for a reliable and skilled partner to bring your web project to the next level, I'd love to hear from you."
    },
    "nl": {
        "description": "Ik ben altijd in voor een nieuwe uitdaging. Als je op zoek bent naar een betrouwbare partner om uw webproject naar een hoger niveau te tillen, dan hoor ik graag van je!",
        "Contact me": "Contact"
    }
}
</i18n>