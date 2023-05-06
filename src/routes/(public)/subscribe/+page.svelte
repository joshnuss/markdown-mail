<script>
  export let form

  function error(fieldName) {
    if (!form?.errors) return

    return form.errors.find(error => error.key == fieldName)
  }
</script>

<h1>Subscribe</h1>

<form method="post">
  <input
    type="email"
    name="email"
    class:error={error('email')}
    value={form?.email ?? ''}
    placeholder="E-mail">

  <input
    type="text"
    name="firstName"
    class:error={error('firstName')}
    value={form?.firstName || ''}
    placeholder="First name">

  <input
    type="text"
    name="lastName"
    class:error={error('lastName')}
    value={form?.lastName || ''}
    placeholder="Last name">

  <button>I want in!</button>
</form>
