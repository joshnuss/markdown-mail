<script>
  export let data

  $: ({ subscriber } = data)
</script>

<h1>{subscriber.email}</h1>

<p>E-mail: {subscriber.email}</p>
<p>First name: {subscriber.firstName}</p>
<p>Last name: {subscriber.lastName}</p>
