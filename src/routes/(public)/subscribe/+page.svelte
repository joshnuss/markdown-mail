<script>
  import { formHelper } from '$lib/formHelper'

  let form = formHelper({
    defaults: {
      email: '',
      firstName: '',
      lastName: ''
    }
  })
</script>

<h1>Subscribe</h1>

<form method="post">
  <input
    type="email"
    name="email"
    class:error={form.error('email')}
    value={form.fields.email}
    placeholder="E-mail">

  <input
    type="text"
    name="firstName"
    class:error={form.error('firstName')}
    value={form.fields.firstName}
    placeholder="First name">

  <input
    type="text"
    name="lastName"
    class:error={form.error('lastName')}
    value={form.fields.lastName}
    placeholder="Last name">

  <button>I want in!</button>
</form>
