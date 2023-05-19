<script>
  export let data

  $: ({ count } = data)
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
