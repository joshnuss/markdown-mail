<script>
  import { page } from '$app/stores'

  export let current
  export let pages

  function url(index) {
    const newUrl = new URL(
      $page.url.pathname + $page.url.search,
      $page.url.origin
    )

    newUrl.searchParams.set('page', index+1)

    return newUrl.toString()
  }
</script>

{#key $page.url}
  <nav class="pager">
    {#each {length: pages } as _, index}
      <a href={url(index)}>{index+1}</a>
    {/each}
  </nav>
{/key}
