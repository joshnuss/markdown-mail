<script>
  import { format } from 'date-fns'
  export let data

  $: ({ count, dates } = data)
</script>
<h1>Dashboard</h1>

<section class="stats">
  <article class="stat">
    <a href="/subscribers?status=SUBSCRIBED">Subscribers</a>
    <span>{count.total}</span>
  </article>

  <article class="stat">
    <a href="/subscribers?status=SUBSCRIBED">Today</a>
    <span>{count.today}</span>
  </article>

  <article class="stat">
    <a href="/subscribers?status=UNSUBSCRIBED">Unsub</a>
    <span>{((count.unsubscribes / count.total)*100).toFixed(2)}%</span>
  </article>
</section>

<table>
  <thead>
    <tr>
      <th>Date</th>
      <th class="number">Count</th>
    </tr>
  </thead>

  <tbody>
    {#each dates as record}
      <tr>
        <td>{format(record.createdOn, 'dd MMM')}</td>
        <td class="number">{record._count}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    max-width: 600px;
  }
</style>
