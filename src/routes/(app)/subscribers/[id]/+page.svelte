<script>
  export let data

  $: ({ subscriber } = data)
</script>

<section class="title">
  <h1>{subscriber.email}</h1>

  <form action="/subscribers/{subscriber.id}?/delete" method="post">
    <button class="delete">Delete</button>
  </form>
</section>

<p>E-mail: {subscriber.email}</p>
<p>First name: {subscriber.firstName}</p>
<p>Last name: {subscriber.lastName}</p>

<section>
  <h2>Messages</h2>

  {#await data.stream.messages}
    Loading...
  {:then messages}
    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Sent</th>
        </tr>
      </thead>
      <tbody>
        {#each messages as message}
          <tr>
            <td>{message.subject}</td>
            <td>{message.sentAt || 'queued'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/await}
</section>
