<script>
  import { goto } from '$app/navigation'

  export let data

  $: ({ broadcasts } = data)
</script>

<div class="title">
  <h1>Broadcasts</h1>

  <a class="button" href="/broadcasts/new">New broadcasts</a>
</div>

<table>
  <thead>
    <tr>
      <th>Subject</th>
      <th>Content</th>
      <th>Status</th>
      <th>Created</th>
    </tr>
  </thead>
  <tbody>
    {#each broadcasts as broadcast}
      <tr on:click={() => goto(`/broadcasts/${broadcast.id}`)}>
        <td>{broadcast.subject}</td>
        <td>{broadcast.content.substr(0, 100)}...</td>
        <td>
          <span class="badge">
            {broadcast.sentAt ? 'SENT' : 'DRAFT'}
          </span>
        </td>
        <td>{broadcast.createdAt}</td>
      </tr>
    {/each}
  </tbody>
</table>
