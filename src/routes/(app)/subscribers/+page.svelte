<script>
  import { goto } from '$app/navigation'

  export let data
</script>

<h1>Subscribers</h1>

<table>
  <thead>
    <tr>
      <th>E-mail</th>
      <th>First name</th>
      <th>Last name</th>
    </tr>
  </thead>
  <tbody>
    {#each data.subscribers as subscriber}
      <tr on:click={() => goto(`/subscribers/${subscriber.id}`)}>
        <td>{subscriber.email}</td>
        <td>{subscriber.firstName}</td>
        <td>{subscriber.lastName}</td>
      </tr>
    {/each}
  </tbody>
</table>
