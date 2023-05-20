<script>
  import { goto } from '$app/navigation'
  import Pager from '$lib/components/Pager.svelte'

  export let data

  $: ({ subscribers, search } = data)
</script>

<h1>Subscribers</h1>

<form>
  <input name="search" placeholder="Search" value={search.text}/>

  <select name="status" value={search.status}>
    <option value="">All</option>
    <option value="SUBSCRIBED">Subscribed</option>
    <option value="UNSUBSCRIBED">Unsubscribed</option>
    <option value="PENDING">Pending</option>
  </select>

  <select name="sort" value={search.sort}>
    <option value="NEWEST">Newest</option>
    <option value="OLDEST">Oldest</option>
  </select>

  <button>Search</button>
</form>

<table>
  <thead>
    <tr>
      <th>E-mail</th>
      <th>First name</th>
      <th>Last name</th>
      <th>Status</th>
      <th>Created</th>
      <th>Referred By</th>
    </tr>
  </thead>
  <tbody>
    {#each subscribers.records as subscriber}
      <tr on:click={() => goto(`/subscribers/${subscriber.id}`)}>
        <td>{subscriber.email}</td>
        <td>{subscriber.firstName}</td>
        <td>{subscriber.lastName}</td>
        <td>{subscriber.status}</td>
        <td>{subscriber.createdAt}</td>
        <td>{subscriber.referredBy}</td>
      </tr>
    {/each}
  </tbody>
</table>

<Pager current={subscribers.page} pages={subscribers.pages}/>
